import React, { useEffect, useState, useRef } from "react";
import {
  getJobIdsFromCompany,
  deleteJob,
  updateJobStatus,
  getApplicantCount,
  getApplicantsByJobId,
} from "../../../../firebaseConfig/companyStore";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import styles from "./style.module.scss";
import LoadingScreen from "../../../utils/Loaders/Loader";
import Link from "next/link";

const JobPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [alert, setAlert] = useState(null); 

  const [applicantDetails, setApplicantDetails] = useState(null);
  const [showApplicants, setShowApplicants] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRefs = useRef({});
  const jobsPerPage = 10;
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobIdsFromCompany();

        if (!user) {
          throw new Error("User not authenticated");
        }

        const companyId = user.uid;
        const jobsWithApplicants = await Promise.all(
          jobData.map(async (job) => {
            const applicantCount = await getApplicantCount(
              job.jobId,
              companyId
            );
            return { ...job, applicantCount };
          })
        );

        setJobs(jobsWithApplicants);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "An error occurred while fetching jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((jobId) => {
        const dropdownRef = dropdownRefs.current[jobId];
        if (
          dropdownRef &&
          activeDropdown === jobId &&
          !dropdownRef.contains(event.target)
        ) {
          setActiveDropdown(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleMenuClick = (jobId) => {
    setActiveDropdown(activeDropdown === jobId ? false : jobId);
  };

  const handleEditJob = (jobId) => {
    router.push(`/company/jobs/editjob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      await showAlert(
        {
          type: "success",
          title: "Success",
          message: "Job deleted successfully!",
          showCloseButton: false,
          timeout: 2000,
        },
        setAlert
      );
      setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      setActiveDropdown(activeDropdown === jobId ? false : jobId);
    } catch (error) {
      console.error("Error deleting job post:", error);
      await showAlert(
        {
          type: "error",
          title: "Error",
          message: "Failed to delete job post. Please try again.",
          showCloseButton: true,
          timeout: 2000,
        },
        setAlert
      );
    }
  };

  const handleCloseJob = async (jobId, isActive) => {
    try {
      await updateJobStatus(jobId, isActive);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId ? { ...job, active: !isActive } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.table__container}>
      {alert && alert.component}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !jobs.length && (
        <div className={styles.no__jobs__container}>
          <p className={styles.no__jobs__message}>No job posts available.</p>
          <Link href='/company/jobs/postjobs' className={styles.post__button}>Post Jobs</Link>
        </div>
      )}

      {jobs.length > 0 && (
        <>
          <table className={styles.jobs__table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Applicants</th>
                <th>Date Posted</th>
                <th>Job Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job) => (
                <tr key={job.jobId}>
                  <td>
                    <a
                      href={`/company/jobs/${job.jobId}`}
                      className={styles.job__link}
                    >
                      {job.title}
                    </a>
                  </td>
                  <td>{job.applicantCount || "No applicants yet"}</td>
                  <td>{job.createdAt.toDate().toDateString()}</td>
                  <td>
                    <span
                      className={`${styles.job__status} ${
                        job.active ? styles.active : styles.inactive
                      }`}
                    >
                      {job.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className={styles.dropdown}
                    ref={(el) => dropdownRefs.current[job.jobId] = el}>
                      <button
                        onClick={() => handleMenuClick(job.jobId)}
                        className={styles.dropdown__button}
                      >
                        <CiMenuKebab />
                      </button>
                      {activeDropdown === job.jobId && (
                        <div className={styles.dropdown__menu}>
                          <button onClick={() => handleEditJob(job.jobId)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteJob(job.jobId)}>
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              handleCloseJob(job.jobId, job.active)
                            }
                          >
                            {job.active ? "Close" : "Open"}
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/company/jobs/${job.jobId}/applicants`
                              )
                            }
                          >
                            View Applicants
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
                  className={`${styles.pagination__number} ${
                    currentPage === pageNumber
                      ? styles.pagination__number__active
                      : ""
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
        </>
      )}
    </div>
  );
};

export default JobPage;
