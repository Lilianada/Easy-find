import React, { useState } from "react";
import { useRouter } from 'next/router';
import { CgClose } from "react-icons/cg";
import { RxDividerVertical } from "react-icons/rx";
import Button from '../../utils/Button';
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import styles from './style.module.scss';

export default function BlogHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const router = useRouter();
    
  const isTalentPath = router.pathname.startsWith('/talent');
  const isCompanyPath = router.pathname.startsWith('/company');


  return (
    <header className={styles.blog__header}>
      {/* Desktop Header */}
      <div className={styles.desktop__header}>
        <Link href="/" className={styles.header__logo}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav__bar}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
            {isTalentPath ? (
              <li>
                  <Link href="/talent">Home</Link> 
              </li>
          ) : isCompanyPath ? (
              <li>
                  <Link href="/company">Home</Link> 
              </li>
          ) : (
              <li>
                  <Link href="/">Home</Link> 
              </li>
          )}
            </li>
            <RxDividerVertical size={24} />
            <li className={styles.nav__item}>
              <Link href="/signin" className={styles.nav__link}>
                Sign In
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signup" passHref>
                <Button
                  type="button"
                  title="Get Started"
                  variant={styles.nav__button}
                  icon={<HiOutlineArrowNarrowRight className={styles.search__icon} />}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className={styles.mobile__header}>
        <div className={styles.header__logo}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            className={styles.logo}
          />
        </div>
        <button type="button" className={styles.menu__button} onClick={toggleMenu}>
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
        </button>

        <nav className={`${styles.nav__bar} ${showMenu ? styles.show__navbar : ''}`}>
          <div className={styles.nav__header}>
            <Link href="/" className={styles.header__logo}>
              <Image
                src="/assets/images/EasyFind.svg"
                alt="Logo"
                sizes="100px"
                width={100}
                height={10}
                className={styles.logo}
              />
            </Link>
            <button type="button" className={styles.close__menu} onClick={closeMenu}>
              <CgClose size={20} />
            </button>
          </div>

          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signin" className={styles.nav__link}>
                Sign In
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signup" className={styles.nav__button}>
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
