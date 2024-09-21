import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { updateCompany } from '../../../../firebaseConfig/companyStore';

export default function CompanyProfileForm() {
  
  const initialFormData = {
    id: null,
    username: "",
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

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const data = await companyStore.getCompanyStoreById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        photo: imageUrl,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
  
    // Validate the form data
    if (formData.email.length < 1 || formData.username.length < 1) {
      setErrorMsg("Email and username must have at least 1 character.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }
  
    try {
      setIsLoading(true);
  
      // Prepare the payload with ID
      const payload = {
        ...formData,
        id, // Ensure that the user ID is included
      };
  
      // Update the user data
      await updateCompany(payload);
  
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
  
      // Redirect to the company profile
      router.push("/company/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMsg(error.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__form}>
        <div className={styles.profile__image}>
          <div className={styles.edit__image}>
            <MdEdit size={20} fill="#2563eb" />
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleInputChange}
              className={styles.form__input}
              // value={formData.photo}
            />
          </div>
          {formData.photo && (
            <img src={formData.photo} alt="Profile" className={styles.image} />
          )}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your name"
            title="Start with capital letter and use only letters"
            pattern="^[A-Z][a-z]+$"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.bio}
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
            value={formData.dob}
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
            value={formData.pronouns}
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
            value={formData.gender}
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
            value={formData.jobTitle}
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
            value={formData.linkedin}
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
            value={formData.portfolio}
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
            value={formData.address}
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
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your mobile number"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="resume">Update Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="resume"
            onChange={handleInputChange}
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
            value={formData.skills}
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
            value={formData.institute}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your institute"
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your degree"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="skills">Experience:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your company"
            required
          />
          <input
            type="text"
            name="position"
            value={formData.position}
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
            value={formData.minSalary}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your desired minimum salary"
          />
          <input
            type="num"
            name="maxSalary"
            value={formData.maxSalary}
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