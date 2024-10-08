import React, { useState } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BsBriefcase } from "react-icons/bs";
import styles from "./style.module.scss";

const companiesPostings = [
  {
    id: 1,
    industry: "Marketing",
    name: "Meta",
    location: "San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 7,
  },
  {
    id: 2,
    industry: "Digital Marketing",
    name: "LinkedIn",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 3,
  },
  {
    industry: "Digital Marketing",
    name: "TikTok",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 8,
  },
  {
    id: 4,
    industry: "Software Engineering",
    name: "Instagram",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 4,
  },
  {
    id: 5,
    industry: "Real Estate",
    name: "Amazon",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 6,
  },
  {
    id: 6,
    industry: "Real Estate",
    name: "Paypal",
    location: "San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 8,
  },
  {
    id: 7,
    industry: "IT Contractor",
    name: "Teamway",
    location: "San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 1,
  },
  {
    id: 8,
    industry: "Estate Angency",
    name: "Twitter",
    location: "San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 0,
  },
  {
    id: 9,
    industry: "Estate Agency",
    name: "Lex & Li",
    location: "San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 3,
  },
  {
    id: 10,
    industry: "Software Engineering",
    name: "Apple",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 5,
  },
  {
    id: 11,
    industry: "Real Estate",
    name: "Wise",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 4,
  },
  {
    id: 12,
    industry: "IT Contractor",
    name: "Piggyvest",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 3,
  },
  {
    id: 13,
    industry: "Charity & Voluntary",
    name: "Cowrywise",
    location: "New York City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet.",
    logo: "https://plus.unsplash.com/premium_photo-1666533177885-64832208c5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    openPositions: 2,
  },
];

export default function CompaniesListing() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const isFilterToggled = () => {
    setToggleFilter(!toggleFilter);
    setToggleSort(false);
  };

  const handleIndustryChange = (e) => {
    const { value } = e.target;
    if (selectedIndustries.includes(value)) {
      setSelectedIndustries(
        selectedIndustries.filter((industry) => industry !== value)
      );
    } else {
      setSelectedIndustries([...selectedIndustries, value]);
    }
  };

  const filterCompaniesByIndustry = (company) => {
    if (selectedIndustries.length === 0) {
      return true; // If no industries are selected, show all companies
    }
    return selectedIndustries.includes(company.industry);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 8;

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companiesPostings
    .filter(filterCompaniesByIndustry) // Apply the industry filter
    .slice(indexOfFirstCompany, indexOfLastCompany);

  const pageNumbers = Math.ceil(currentCompanies.length / companiesPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className={styles.companies__grid}>
      <div className={styles.companiesHero__section}>
        <div className={styles.companiesHero__content}>
          <h1 className={styles.hero__title}>Find your dream company</h1>
          <p className={styles.hero__text}>
            We have over 100,000 companies available for you
          </p>

          <div className={styles.hero__searchBar}>
            <input
              type="search"
              name="search-bar"
              className={styles.search__bar}
              placeholder="Company Name"
            />
            <Link href="/search" className={styles.hero__button}>
              <HiOutlineArrowNarrowRight className={styles.search__icon} />
              <p>Browse</p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.grid__header}>
        <div className={styles.header__left}>
          <h5 className={styles.total__companies}>
            Showing{" "}
            <span className={styles.companies__number}>
              {indexOfFirstCompany + 1} -{" "}
              {indexOfLastCompany > companiesPostings.length
                ? companiesPostings.length
                : indexOfLastCompany}
            </span>{" "}
            of registered companies
          </h5>
        </div>

        <div className={styles.header__right}>
          <div className={styles.filter}>
            <button className={styles.filter__button} onClick={isFilterToggled}>
              Show Filter
            </button>

            <div className={`toggleFilter ? ${styles.show__filter} : ${filter__group}`}>
              <div className={styles.filter__item}>
                <label htmlFor="specialism">Industry:</label>
                <div className={styles.items}>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox1"
                      value="IT Contractor"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes("IT Contractor")}
                    />
                    <label htmlFor="filter__checkbox1">IT Contractor</label>
                  </div>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox2"
                      value="Charity & Voluntary"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes(
                        "Charity & Voluntary"
                      )}
                    />
                    <label htmlFor="filter__checkbox2">
                      Charity & Voluntary
                    </label>
                  </div>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox3"
                      value="Digital Marketing"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes("Digital Marketing")}
                    />
                    <label htmlFor="filter__checkbox3">Digital Marketing</label>
                  </div>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox4"
                      value="Software Engineering"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes(
                        "Software Engineering"
                      )}
                    />
                    <label htmlFor="filter__checkbox4">
                      Software Engineering
                    </label>
                  </div>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox5"
                      value="Estate Agency"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes("Estate Agency")}
                    />
                    <label htmlFor="filter__checkbox5">Estate Agency</label>
                  </div>
                  <div className={styles.check__item}>
                    <input
                      type="checkbox"
                      name="industry"
                      id="filter__checkbox6"
                      value="Real Estate"
                      onChange={handleIndustryChange}
                      checked={selectedIndustries.includes("Real Estate")}
                    />
                    <label htmlFor="filter__checkbox6">Real Estate</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* companies listings */}
      <div className={styles.grid__body}>
        {companiesPostings.length > 0 ? (
          currentCompanies.map((companies) => {
            return (
              <div className={styles.companies__card} key={companies.id}>
                <div className={styles.card__info}>
                  <div className={styles.card__company}>
                    <div className={styles.card__logo}>
                      <img src={companies.logo} alt={companies.name} />
                      <div className={styles.company__info}>
                        <h5 className={styles.company__name}>{companies.name}</h5>
                        <div className={styles.card__flex}>
                          <p className={styles.company__location}>
                            <AiOutlineEnvironment />
                            {companies.location}
                          </p>
                          <p className={styles.company__location}>
                            <BsBriefcase /> {companies.openPositions} Open
                            Positions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className={styles.card__title}>{companies.title}</h4>

                  <p className={styles.card__description}>{companies.description}</p>
                </div>
                <div className={styles.card__flex}>
                  <p className={styles.card__industry}>{companies.industry}</p>
                  <Link href="/talent/companies/details">
                    <button className={styles.apply__button}>
                      {/* <Link to={`/companies/${companies.id}`}>View</Link> */}
                      View
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No companiess found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pagination__button}
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              className={`${styles.pagination__button} ${
                currentPage === pageNumber ? style.pagination__active : ""
              }`}
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          className={styles.pagination__button}
          onClick={handleNextClick}
          disabled={currentPage === pageNumbers}
        >
          Next
        </button>
      </div>
    </section>
  );
}
