import BaseLayout from "@/components/BaseLayout";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Contact: React.FC = () => {
  const isClient = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isClient) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsLoading(false);

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);

  return (
    <BaseLayout>
      {isLoading ? (
        <div className="loadingBarWithSideBar">
          <ReactLoading
            type="bars"
            color={"var(--gradient-start)"}
            height={450}
            width={windowSize.width <= 1000 ? 200 : 375}
          />
        </div>
      ) : (
        <div>
          <div
            style={{
              minHeight: "calc(100vh - 80px)",
              padding: "90px 90px 25px 90px",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: windowSize.width <= 1000 ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2
                className="text"
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--color-text-p)",
                  margin: "0 0 40px 0",
                  padding: "0 0 12px 0",
                  borderBottom: "3px solid var(--gradient-start)",
                }}
              >
                Contacts
              </h2>

              <motion.p
                className="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  marginBottom: "48px",
                  textAlign: "justify",
                }}
              >
                Stay connected and drop me a line! Whether you&apos;re looking to chat
                about exciting opportunities, share innovative ideas, or just say
                hello, door to communication is wide open. Feel free to reach
                out through channels below. Let&apos;s create something awesome
                together!
              </motion.p>

              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {[
                  {
                    name: "GitHub",
                    href: "https://github.com/raka-raprast",
                    icon: <Github size={20} />,
                    color: "#24292e",
                    hoverColor: "#2f3542",
                  },
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/raka.raprast/",
                    icon: <Instagram size={20} />,
                    color: "#515bd4",
                    hoverColor: "#6170d6",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/raka-raprast/",
                    icon: <Linkedin size={20} />,
                    color: "#0077b5",
                    hoverColor: "#0090c4",
                  },
                  {
                    name: "Email",
                    href: "mailto:raprast.raka@gmail.com",
                    icon: <Mail size={20} />,
                    color: "#d44638",
                    hoverColor: "#e74c3c",
                  },
                  {
                    name: "WhatsApp",
                    href: "https://api.whatsapp.com/send/?phone=6281996255555",
                    icon: <MessageCircle size={20} />,
                    color: "#128c7e",
                    hoverColor: "#25d366",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.name}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                          delay: index * 0.1,
                        },
                      },
                    }}
                  >
                    <motion.div
                      style={
                        {
                          backgroundColor: contact.color,
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "14px 24px",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "15px",
                          fontWeight: 600,
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          cursor: "pointer",
                          border: "2px solid transparent",
                        } as React.CSSProperties
                      }
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: contact.hoverColor,
                        boxShadow:
                          "0 12px 24px -8px rgba(0, 0, 0, 0.3), 0 6px 12px -6px rgba(0, 0, 0, 0.2)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        style={{ marginRight: "12px", display: "flex", alignItems: "center" }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {contact.icon}
                      </motion.div>
                      <span style={{ margin: 0 }}>{contact.name}</span>
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="footer">© 2026 Raka Ramadhani Aulia Prasetyo</div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Contact;
