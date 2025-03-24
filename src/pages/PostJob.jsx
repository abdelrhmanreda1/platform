import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputFieldJob from "../ui/InputFieldjob";
import SelectField from "../ui/SelectField";
import { useCreateJob } from "../services/apiJobs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// قاموس الدول والمدن
const countryCities = {
  Egypt: ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Fayoum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matrouh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"].sort(),
  Algeria: ["Adrar", "Algiers", "Annaba", "Batna", "Béchar", "Béjaïa", "Biskra", "Blida", "Bordj Bou Arréridj", "Bouira", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued", "Ghardaïa", "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat", "M'Sila", "Mascara", "Médéa", "Mila", "Mostaganem", "Naâma", "Oran", "Ouargla", "Oum El Bouaghi", "Relizane", "Saïda", "Sétif", "Sidi Bel Abbès", "Skikda", "Souk Ahras", "Tamanrasset", "Tébessa", "Tiaret", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou", "Tlemcen"].sort(),
  Bahrain: ["Capital Governorate", "Muharraq", "Northern Governorate", "Southern Governorate"].sort(),
  "Saudi Arabia": ["Abha", "Al Bahah", "Al Hofuf", "Al Jubail", "Al Kharj", "Dammam", "Dhahran", "Jeddah", "Jizan", "Khobar", "Mecca", "Medina", "Najran", "Qatif", "Riyadh", "Tabuk", "Taif", "Yanbu"].sort(),
  "United Arab Emirates": ["Abu Dhabi", "Ajman", "Al Ain", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"].sort(),
};

const jobSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  requiredSkills: Yup.string().required("At least one skill is required"),
  location: Yup.string().required("Location is required"),
  jobCategory: Yup.string().required("Job Category is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  salary: Yup.number().min(0, "Salary cannot be negative").required("Salary is required"),
  jobPeriod: Yup.string().required("Job Period is required"),
  experience: Yup.string().required("Experience level is required"),
  applicationDeadline: Yup.string()
    .required("Application Deadline is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  jobType: Yup.string().oneOf(["In-Site", "Remotely", "Hybrid"], "Job Type must be In-Site, Remotely, or Hybrid").required("Job Type is required"),
});

const PostJob = () => {
  const [availableSkills, setAvailableSkills] = useState(["JavaScript", "HTML", "CSS", "React", "Node.js", "Python"]);
  const { mutate: createJob, isLoading } = useCreateJob();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addSkill = (skill, setFieldValue, values) => {
    if (!values.requiredSkills.includes(skill)) {
      const updatedSkills = values.requiredSkills ? `${values.requiredSkills}, ${skill}` : skill;
      setFieldValue("requiredSkills", updatedSkills);
      setAvailableSkills(availableSkills.filter((s) => s !== skill));
    }
  };

  const removeSkill = (skill, setFieldValue, values) => {
    const updatedSkills = values.requiredSkills
      .split(", ")
      .filter((s) => s !== skill)
      .join(", ");
    setFieldValue("requiredSkills", updatedSkills);
    setAvailableSkills([...availableSkills, skill]);
  };

  return (
    <div className="min-h-screen">
      <div
        className="text-white py-14 flex flex-col justify-center items-center rounded-md"
        style={{
          backgroundImage: "url('/rect1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-3">Post A Job</h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold ml-6 my-4">Job Details</h1>
          <div className="h-[1px] bg-[#FF804B] w-[16%]"></div>
        </div>

        <Formik
          initialValues={{
            jobTitle: "",
            jobDescription: "",
            requiredSkills: "",
            location: "",
            jobCategory: "",
            country: "",
            city: "",
            salary: "",
            jobPeriod: "",
            experience: "",
            applicationDeadline: "",
            jobType: "",
          }}
          validationSchema={jobSchema}
          onSubmit={(values, { resetForm }) => {
            const jobData = {
              ...values,
              requiredSkills: values.requiredSkills.split(", ").filter((skill) => skill),
            };
            createJob(jobData, {
              onSuccess: () => {
                toast.success("Job posted successfully!");
                resetForm();
                setAvailableSkills(["JavaScript", "HTML", "CSS", "React", "Node.js", "Python"]);
                queryClient.invalidateQueries("jobs");
                navigate("/dashboard/yourprofile", { state: { activeTab: "jobs" } });
              },
              onError: (error) => {
                toast.error(error.message || "Failed to post job!");
              },
            });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <section className="mb-8">
                <h2 className="text-lg text-main font-semibold mb-4">Basic Information</h2>
                <InputFieldJob label="Job Title" name="jobTitle" placeholder="ex: Web Designer" value={values.jobTitle} onChange={handleChange} onBlur={handleBlur} error={touched.jobTitle && errors.jobTitle} required />
                <InputFieldJob label="Job Description" name="jobDescription" isTextArea={true} placeholder="Write about the job in details..." value={values.jobDescription} onChange={handleChange} onBlur={handleBlur} error={touched.jobDescription && errors.jobDescription} required />
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Job Period"
                    name="jobPeriod"
                    options={[
                      { label: "Full Time", value: "FullTime" },
                      { label: "Part Time", value: "PartTime" },
                    ]}
                    value={values.jobPeriod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.jobPeriod && errors.jobPeriod}
                    required
                  />
                  <SelectField
                    label="Job Category"
                    name="jobCategory"
                    options={[
                      { label: "AI Engineer", value: "AI Engineer" },
                      { label: "Backend Engineer", value: "Backend Engineer" },
                      { label: "Frontend Engineer", value: "Frontend Engineer" },
                      { label: "FullStack Engineer", value: "FullStack Engineer" },
                      { label: "Data Scientist", value: "Data Scientist" },
                      { label: "DevOps Engineer", value: "DevOps Engineer" },
                      { label: "Software Architect", value: "Software Architect" },
                      { label: "QA Engineer", value: "QA Engineer" },
                      { label: "System Administrator", value: "System Administrator" },
                      { label: "Network Engineer", value: "Network Engineer" },
                      { label: "Security Engineer", value: "Security Engineer" },
                      { label: "Cloud Engineer", value: "Cloud Engineer" },
                    ]}
                    value={values.jobCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.jobCategory && errors.jobCategory}
                    required
                  />
                </div>
                <InputFieldJob label="Salary" name="salary" type="number" placeholder="Enter salary" value={values.salary} onChange={handleChange} onBlur={handleBlur} error={touched.salary && errors.salary} required />
                <SelectField
                  label="Job Type"
                  name="jobType"
                  options={[
                    { label: "In-Site", value: "In-Site" },
                    { label: "Remotely", value: "Remotely" },
                    { label: "Hybrid", value: "Hybrid" },
                  ]}
                  value={values.jobType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.jobType && errors.jobType}
                  required
                />
                <InputFieldJob label="Application Deadline" name="applicationDeadline" type="date" value={values.applicationDeadline} onChange={handleChange} onBlur={handleBlur} error={touched.applicationDeadline && errors.applicationDeadline} required />
              </section>

              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Skills & Experiences</h2>
                <InputFieldJob label="Required Skills" name="requiredSkills" placeholder="Add required skills" value={values.requiredSkills} onChange={handleChange} onBlur={handleBlur} error={touched.requiredSkills && errors.requiredSkills} required />
                <div className="flex flex-wrap gap-2 mb-2">
                  {availableSkills.map((skill) => (
                    <button key={skill} type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => addSkill(skill, setFieldValue, values)}>
                      {skill}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {values.requiredSkills.split(", ").map(
                    (skill) =>
                      skill && (
                        <div key={skill} className="bg-main text-white px-4 py-2 rounded-lg flex items-center">
                          {skill}
                          <button type="button" className="ml-2 text-white font-bold" onClick={() => removeSkill(skill, setFieldValue, values)}>
                            X
                          </button>
                        </div>
                      )
                  )}
                </div>
                <SelectField
                  label="Experience"
                  name="experience"
                  options={[
                    { label: "Fresher", value: "Fresher" },
                    { label: "Intermediate", value: "Intermediate" },
                    { label: "Expert", value: "Expert" },
                    { label: "No Experience", value: "No Experience" },
                    { label: "Internship", value: "Internship" },
                  ]}
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.experience && errors.experience}
                  required
                />
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">Address & Location</h2>
                <InputFieldJob label="Location" name="location" placeholder="e.g. Street name, Building No." value={values.location} onChange={handleChange} onBlur={handleBlur} error={touched.location && errors.location} required />
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Country"
                    name="country"
                    options={Object.keys(countryCities).map((country) => ({
                      label: country,
                      value: country,
                    }))}
                    value={values.country}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("city", "");
                    }}
                    onBlur={handleBlur}
                    error={touched.country && errors.country}
                    required
                  />
                  <SelectField
                    label="City"
                    name="city"
                    options={
                      values.country && countryCities[values.country]
                        ? countryCities[values.country].map((city) => ({
                            label: city,
                            value: city,
                          }))
                        : []
                    }
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                    required
                    disabled={!values.country}
                  />
                </div>
              </section>

              <button type="submit" className="bg-main text-white px-12 font-medium py-2 mt-6 rounded-2xl disabled:bg-gray-400" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostJob;
