import React from "react";
import BaseLayout from "@/components/BaseLayout";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsMailbox,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { MdFacebook, MdMail } from "react-icons/md";
import Link from "next/link";

const Contact: React.FC = () => {
  return (
    <BaseLayout>
      <div className="home">
        <h2
          className="text"
          style={
            {
              marginBottom: "20px",
              paddingBottom: "5px",
              borderBottom: "2px solid rgb(208, 208, 208)",
            } as React.CSSProperties
          }
        >
          Contacts
        </h2>
        <p
          className="description"
          style={
            { textAlign: "justify" } as React.CSSProperties
          }
        >
          Stay connected and drop me a line! Whether you&apos;re looking to chat
          about exciting opportunities, share innovative ideas, or just say
          hello, the door to communication is wide open. Feel free to reach out
          through the channels below. Let&apos;s create something awesome
          together!
        </p>
        <div>
          <a
            href="https://github.com/raka-raprast"
            target="_blank"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
                paddingRight: "15px",
              } as React.CSSProperties
            }
          >
            <div
              className="socmed_button"
              style={
                {
                  backgroundColor: "#24292e",
                } as React.CSSProperties
              }
            >
              <BsGithub
                size={20}
                style={
                  {
                    marginRight: "10px",
                    color: "white",
                  } as React.CSSProperties
                }
              />
              <p style={{ color: "white" } as React.CSSProperties}>GitHub</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/raka.raprast/"
            target="_blank"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
                paddingRight: "15px",
              } as React.CSSProperties
            }
          >
            <div
              className="socmed_button"
              style={
                {
                  backgroundColor: "#515bd4",
                } as React.CSSProperties
              }
            >
              <BsInstagram
                size={20}
                style={
                  {
                    marginRight: "10px",
                    color: "white",
                  } as React.CSSProperties
                }
              />
              <p style={{ color: "white" } as React.CSSProperties}>Instagram</p>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/raka-raprast/"
            target="_blank"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
                paddingRight: "15px",
              } as React.CSSProperties
            }
          >
            <div
              className="socmed_button"
              style={
                {
                  backgroundColor: "#0077b5",
                } as React.CSSProperties
              }
            >
              <BsLinkedin
                size={20}
                style={
                  {
                    marginRight: "10px",
                    color: "white",
                  } as React.CSSProperties
                }
              />
              <p style={{ color: "white" } as React.CSSProperties}>LinkedIn</p>
            </div>
          </a>
          <a
            href="mailto:raprast.raka@gmail.com"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
                paddingRight: "15px",
              } as React.CSSProperties
            }
          >
            <div
              className="socmed_button"
              style={
                {
                  backgroundColor: "#d44638",
                } as React.CSSProperties
              }
            >
              <MdMail
                size={20}
                style={
                  {
                    marginRight: "10px",
                    color: "white",
                  } as React.CSSProperties
                }
              />
              <p style={{ color: "white" } as React.CSSProperties}>Email</p>
            </div>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6281996255555"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
                paddingRight: "15px",
              } as React.CSSProperties
            }
          >
            <div
              className="socmed_button"
              style={
                {
                  backgroundColor: "#128c7e",
                } as React.CSSProperties
              }
            >
              <BsWhatsapp
                size={20}
                style={
                  {
                    marginRight: "10px",
                    color: "white",
                  } as React.CSSProperties
                }
              />
              <p style={{ color: "white" } as React.CSSProperties}>WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Contact;
