import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { CgBriefcase } from "react-icons/cg";
import Link from "next/link";
import { getJobs } from "@/firebaseConfig/talentStore";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import JobDetails from "../JobDetails";
import { useRouter } from "next/navigation";
import "./style.scss";

const JobGrid = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsPage, setDetailsPage] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const router = useRouter();
  const jobsPerPage = 8;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getJobs();
      setJobs(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFilterToggled = () => {
    setToggleFilter(!toggleFilter);
    setToggleSort(false);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = Math.ceil(jobs.length / jobsPerPage);

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

  const handleDetailsPage = (jobId) => {
    setSelectedJob(jobId);
    setDetailsPage(true);
  };

  return (
    <section className="job__grid">
      <div className="grid__header">
        <div className="header__left">
          <h5 className="total__jobs">
            Showing{" "}
            <span className="job__number">
              {indexOfFirstJob + 1} -{" "}
              {indexOfLastJob > jobs.length ? jobs.length : indexOfLastJob}
            </span>{" "}
            of available jobs
          </h5>
        </div>

        <div className="header__right">
          <div className="filter">
            <button className="filter__button" onClick={isFilterToggled}>
              Show Filter
            </button>

            <div className={toggleFilter ? "show__filter" : "filter__group"}>
              <div className="filter__item">
                <label htmlFor="location">Date Posted:</label>
                <div className="items">
                  <div className="check__item">
                    {" "}
                    <input
                      type="checkbox"
                      className="sort__check"
                      value="last 24 Hours"
                    />
                    <p>Last 24 hours</p>
                  </div>
                  <div className="check__item">
                    {" "}
                    <input
                      type="checkbox"
                      className="sort__check"
                      value="last7 Days"
                    />
                    <p>Last 7 days</p>
                  </div>
                  <div className="check__item">
                    {" "}
                    <input
                      type="checkbox"
                      className="sort__check"
                      value="last 14 Days"
                    />
                    <p>Last 14 days</p>
                  </div>
                  <div className="check__item">
                    {" "}
                    <input
                      type="checkbox"
                      className="sort__check"
                      value="last 30 Days"
                    />
                    <p>Last 30 days</p>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <label htmlFor="specialism">Specialism:</label>
                <div className="items">
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="IT Contractor"
                    />
                    <p> IT Contractor </p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Charity & Voluntary"
                    />
                    <p> Charity & Voluntary </p>
                  </div>
                  <div className="check__item">
                    <input type="checkbox" name="" value="Digital & Creative" />
                    <p>Digital & Creative</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Estate Agency"
                    />
                    Estate Agency
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <label htmlFor="jobType">Job Type:</label>
                <div className="items">
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Full Time"
                    />
                    <p> Full Time </p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Part-Time"
                    />
                    <p>Part-Time</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Freelance"
                    />
                    <p>Freelance</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Temporary"
                    />
                    <p>Temporary</p>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <label htmlFor="experience">Experience:</label>
                <div className="items">
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="Less than 1 year"
                    />
                    <p>Less than 1 year</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="2 Year"
                    />
                    <p>2 Year</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="3 Year"
                    />
                    <p>3 Year</p>
                  </div>
                  <div className="check__item">
                    <input
                      type="checkbox"
                      name=""
                      id="filter__checkbox"
                      value="4 Year"
                    />
                    <p>4 Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingScreen />}
      {/* Job listings */}
      {jobs.length > 0 && (
        <div className="grid__body">
          {currentJobs.map((job) => {
            const salaryMinFormatted = job.minSalary.toLocaleString();
            const salaryMaxFormatted = job.maxSalary.toLocaleString();
            const timePostedFormatted = new Date(
              job.datePosted
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            return (
              <div className="jobs__card" key={job.id}>
                <div className="card__info">
                  <div className="card__company">
                    <div className="card__logo">
                      <img src={job.companyLogo} alt={job.companyName} />
                      <div className="company__info">
                        <h5 className="company__name">{job.companyName}</h5>
                        <p className="company__location">
                          <AiOutlineEnvironment />
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h4 className="card__title">{job.title}</h4>
                  <div className="card__flex">
                    <p className="card__location">
                      <CgBriefcase />
                      {job.jobType}
                    </p>
                    <p className="card__time">
                      <AiOutlineClockCircle />
                      {timePostedFormatted}
                    </p>
                  </div>
                  {/* <p className="card__description">{job.description}</p> */}
                  {/* <ul className="card__tags">
              {jobTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul> */}
                </div>
                <div className="card__flex">
                  <p className="company__pay">
                    ${salaryMinFormatted} - ${salaryMaxFormatted}{" "}
                  </p>
                  <Link
                    href={`/talent/jobs/details/${job.id}`}
                  >
                  <button
                    className="apply__button"
                  >
                    View More
                  </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {jobs.length === 0 && <p className="no__jobs">No jobs found.</p>}

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              className={`pagination__button ${
                currentPage === pageNumber ? "pagination__active" : ""
              }`}
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          className="pagination__button"
          onClick={handleNextClick}
          disabled={currentPage === pageNumbers}
        >
          Next
        </button>
      </div>
      {detailsPage && (
        <JobDetails
          jobId={selectedJob}
          onClose={() => {
            setDetailsPage(false);
            setSelectedJob(null);
          }}
        />
      )}
    </section>
  );
};

export default JobGrid;
