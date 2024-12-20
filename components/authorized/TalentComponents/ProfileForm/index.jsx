import React, { useEffect, useState, useRef } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage,  auth} from "../../../../firebaseConfig/firebase"; 
import { updateTalent, talentStore,} from '../../../../firebaseConfig/talentStore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; 
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import LoadingScreen from "@/components/utils/Loaders/Loader";
import showAlert from "@/components/utils/AlertBox/CustomAlert";

export default function TalentProfileForm() {
  
  const initialFormData = {
    id: null,
    fullName: "",
    email: "",
    bio: "",
    photo: null,
    dob: "",
    gender: "",
    pronouns: "",
    jobTitle: "",
    minSalary: "",
    maxSalary: "",
    linkedin: "",
    portfolio: "",
    address: "",
    phone: "",
    mobile: "",
    resume: null,
    skills: "",
    institute: "",
    degree: "",
    company: "",
    position: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [alert, setAlert] = useState(null)
  const fileInputRef = useRef(null);

  const router = useRouter();
  const [id, setId] = useState(null); 

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setId(user.uid);
    } else {
      console.error("No user is logged in");
    }
  }, []);  

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const data = await talentStore.getTalentStoreById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [id]);

   const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = async (e, value) => {
    // Handle MobileInput
    if (value !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        mobile: value, 
      }));
      return;
    }
  
    // Handle other form inputs
    if (e && e.target) {
      const { name, value: inputValue, files } = e.target;
  
      if (files && files.length > 0) {
        const file = files[0];
        if (name === 'photo') {
          const photoRef = ref(storage, `profilePhotos/${id}/${file.name}`);
          await uploadBytes(photoRef, file);
          const photoURL = await getDownloadURL(photoRef);
          setFormData((prevData) => ({
            ...prevData,
            photo: photoURL,
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: inputValue, 
        }));
      }
    }
  };
  
  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (!formData || !formData.email?.length || !formData.fullName?.length) {
      setErrorMsg("Email and username must have at least 1 character.");
      setTimeout(() => {
          setErrorMsg("");
      }, 3000);
      return;
  }

  if (!formData.company?.length || !formData.position?.length) {
      setErrorMsg("Please add any experience you've had.");
      setTimeout(() => {
          setErrorMsg("");
      }, 3000);
      return;
  }

  if (hasError) {
    showAlert(
      {
        type: "error",
        title: "Error!",
        message: "Please fix the errors before submitting.",
        showCloseButton: false,
        handleClose: () => setAlert(null),
        timeout: 3000,
      },
      setAlert
    );
    return;
  }

    try {
      setIsLoading(true);
      let payload = { ...formData, id };

      if (formData.jobTitle && formData.jobTitle.length > 0) {
          const jobTitleKeywords = generateKeywords(formData.jobTitle);
          payload.jobTitleKeywords = jobTitleKeywords; 
      }
      if (!isValidPhoneNumber(formData.mobile)) {
        alert('Please enter a valid mobile number');
      }      

        if (formData.photo instanceof File) {
            if (formData.photo.size > 5 * 1024 * 1024) {
                setErrorMsg("File size must be less than 5 MB.");
                return;
            }

            const validImageTypes = ["image/jpeg", "image/png"];
            if (!validImageTypes.includes(formData.photo.type)) {
                setErrorMsg("Invalid file type. Only JPG and PNG are allowed.");
                return;
            }

            const photoRef = ref(storage, `profilePhotos/${id}/${formData.photo.name}`);
            await uploadBytes(photoRef, formData.photo);
            const photoURL = await getDownloadURL(photoRef);
            payload.photo = photoURL; 
        }

        if (formData.resume instanceof File) {
            if (formData.resume.size > 5 * 1024 * 1024) {
                setErrorMsg("File size must be less than 5 MB.");
                return;
            }

            const validResumeTypes = ["application/pdf"];
            if (!validResumeTypes.includes(formData.resume.type)) {
                setErrorMsg("Invalid file type. Only PDF is allowed.");
                return;
            }

            const resumeRef = ref(storage, `resumes/${id}/${formData.resume.name}`);
            await uploadBytes(resumeRef, formData.resume);
            const resumeURL = await getDownloadURL(resumeRef);
            payload.resume = resumeURL; 
        }

        payload = Object.fromEntries(
          Object.entries(payload).filter(([_, value]) => value !== undefined)
        );

          await updateTalent({ id }, payload); 

          if (payload.jobTitleKeywords) {
            const userRef = doc(db, 'talentCollection', id); 
            await updateDoc(userRef, { jobTitleKeywords: payload.jobTitleKeywords });
        }

          router.push("/talent/profile");
      } catch (error) {
          console.error("Error updating profile:", error);
          setErrorMsg(error.message);
          setTimeout(() => {
              setErrorMsg("");
          }, 3000);

      } finally {
        setIsLoading(false)
      }
    };

  const generateKeywords = (jobTitle) => {
    const keywords = jobTitle
        .split(" ") 
        .map(word => word.toLowerCase()) 
        .filter(word => word.length > 0); 
    return keywords;
  };

  if (isLoading) return <div><LoadingScreen /></div>;

  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__form}>
        <div className={styles.profile__image}>
          <div className={styles.edit__image}>
            <MdEdit size={20} fill="#2563eb" className={styles.edit__icon} onClick={handleIconClick}/>
            <input
              type="file"
              accept="image/*"
              name="photo"
              ref={fileInputRef}
              onChange={handleInputChange}
              className={styles.form__input}
            />
          </div>
          {alert && alert.component}
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className={styles.image} />
          ) : (
            <img src="/assets/images/user-icon.png" alt="Default Profile" className={styles.image} />
          )}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="name">Name:<span className={styles.required}>*</span></label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your name"
            title="Start with capital letter and use only letters"
            pattern="^[A-Z][a-z]+$"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">Email:<span className={styles.required}>*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your bio"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your date of birth"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="pronouns">Pronouns:</label>
          <select
            name="pronouns"
            className={styles.form__select}
            value={formData.pronouns || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select pronouns</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
          </select>
        </div>

        <div className={styles.form__group}>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            className={styles.form__select}
            value={formData.gender || ""}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className={styles.form__group}>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your job title"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="socialLinks">LinkedIn Link:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your LinkedIn link"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="socialLinks">Portfolio Link:</label>
          <input
            type="link"
            name="portfolio"
            value={formData.portfolio || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your portfolio link"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your mobile number"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="mobile">Mobile:</label>
          <PhoneInput
            id="mobile"
            name="mobile"
            defaultCountry="US"
            value={formData.mobile}
            onChange={(value) => handleInputChange(null, value)}
            className={styles.form__input}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="resume">Update Resume:<span className={styles.required}>*</span></label>
          <input
            type="file"
            accept=".pdf,.doc, .docx"
            name="resume"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setFormData({
                  ...formData,
                  resume: e.target.files[0], 
                });
              }
            }} 
            className={styles.form__input}
            placeholder="Upload your resume"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your skills"
            required
          />
        </div>
        <div className={styles.form__group}>
          <label htmlFor="skills">Education:</label>
          <input
            type="text"
            name="institute"
            value={formData.institute || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your institute"
          />
          <input
            type="text"
            name="degree"
            value={formData.degree || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your degree"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="skills">Experience:<span className={styles.required}>*</span></label>
          <input
            type="text"
            name="company"
            value={formData.company || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your company"
            required
          />
          <input
            type="text"
            name="position"
            value={formData.position || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your position"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="desiredSalary">Desired Salary:</label>
          <input
            type="number"
            name="minSalary"
            value={formData.minSalary || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your desired minimum salary"
          />
          <input
            type="number"
            name="maxSalary"
            value={formData.maxSalary || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your desired maximum salary"
          />
        </div>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        <button onClick={handleSaveClick} className={styles.save__button}>
          {isLoading ? <div className={styles.spinner}></div> : "Save"}
        </button>
      </div>
    </div>
  );
}
