import React from "react";
import styles from "./style.module.scss";
import { useUser } from "@/context/userContext";

export default function UserName() {
  const { user } = useUser();

  return (
    <section className={styles.username__section}>
      <div className={styles.username__content}>
        <div className={styles.content__header}>
          <h2 className={styles.username__title}>
            Welcome back, <span className={styles.username__usertitle}>{user ? user.username : "User"}!</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
