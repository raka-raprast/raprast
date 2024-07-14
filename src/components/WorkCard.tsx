import { WorkExperience } from "@/models/experience_model";
import Image from "next/image";

type WorkCardProps = {
  workExperience: WorkExperience;
};

export default function WorkCard({ workExperience }: WorkCardProps) {
  return (
    <div
      style={
        {
          display: "flex",
          flexDirection: "row",
          marginBottom: "30px",
          overflow: "hidden",
          padding: "15px",
          borderRadius: "6px",
          border: "1px solid var(--color-border)",
          boxShadow: "0.5px 0.5px 0.5px 0.5px #7fc7d9",
        } as React.CSSProperties
      }
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
          {workExperience.company_name}
        </div>
        <div
          className="text"
          style={
            {
              fontSize: "12px",
            } as React.CSSProperties
          }
        >
          {workExperience.job_title}
        </div>
        <div
          className="text"
          style={
            {
              fontSize: "12px",
            } as React.CSSProperties
          }
        >
          {workExperience.start_date} - {workExperience.end_date}
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
        <Image
          style={
            {
              backgroundColor: "white",
              borderRadius: "5px",
            } as React.CSSProperties
          }
          width={50}
          height={50}
          src={workExperience.imagePath}
          alt="work logo"
        />
      </div>
    </div>
  );
}
