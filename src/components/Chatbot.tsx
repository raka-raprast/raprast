import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { askChatbot } from "../lib/api";
import ReactLoading from "react-loading";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const cachedHistory = localStorage.getItem("chatHistory");
    const cachedDate = localStorage.getItem("chatDate");

    if (cachedHistory && cachedDate === today) {
      setHistory(JSON.parse(cachedHistory));
    } else {
      localStorage.removeItem("chatHistory");
      localStorage.removeItem("chatDate");
    }
  }, []);
  
  useEffect(() => {
    // Don't save initial empty history
    if (history.length === 0) return;
    const today = new Date().toLocaleDateString();
    localStorage.setItem("chatHistory", JSON.stringify(history));
    localStorage.setItem("chatDate", today);
  }, [history]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await askChatbot(input);
      const botMessage: ChatMessage = { sender: "bot", text: botResponse };
      setHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: windowSize.width <= 768 ? "90px" : "30px",
          right: windowSize.width <= 768 ? "20px" : "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiX size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiMessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: windowSize.width <= 768 ? "160px" : "100px",
              right: windowSize.width <= 768 ? "20px" : "30px",
              width: windowSize.width <= 768 ? "calc(100vw - 40px)" : "350px",
              height: windowSize.width <= 768 ? "70vh" : "500px",
              background: "rgba(34, 34, 34, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            <div
              style={{
                padding: "15px",
                background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Raprast Bot
            </div>
            <div
              ref={chatHistoryRef}
              style={{
                flex: 1,
                padding: "15px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {history.map((message, index) => (
                <motion.div
                  key={index}
                  style={{
                    alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                    background: message.sender === "user" ? "var(--gradient-start)" : "#333",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "15px",
                    maxWidth: "80%",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {message.text}
                </motion.div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <ReactLoading type="bubbles" color={"var(--gradient-start)"} height={40} width={60} />
                  <p style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "5px", fontStyle: "italic" }}>
                    Feel free to close this and explore while I&apos;m thinking...
                  </p>
                </div>
              )}
            </div>
            <div
              style={{
                padding: "15px",
                borderTop: "1px solid #444",
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={isLoading ? "Thinking..." : "Ask about me..."}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #555",
                  background: "#222",
                  color: "white",
                  outline: "none",
                  cursor: isLoading ? "not-allowed" : "text",
                  fontSize: "1rem",
                }}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "none",
                  background: "var(--gradient-start)",
                  color: "white",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                <FiSend size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
