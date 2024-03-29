"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginUser } from "@/firebaseConfig/talentStore";
import { db } from "@/firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import "./style.scss";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTalent, setIsTalent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential;
      const userUID = user.uid;
  
      // Determine the collection based on user type
      const userCollection = isTalent ? "talentCollection" : "companyCollection";
  
      // Fetch the user's details from the corresponding Firestore collection
      const userRef = doc(db, userCollection, userUID);
      const userDoc = await getDoc(userRef);
  
      // Check if the user's type matches the selected checkbox
      const userData = userDoc.data();
      if (userUID && userDoc.exists() === false ) {
        await showAlert({
          type: "error",
          title: "Error",
          message: "Wrong checkbox selected! Kindly check the right box and try again",
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        }, setAlert);
        setIsLoading(false);
        return;
      }

      // Check if the user document exists
      if (!userDoc.exists()) {
        await showAlert({
          type: "error",
          title: "Error",
          message: "User not found. Kindly change the user selection or sign up.",
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        }, setAlert);
        setIsLoading(false);
        return;
      }
  
      
  
      // Store the user's first name in secure storage
      secureLocalStorage.setItem("user_firstName", userData.fullName);
  
      // Navigate based on user type
      if (isTalent) {
        router.push("/talent");
      } else if (isCompany) {
        router.push("/company");
      }
  
      // Reset form fields and checkboxes
      setEmail("");
      setPassword("");
      setIsTalent(false);
      setIsCompany(false);
  
    } catch (error) {
      console.error("Login error:", error);
      await showAlert({
        type: "error",
        title: "Error",
        message: error.message,
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      }, setAlert);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "talent" && checked) {
      setIsTalent(true);
      setIsCompany(false);
    } else if (name === "company" && checked) {
      setIsCompany(true);
      setIsTalent(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="login__form">
      {alert && alert.component}
      <div className="login__form__container">
        <div className="login__signin">
          <div className="header">
            <h1 className="title">Sign In</h1>
            <p className="subtitle">
              To keep connected with us please login with your details.
            </p>
          </div>
          <form className="form__wrap" onSubmit={handleLogin}>
            <div className="checkbox__group">
              <div className="checkbox__item">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="talent"
                  id="talentCheckbox"
                  checked={isTalent}
                  onChange={handleInputChange}
                />
                <label htmlFor="talentCheckbox">I am a Talent</label>
              </div>
              <div className="checkbox__item">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="company"
                  id="companyCheckbox"
                  checked={isCompany}
                  onChange={handleInputChange}
                />
                <label htmlFor="companyCheckbox">I am a Company</label>
              </div>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input__field"
              value={email}
              onChange={handleInputChange}
            />
            <div className="password_field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="pass_field"
                value={password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              {showPassword ? (
                <IoEye
                  className="password_icon"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <IoEyeOff
                  className="password_icon"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
            </div>
            <div className="flex">
              <div className="remember__me">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="remember__me__text">
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="forgot__password">
                Forgot your password?
              </Link>
            </div>

            <button className="signin__btn" type="submit">
              {isLoading ? <Spinner /> : "Sign In"}
            </button>

            <div className="signup__info">
              <p className="text">Do not have an account?</p>{" "}
              <Link href={"/signup"} className="signup__text">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="login__signup">
          <h1 className="title">Hello Friend!</h1>
          <p className="subtitle">
            Discover new talents, become a talent, and connect with the
            community.
          </p>
        </div>
      </div>
    </section>
  );
}
