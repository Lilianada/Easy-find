import React, { useState } from "react";
import { useRouter } from 'next/router';
import { CgClose } from "react-icons/cg";
import { RxDividerVertical } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import AccountDropdown from "@/components/authorized/TalentComponents/AccountDropdown";
import CompanyDropdown from "@/components/authorized/CompanyComponents/AccountDropdown";
import Button from '../../utils/Button';
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import styles from './style.module.scss';

export default function BlogHeader({ type }) {
  const [showMenu, setShowMenu] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };


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
            {type === 'talent' ? (
              <li>
                  <Link href="/talent">Home</Link> 
              </li>
          ) : type === 'company' ? (
              <li>
                  <Link href="/company">Home</Link> 
              </li>
          ) : (
              <li>
                  <Link href="/">Home</Link> 
              </li>
          )}
            </li>
            
            <li className={styles.nav__item}>
            {type === 'talent' ? (
              <li>
              <Link
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={styles.nav__link}>
                Jobs
              </Link>
              </li>
            ): type === 'company' ? (
              <li>
                  <Link href="/company/jobs/postjobs" className={styles.nav__link}>Post Job</Link> 
              </li>
            ) : (
              <li className="flex pr-3">
                <RxDividerVertical size={24} />
                <Link href="/signin" className={styles.nav__link}>
                  Sign In
                </Link>  
              </li>
              )}
            </li>
          
            <li className={styles.nav__item}>
            {type === 'talent' ? (
              <li
                className={
                  accountDropdown ? styles.active__menu : styles.nav__menu
                }
                onClick={toggleAccountDropdown}
              >
                Account
                <BsChevronDown fill="#827f7f" size={10} />
                <div
                  className={`${
                    accountDropdown ? styles.account__modal : styles.no__show
                  }`}
                >
                  <AccountDropdown />
                </div>
              </li>
            ) : type === 'company' ? (
              <li
              className={
                accountDropdown ? styles.active__menu : styles.nav__menu
              }
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${
                  accountDropdown ? styles.account__modal : styles.no__show
                }`}
              >
                <CompanyDropdown />
              </div>
            </li>
            ) : (
              <li>
                <Link href="/signup" passHref>
                  <Button
                    type="button"
                    title="Get Started"
                    variant={styles.nav__button}
                    icon={<HiOutlineArrowNarrowRight className={styles.search__icon} />}
                  />
                </Link>
              </li>
            )}
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
            {type === 'talent' ? (
              <li>
                  <Link href="/talent" className={styles.nav__link}>Home</Link> 
              </li>
          ) : type === 'company' ? (
              <li>
                  <Link href="/company" className={styles.nav__link}>Home</Link> 
              </li>
          ) : (
              <li>
                  <Link href="/" className={styles.nav__link}>Home</Link> 
              </li>
          )}
            </li>
            <li className={styles.nav__item}>
            {type === 'talent' ? (
              <li>
              <Link
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={styles.nav__link}>
                Jobs
              </Link>
              </li>
            ): type === 'company' ? (
              <li>
                  <Link href="/company/jobs/postjobs" className={styles.nav__link}>Post Job</Link> 
              </li>
            ) : (
              <li>
                <Link href="/signin" className={styles.nav__link}>
                  Sign In
                </Link>  
              </li>
              )}
            </li>
            <li className={styles.nav__item}>
            {type === 'talent' ? (
              <li
                className={
                  accountDropdown ? styles.active__menu : styles.nav__menu
                }
                onClick={toggleAccountDropdown}
              >
                Account
                <BsChevronDown fill="#827f7f" size={10} />
                <div
                  className={`${
                    accountDropdown ? styles.account__modal : styles.no__show
                  }`}
                >
                  <AccountDropdown />
                </div>
              </li>
            ) : type === 'company' ? (
              <li
              className={
                accountDropdown ? styles.active__menu : styles.nav__menu
              }
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${
                  accountDropdown ? styles.account__modal : styles.no__show
                }`}
              >
                <CompanyDropdown />
              </div>
            </li>
            ) : (
              <li className={styles.nav__item}>
              <Link href="/signup" className={styles.nav__button}>
                Get Started
              </Link>
              </li>
            )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
