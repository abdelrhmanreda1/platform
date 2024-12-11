import { useNavigate, useParams } from "react-router-dom";
import JobDetailsCardsGroup from "../components/jobDetails/JobDetailsCardsGroup";
import JobHeader from "../components/jobDetails/JobHeader";
import JobSection from "../components/jobDetails/JobSection";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const overviewText = "We are looking for an experienced Senior Frontend Developer to join our team. You will lead the development of user interfaces, ensure high-quality and scalable applications, and collaborate with designers and backend developers to create seamless user experiences.";

  const responsibilities = ["Develop and maintain responsive, high-performance web interfaces.", "Collaborate with designers and backend developers to deliver cohesive solutions.", "Optimize applications for speed and scalability.", "Conduct testing and debugging to ensure quality and functionality.", "Mentor junior developers and participate in code reviews."];

  const skills = ["Proficiency in HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue.js.", "Experience with version control systems (e.g., Git).", "Strong understanding of responsive design and cross-browser compatibility.", "Familiarity with testing tools (e.g., Jest, Cypress) and CI/CD pipelines.", "Excellent problem-solving and communication skills."];

  return (
    <div className="bg-gray-100 min-h-screen ">
      <JobHeader title="Senior Frontend Developer" company="DELL" date="4 Oct 2024" />
      <div className="container mx-auto mt-8">
        <JobDetailsCardsGroup />
        <JobSection title="Overview" content={overviewText} />
        <JobSection title="Responsibilities" content={responsibilities} isList />
        <JobSection title="Required Skills" content={skills} isList />
        <button onClick={() => navigate(`/dashboard/jobs/${jobId}/apply`)} className="bg-main text-white px-6 py-3  my-6 rounded-2xl">
          Apply For This Job
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
