import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
require("dotenv").config();

const PostTestimonial = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const initialFormData = {
    name: "",
    profilePicture: null,
    testimonial: "",
    companyName: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      profilePicture: formData.profilePicture,
      testimonial: formData.testimonial,
      companyName: formData.companyName,
    };

    console.log("Data to be sent:", payload); // Log the data

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/testimonials`,
        payload
      );
      console.log(response.data); // Handle the response
      setFormData(initialFormData);
      setTimeout(() => {
        setIsSuccess(true);
      }, 3000);
    } catch (error) {
      console.error(error); // Handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: imageUrl,
        profilePicture: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  //call the testimonial endpoint to return the testimonial in the input fields
  //if no testimonial, then display the empty form
  return (
    <section className={styles.testimonialPostForm__section}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>Testimonial Post</h2>
        <p className={styles.section__subtitle}>
          Share a testimonial about your experience with Easy Find.
        </p>
      </div>
      <form
        className={styles.testimonialPostForm__form}
        onSubmit={handleSaveClick}
      >
        <div className={styles.input__wrap}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className={styles.input__field}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className={styles.input__wrap}>
          <label htmlFor="profile-picture">Profile Picture:</label>
          <input
            type="file"
            className={styles.input__field}
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input__wrap}>
          <label htmlFor="testimonial">Testimonial:</label>
          <textarea
            name="testimonial"
            className={styles.text__field}
            cols="30"
            rows="10"
            value={formData.testimonial}
            onChange={handleChange}
            required
            placeholder="Write the testimonial"
          />
        </div>

        <div className={styles.input__wrap}>
          <label htmlFor="company-name">Company Name:</label>
          <input
            type="text"
            className={styles.input__field}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>

        {isEditMode ? (
          <button type={styles.submit} className={styles.submit__button}>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Create Testimonial"
            )}
          </button>
        ) : (
          <button
            type="button"
            className={styles.edit__button}
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
        {isSuccess && (
          <p className={styles.success__msg}>
            Testimonial Created Successfully
          </p>
        )}
      </form>
    </section>
  );
};

export default PostTestimonial;
