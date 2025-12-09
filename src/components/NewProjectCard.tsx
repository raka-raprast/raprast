import Image from "next/image";
import { ProjectModel } from "@/models/projects_model";
import { AiFillCode } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { MdApi, MdPhoneIphone, MdWeb } from "react-icons/md";

type ProjectCardProps = {
    project: ProjectModel;
};

export function GetIcon(type: string | null) {
    if (type === "Mobile App") return <MdPhoneIphone />;
    if (type === "Web App") return <MdWeb />;
    if (type === "Back End") return <MdApi />;
    if (type === "Hardware") return <BsGear />;
    if (type === "Machine Learning") return <AiFillCode />;
    return null;
}

export default function NewProjectCard({ project }: ProjectCardProps) {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
        >
            <div
                className="text card"
                style={{
                    padding: 0,
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                }}
            >
                {/* IMAGE WRAPPER */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "220px",
                    }}
                >
                    {/* IMAGE FULL WIDTH */}
                    <Image
                        src={project.imagePath}
                        alt={project.name}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />

                    {/* GRADIENT ABOVE IMAGE */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
                            zIndex: 2,
                        }}
                    />

                    {/* ICON ON TOP OF IMAGE — YOUR FUCKING REQUEST */}
                    {/* <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "28px",
                            color: "white",
                            zIndex: 4, // MAKE SURE IT'S ON TOP
                        }}
                    >
                        {GetIcon(project.type)}
                    </div> */}

                    {/* TEXT OVER IMAGE */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "12px",
                            right: "12px",
                            color: "white",
                            zIndex: 3,
                        }}
                    >
                        <div style={{ fontSize: "16px", fontWeight: 600 }}>
                            {project.name}
                        </div>

                        {/* <div style={{ fontSize: "11px", opacity: 0.9 }}>
                            {project.date}
                        </div> */}

                        <div
                            style={{
                                fontSize: "12px",
                                lineHeight: "1.3",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {project.description}
                        </div>

                    </div>
                </div>
            </div>
        </a>
    );
}
