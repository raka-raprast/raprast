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
          style={{
            marginBottom: "20px",
            paddingBottom: "5px",
            borderBottom: "2px solid rgb(208, 208, 208)",
          }}
        >
          Contacts
        </h2>
        <p className="description" style={{ textAlign: "justify" }}>
          Stay connected and drop me a line! Whether you&apos;re looking to chat
          about exciting opportunities, share innovative ideas, or just say
          hello, the door to communication is wide open. Feel free to reach out
          through the channels below. Let&apos;s create something awesome
          together!
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginTop: "10px" }}>
          <a
            href="https://github.com/raka-raprast"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <div
              className="socmed_button"
              style={{
                backgroundColor: "#24292e",
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
            >
              <BsGithub
                size={20}
                style={{
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <p style={{ color: "white", margin: 0 }}>GitHub</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/raka.raprast/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <div
              className="socmed_button"
              style={{
                backgroundColor: "#515bd4",
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
            >
              <BsInstagram
                size={20}
                style={{
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <p style={{ color: "white", margin: 0 }}>Instagram</p>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/raka-raprast/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <div
              className="socmed_button"
              style={{
                backgroundColor: "#0077b5",
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
            >
              <BsLinkedin
                size={20}
                style={{
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <p style={{ color: "white", margin: 0 }}>LinkedIn</p>
            </div>
          </a>
          <a
            href="mailto:raprast.raka@gmail.com"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <div
              className="socmed_button"
              style={{
                backgroundColor: "#d44638",
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
            >
              <MdMail
                size={20}
                style={{
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <p style={{ color: "white", margin: 0 }}>Email</p>
            </div>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6281996255555"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <div
              className="socmed_button"
              style={{
                backgroundColor: "#128c7e",
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
            >
              <BsWhatsapp
                size={20}
                style={{
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <p style={{ color: "white", margin: 0 }}>WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Contact;
