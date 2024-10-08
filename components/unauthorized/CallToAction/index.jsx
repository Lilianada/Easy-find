import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className={styles.cta__section}>
      <div className={styles.cta__container} style={{
        backgroundImage: `url('./assets/images/cta-bg.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} >

        <div className={styles.cta__description}>
          <h3 className={styles.description}>
            Recruiting online that helps you
            <br />
            find the right talent.
          </h3>

          <Link href='/signin' className={styles.cta__button}>Find talents now</Link>
        </div>
      </div>
    </section>
  );
}
