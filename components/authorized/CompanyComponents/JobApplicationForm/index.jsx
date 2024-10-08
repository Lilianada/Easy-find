import React, { useState } from "react";
import styles from "./style.module.scss";

export default function JobApplicationForm({ closeApplicationForm }) {
  const [cvSelectedOption, setCvSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setCvSelectedOption(e.target.value);
  };

  return (
    <section className={styles.modal__overlay}>
      <div className={styles.modal__container}>
        <button className={styles.modal__close} onClick={closeApplicationForm}>
          &times;
        </button>
        <h2 className={styles.modal__title}> Apply Here</h2>

        <form className={styles.modal__form}>
          <div className={styles.modal__field}>
            <label htmlFor="fullName">
              Full Name <span className={styles.asterisk}>*</span>
            </label>{" "}
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="email">
              Email Address <span className={styles.asterisk}>*</span>
            </label>{" "}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              required
            />
          </div>

          {/* <div class="modal__field">
            <label for="experience">
              Years of Experience <span class="asterisk">*</span>
            </label>
            <select id="experience" name="experience" required>
              <option value="1" selected>
                1 year
              </option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
            </select>
          </div> */}

          <div>
            <label htmlFor="resume">
              Resume <span className={styles.asterisk}>*</span>
            </label>
            <div className={styles.checkbox__group}>
              <div className={styles.checkbox__option}>
                <input
                  type="radio"
                  id="applyWithUploadedCV"
                  name="resume"
                  value="applyWithUploadedCV"
                  checked={cvSelectedOption === "applyWithUploadedCV"}
                  onChange={handleOptionChange}
                  className={styles.checkbox__input}
                />
                <label
                  htmlFor="applyWithUploadedCV"
                  className={styles.checkbox__label}
                >
                  Apply with my uploaded CV
                </label>
              </div>
              <div className={styles.checkbox__option}>
                <input
                  type="radio"
                  id="uploadNewCV"
                  name="resume"
                  value="uploadNewCV"
                  checked={cvSelectedOption === "uploadNewCV"}
                  onChange={handleOptionChange}
                  className={styles.checkbox__input}
                />
                <label htmlFor="uploadNewCV" className={styles.checkbox__label}>
                  Upload new CV
                </label>
              </div>
            </div>
            {cvSelectedOption === "uploadNewCV" && (
              <div className={styles.modal__field}>
                <label htmlFor="resumeUpload">
                  Upload CV <span className={styles.asterisk}>*</span>
                </label>
                <input
                  type="file"
                  id="resumeUpload"
                  className={styles.form__input}
                />
              </div>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows="6"
              placeholder="Tell us about yourself"
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.modal__submit}>
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
