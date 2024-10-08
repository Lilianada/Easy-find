import React from 'react';
import styles from "./style.module.scss";

export default function PrivacyPolicy() {
  return (
    <section className={styles.privacy__page}>
    <div className={styles.privacy__container}>
      <div className={styles.privacy__header}>
        <h2 className={styles.privacy__title}>Privacy Policy</h2>
      </div>
      <div className={styles.privacy__content}>
        <ol className={styles.terms__list}>
          <li className={styles.list__item}>
            <h2 className={styles.list__head}>Description of Service</h2>
            <p>
              Making a decision to do something – this is the first step. We
              all know that nothing moves until someone makes a decision. The
              first action is always in making the decision to proceed.
            </p>
          </li>

          <li className={styles.list__item}>
            <h2 className={styles.list__head}>Your Registration Obligations</h2>
            <p>
              Focus is having the unwavering attention to complete what you
              set out to do. There are a million distractions in every facet
              of our lives. Telephones and e-mail, clients and managers,
              spouses and kids, TV, newspapers and radio – the distractions
              are everywhere and endless. Everyone wants a piece of us and the
              result can be totally overwhelming.
            </p>
          </li>

          <li className={styles.list__item}>
            <h2 className={styles.list__head}>User Account, Password, and Security</h2>
            <p>
              So, how can we stay on course with all the distractions in our
              lives? Willpower is a good start, but it’s very difficult to
              stay on track simply through willpower.
            </p>
          </li>

          <li className={styles.list__item}>
            <h2 className={styles.list__head}>User Conduct</h2>
            <p>
              We also know those epic stories, those modern-day legends
              surrounding the early failures of such supremely successful
              folks as Michael Jordan and Bill Gates. We can look a bit
              further back in time to Albert Einstein or even further back to
              Abraham Lincoln. What made each of these people so successful?
              Motivation.
            </p>
            <p>
              If success is a process with a number of defined steps, commit
              your decision to paper, just to bring it into focus. Without
              clarity, you send a very garbled message out to the Universe.
              You will run aground and become hopelessly stuck in the mud
              simply by asking ourselves lots of questions.
            </p>
          </li>

          <li className={styles.list__item}>
            <h2 className={styles.list__head}>International Use</h2>
            <p>
              We also know those epic stories, those modern-day legends
              surrounding the early failures of such supremely successful
              folks as Michael Jordan and Bill Gates. We can look a bit
              further back in time to Albert Einstein or even further back to
              Abraham Lincoln. What made each of these people so successful?
              Motivation.
            </p>
          </li>
        </ol>
        <div className={styles.buttons__wrap}>
          <button onClick={() => console.log("Accepted")} className={styles.accept__btn}>Accept</button>
          <button onClick={() => console.log("Closed")} className={styles.close__btn}>Close</button>
        </div>
      </div>
    </div>
  </section>
  )
}
