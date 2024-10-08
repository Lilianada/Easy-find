import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import styles from "./style.module.scss"; 
import { companyStore } from "../../../../firebaseConfig/companyStore";
import { AiOutlineEnvironment } from "react-icons/ai";
require("dotenv").config();
 

export default function CompanyProfileData() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
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
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace this with actual method to get the user ID from auth context or session
        const userId = "userId_from_auth"; // This should be replaced with actual user ID retrieval logic

        // Fetch profile data using the function from companytore
        const userProfile = await companyStore.getCompanyStoreById(userId);

        if (userProfile) {
          setFormData({
            id: userId,
            username: userProfile.username || "",
            email: userProfile.email || "",
            bio: userProfile.bio || "",
            photo: userProfile.photo || null,
            dob: userProfile.dob || "",
            gender: userProfile.gender || "",
            pronouns: userProfile.pronouns || "",
            jobTitle: userProfile.jobTitle || "",
            minSalary: userProfile.minSalary || "",
            maxSalary: userProfile.maxSalary || "",
            linkedin: userProfile.linkedin || "",
            portfolio: userProfile.portfolio || "",
            address: userProfile.address || "",
            phone: userProfile.phone || "",
            mobile: userProfile.mobile || "",
            resume: userProfile.resume || null,
            skills: userProfile.skills || "",
            institute: userProfile.institute || "",
            degree: userProfile.degree || "",
            company: userProfile.company || "",
            position: userProfile.position || "",
          });
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    router.push(`/company/edit`); 
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__details}>
        <h4 className={styles.note}>
          This is a preview of your profile. Please review all your information
          and make needed changes.
        </h4>
        <div className={styles.profile__top}>
          <div className={styles.profile__column}>
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Profile"
                className={styles.profile__image}
              />
            )}

            <div className={styles.profile__row}>
              <h4 className={styles.user__name}>{formData.username}</h4>
              <p className={styles.user__address}>
                <AiOutlineEnvironment />
                {formData.address}
              </p>
            </div>
            <p className={styles.user__title}>{formData.jobTitle}</p>
          </div>
        </div>

        <div className={styles.profile__bottom}>
          <div className={styles.profile__box}>
            <h4 className={styles.title}>Personal Details</h4>
            <p className={styles.text}>
              <strong>Pronouns:</strong> {formData.pronouns}
            </p>
            <p className={styles.text}>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p className={styles.text}>
              <strong>DOB:</strong> {formData.dob}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>About</h4>
            <p className={styles.text}>{formData.bio}</p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Skills</h4>
            <p className={styles.text}>{formData.skills}</p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Education</h4>
            <p className={styles.text}>
              <strong>Institution: </strong>
              {formData.institute}
            </p>
            <p className={styles.text}>
              <strong>Degree: </strong>
              {formData.degree}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Experience</h4>
            <p className={styles.text}>
              <strong>Company: </strong>
              {formData.company}
            </p>
            <p className={styles.text}>
              <strong>Position: </strong>
              {formData.position}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Contact</h4>
            <p className={styles.text}>
              <strong>Email: </strong>
              {formData.email}
            </p>
            <p className={styles.text}>
              <strong>Phone: </strong>
              {formData.phone}
            </p>
            <p className={styles.text}>
              <strong>Mobile: </strong>
              {formData.mobile}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Social Links</h4>
            <p className={styles.text}>
              <strong>LinkedIn:</strong> {formData.linkedin}
            </p>
            <p className={styles.text}>
              <strong>Portfolio:</strong> {formData.portfolio}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Resume*</h4>
            {formData.resume === null ? (
              <p className={styles.text}>No resume uploaded</p>
            ) : (
              <a
                href={formData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.text}
              >
                View Resume
              </a>
            )}
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Additional Information</h4>
            <p className={styles.text}>
              <strong>Desired Salary:</strong> ${formData.minSalary} - $
              {formData.maxSalary}
            </p>
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleEditClick} className={styles.edit__button}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
