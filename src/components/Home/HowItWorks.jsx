import TitleOfSections from "../../ui/TitleOfSections";

function HowItWorks() {
  return (
    <section id="howItWorks" className="py-12 bg-[#FEFEFE]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <TitleOfSections> How It Works?</TitleOfSections>
          <p className="text-gray-500 text-[10px] md:text-base mt-[-13px]">EASY STEPS TO LAND YOUR NEXT JOB OR HIRE THE RIGHT TALENT</p>
        </div>

        <div className="mb-10  relative w-[50%] mx-auto">
          <span className="bg-[#FFD3C1]   text-main px-8 py-1 rounded-full">Job seeker</span>
          <div className="hidden md:block absolute right-[6rem] top-[10px] ">
            <img src="/arrow.png" alt="image of arrow" className="w-[100px] h-[90px]" />
          </div>
        </div>

        <div className="grid   grid-cols-1 md:grid-cols-2 ">
          <div className="w-[340px]  md:w-[480px] h-[400px]">
            <img src="/job-seeker.png" alt="image of job seeker" className="w-full h-full" />
          </div>
          <div className="text-left mt-12 ">
            <ul className="space-y-4 text-gray-600">
              <li className="mb-10">
                <strong>1- Create Your Profile</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1"> Showcase your skills and set your career goals.</p>
              </li>
              <li className="mb-10 ">
                <strong>2- Set Your Preferences</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1 w-[80%]"> Define the type of roles you&apos;re seeking, including location and salary range.</p>
              </li>
              <li className="mb-8 pt-[30px]">
                <strong>3- Get Matched & Apply</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1 w-[80%]"> Receive tailored job recommendations and apply directly in-app.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10  mt-16 relative w-[50%] mx-auto">
          <span className="bg-[#FFD3C1]   text-main px-8 py-1 rounded-full">Employer</span>
          <div className=" block absolute left-[-3rem] md:left-[.6rem] top-[20px] ">
            <img src="/arrow-left.png" alt="image of arrow" className=" w-[60px] h-[70px]  md:w-[190px] md:h-[90px]" />
          </div>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 ">
          <div className="text-left mt-12  mb-6">
            <ul className="space-y-4 text-gray-600">
              <li className="mb-10">
                <strong>1- Create Your Profile</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1"> Share details about your open position and ideal candidate.</p>
              </li>
              <li className="mb-10 ">
                <strong>2- Set Your Preferences</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1 w-[80%]"> Browse a curated list of qualified applicants.</p>
              </li>
              <li className="mb-8 pt-[30px]">
                <strong>3- Get Matched & Apply</strong>
                <br />
                <p className="text-gray-400 text-[15px] mt-1 w-[80%]"> Message candidates and streamline your hiring.</p>
              </li>
            </ul>
          </div>
          <div className=" w-[340px] md:w-[480px] h-[400px]">
            <img src="/job-seeker.png" alt="image of job seeker" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
