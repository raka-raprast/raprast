import { EducationExperience } from "@/models/experience_model";
import Image from "next/image";

type EducationCardProps = {
  educationExperience: EducationExperience;
};

export default function EducationCard({
  educationExperience,
}: EducationCardProps) {
  return (
    <div
    className="card"
      // style={
      //   {
      //     display: "flex",
      //     flexDirection: "row",
      //     marginBottom: "30px",
      //     overflow: "hidden",
      //     padding: "15px",
      //     borderRadius: "6px",
      //     border: "1px solid var(--color-border)",
      //     // boxShadow: "0.5px 0.5px 0.5px 0.5px #7fc7d9",
      //     boxShadow: "0px 1px 1px var(--gradient-start)",
      //   } as React.CSSProperties
      // }
    >
      <div>
        <div
          className="text"
          style={
            {
              fontSize: "medium",
              paddingRight: "15px",
              marginBottom: "5px",
            } as React.CSSProperties
          }
        >
          {educationExperience.school_name}
        </div>
        <div
          className="text"
          style={
            {
              fontSize: "12px",
            } as React.CSSProperties
          }
        >
          {educationExperience.major}
        </div>
        <div
          className="text"
          style={
            {
              fontSize: "12px",
            } as React.CSSProperties
          }
        >
          {educationExperience.start_date} - {educationExperience.end_date}
        </div>
      </div>
      <div
        style={
          {
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          } as React.CSSProperties
        }
      >
        {/* <Image
          style={
            {
              borderRadius: "5px",
              backgroundColor: "white",
              boxShadow: "0px 1px 1px var(--gradient-start)",
            } as React.CSSProperties
          }
          width={50}
          height={50}
          src={educationExperience.imagePath}
          alt="education logo"
        /> */}
      </div>
    </div>
  );
}
