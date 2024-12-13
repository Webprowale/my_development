import AdmissionRequirmentCard from "../../components/AdmissionRequirmentCard";
import ProgrammeDetaisHeader from "../../components/ProgrammeDetaisHeader";
import StudyFooterCard from "../../components/StudyFooterCard";

const ProgrammeDetaisHeaderData = {
  uni: {
    head: "Lakehead University",
    logo: "/assets/study/lakehheadUnivercity.svg",
  },
  title: "Computing Science",
  content:
    "If technology is your forte and you possess analytical thinking and attention to detail, the IT world is eagerly seeking individuals like you.",
  banner: "/assets/study/boy-with-system.svg",
};
const CourseDetail = () => {
  return (
    <div className="bg-white">
      {/* Programme HeaderSection */}
      {/* <ProgrammeDetaisHeader {...ProgrammeDetaisHeaderData} /> */}
      {/* End Programme HeaderSection */}

      <div className="p-[1rem] md:p-[unset] max-w-[946px] md:mx-auto mt-[1rem] md:mt-[6rem]">
        <div className="text-[#676E7E] text-[1rem] font-[500] flex flex-col gap-[1rem] md:gap-[2rem]">
          <p>
            Embark on your IT career journey with our Computer Information
            Technology diploma. Over the course of two years, this program goes
            beyond teaching you how to construct an information system; {"it's"}{" "}
            designed to lay the foundation for a lasting career in the field.
          </p>
          <p>
            Our Canadian Information Processing Society-accredited program
            offers a holistic introduction to the information technology
            industry. {"You'll"} engage in a mix of classroom theory, hands-on
            projects, and immersive workplace experiences. This combination
            ensures a thorough understanding of IT concepts and their practical
            applications.
          </p>
        </div>

        <div className="bg-[#E4E7EC] h-[1px] w-[100%] my-[3rem]">{/*  */}</div>

        {/*Admission Requirement  */}
        <div>
          <h2 className="text-[#1D2433] font-[700] text-[1.3rem] md:text-[2rem]">
            Admission Requirements
          </h2>

          <div className="mt-[1rem] flex flex-col items-center gap-[0.75rem]  md:mt-[1.5rem]">
            <AdmissionRequirmentCard title="Valid Passport" />
            <AdmissionRequirmentCard title="Letter of Acceptance" />
            <AdmissionRequirmentCard title="Passport Photo" />
          </div>
        </div>
        {/* end Admission Requirement  */}

        <div className="bg-[#E4E7EC] h-[1px] w-[100%] my-[3rem]">
          {/*line  */}
        </div>

        <div>
          <p className="font-[700] text-[0.875rem] text-[#1D2433] tracking-widest pb-[0.75rem]">
            OFFERED BY
          </p>

          <div className="flex items-center gap-[0.75rem]">
            <img
              className="block w-[60px] h-[60px]"
              src="/assets/study/anotheruniLogo.svg"
              alt=""
            />
            <div>
              <p className="font-[700] text-[1rem] tracking-[-0.5px]">
                Trinity Western University
              </p>
              <p className="text-[#0D6EFD] flex items-center gap-[0.5rem]">
                <span>Learn More</span>
                <span>{/* Icon */}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[1.5rem]">
          <StudyFooterCard colorVariant="thickblue" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
