import React from "react";
import BaseLayout from "@/components/BaseLayout";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsMailbox,
  BsWhatsapp,
} from "react-icons/bs";
import { MdMail } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <BaseLayout>
      <div className="home">
        <h2
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
          style={
            { color: "#545454", textAlign: "justify" } as React.CSSProperties
          }
        >
          Stay connected and drop me a line! Whether you&apos;re looking to chat
          about exciting opportunities, share innovative ideas, or just say
          hello, the door to communication is wide open. Feel free to reach out
          through the channels below. Let&apos;s create something awesome
          together!
        </p>
        <div
          style={
            { paddingLeft: "15px", paddingTop: "15px" } as React.CSSProperties
          }
        >
          <a
            href="https://github.com/raka-raprast"
            target="_blank"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
              } as React.CSSProperties
            }
          >
            <BsGithub
              size={20}
              style={
                {
                  marginRight: "10px",
                  color: "black",
                } as React.CSSProperties
              }
            />
            <p style={{ color: "black" } as React.CSSProperties}>
              Explore my projects on GitHub
            </p>
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
              } as React.CSSProperties
            }
          >
            <BsInstagram
              size={20}
              style={
                {
                  marginRight: "10px",
                  color: "black",
                } as React.CSSProperties
              }
            />
            <p style={{ color: "black" } as React.CSSProperties}>
              Casually reach me out on Instagram
            </p>
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
              } as React.CSSProperties
            }
          >
            <BsLinkedin
              size={20}
              style={
                {
                  marginRight: "10px",
                  color: "black",
                } as React.CSSProperties
              }
            />
            <p style={{ color: "black" } as React.CSSProperties}>
              Professionally reach me out on LinkedIn
            </p>
          </a>
          <a
            href="mailto:raprast.raka@gmail.com"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
              } as React.CSSProperties
            }
          >
            <MdMail
              size={20}
              style={
                {
                  marginRight: "10px",
                  color: "black",
                } as React.CSSProperties
              }
            />
            <p style={{ color: "black" } as React.CSSProperties}>
              Send me an Email
            </p>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6281369833149"
            rel="noopener noreferrer"
            style={
              {
                textDecoration: "none",
                display: "flex",
                paddingTop: "15px",
              } as React.CSSProperties
            }
          >
            <BsWhatsapp
              size={20}
              style={
                {
                  marginRight: "10px",
                  color: "black",
                } as React.CSSProperties
              }
            />
            <p style={{ color: "black" } as React.CSSProperties}>
              Say hi on Whatsapp
            </p>
          </a>
        </div>
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Contact;
