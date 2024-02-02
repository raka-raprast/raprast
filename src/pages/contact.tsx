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
            href="https://api.whatsapp.com/send/?phone=6281369833149"
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
            {/* <p style={{ color: "black" } as React.CSSProperties}>
              Say hi on Whatsapp
            </p> */}
          </a>
        </div>
        {/* <div className="flex space-x-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
            href="#"
          >
            <BsTwitterX className="h-4 w-4 mr-2" />
            Twitter
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
            href="#"
          >
            <MdFacebook className="h-4 w-4 mr-2" />
            Facebook
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-600"
            href="#"
          >
            <BsInstagram className="h-4 w-4 mr-2" />
            Instagram
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-800"
            href="#"
          >
            <BsLinkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Link>
        </div> */}
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Contact;
