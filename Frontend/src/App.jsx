import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm CodeBuddy 👋 Ask me any coding doubt — JavaScript, React, Node.js, debugging, DSA, anything."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: input
      }
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      const data = await res.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply.content
        }
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the server."
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1>CodeBuddy</h1>
        <p className="subtitle">
          Your Developer Doubt Solver
        </p>

        <div className="examples">
          Try:
          <span> What is closure in JavaScript?</span> |
          <span> Explain async/await</span> |
          <span> Debug this React error</span>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role}`}
            >
              <strong>
                {msg.role === "user"
                  ? "You"
                  : "CodeBuddy"}
                :
              </strong>{" "}
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="thinking">
              CodeBuddy is thinking...
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask coding doubts..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;