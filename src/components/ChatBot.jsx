import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Tell me your symptoms", from: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, from: "user" };

    let botReply = "Consult a doctor for better advice.";

    if (input.toLowerCase().includes("fever")) {
      botReply = "You may have infection. Stay hydrated and monitor temperature.";
    } else if (input.toLowerCase().includes("headache")) {
      botReply = "Possible stress or dehydration. Take rest.";
    }

    setMessages([...messages, userMsg, { text: botReply, from: "bot" }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-yellow-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-5 right-5 w-72 bg-black text-white rounded-2xl shadow-2xl border border-gray-700">

          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="text-sm">AI Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="h-48 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-yellow-500 text-black text-right ml-auto"
                    : "bg-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type..."
              className="flex-1 p-2 rounded bg-gray-900 text-white outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-yellow-500 px-3 rounded"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}