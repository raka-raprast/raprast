import { ProjectModel } from "@/models/projects_model";
import { AiFillCode, AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import {
  BsBook,
  BsBriefcase,
  BsGear,
  BsJournal,
  BsLaptop,
  BsMoon,
  BsPeople,
  BsPhone,
  BsSun,
  BsWrench,
} from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import {
  MdApi,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMenu,
  MdPhone,
  MdPhoneIphone,
  MdWeb,
} from "react-icons/md";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectModel;
};


export function GetIcon(type: string | null) {
  if (type === "Mobile App") {
    return <MdPhoneIphone />
  } else if (
    type === "Web App") {
    return <MdWeb />
  } else if (
    type === "Back End") {
    return <MdApi />
  } else if (
    type === "Hardware") {
    return <BsGear />
  } else if (
    type === "Machine Learning") {
    return <AiFillCode />
  }

}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" } as React.CSSProperties}
    >
      <div
        className="text card"
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
      //      boxShadow: "0px 1px 1px var(--gradient-start)",
      //     marginRight: "15px",
      //   } as React.CSSProperties
      // }
      >
        <div style={{ overflow: "hidden" } as React.CSSProperties}>
          <div
            style={
              {
                fontSize: "14px",
                paddingRight: "15px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              } as React.CSSProperties
            }
          >
            {project.name}
          </div>
          <div
            style={
              {
                fontSize: "10px",
                marginBottom: "5px",
              } as React.CSSProperties
            }
          >
            {project.date}
          </div>
          <div
            style={
              {
                fontSize: "10px",
                // paddingRight: "5px",
                marginBottom: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              } as React.CSSProperties
            }
          >
            {project.description}
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
          {
            GetIcon(project.type)
          }
          {/* <Image
            className="skillLogo"
            width={30}
            height={30}
            src={project.imagePath}
            alt="skills logo"
          /> */}
        </div>
      </div>
    </a>
  );
}
