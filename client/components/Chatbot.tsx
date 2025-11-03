import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Basic Q&A knowledge base in Bangla
const CHATBOT_RESPONSES: { [key: string]: string } = {
  "কীভাবে প্লাস্টিক জমা দিতে পারি":
    "আপনি আমাদের অ্যাপে যাওয়ার পর 'প্লাস্টিক জমা দিন' বাটনে ক্লিক করে আপনার প্লাস্টিক জমা দিতে পারেন। তারপর প্লাস্টিকের ধরন, ওজন এবং অবস্থান নির্বাচন করুন।",
  "পুরস্কার":
    "প্রতিটি জমা দেওয়া প্লাস্টিকের জন্য আপনি পয়েন্ট অর্জন করবেন। এই পয়েন্টগুলি বিভিন্ন পুরস্কার এবং ছাড়ের জন্য রিডিম করা যায়।",
  "মেশিন":
    "আপনার ড্যাশবোর্ডে 'কাছের মেশিন খুঁজুন' বিকল্পটি ব্যবহার করুন। এটি আপনার এলাকায় সমস্ত উপলব্ধ মেশিনের একটি মানচিত্র দেখাবে।",
  "সাহায্য":
    "আমাদের সাথে এই চ্যাটবটের মাধ্যমে যোগাযোগ করুন অথবা hello@plastixide.com এ ইমেল করুন।",
};

export default function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("chatbot.hello"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to find matching response from knowledge base
  const findResponse = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(CHATBOT_RESPONSES)) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // First check local knowledge base
      const localResponse = findResponse(inputValue);
      if (localResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: localResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // If no local response, try API
        const response = await fetch("/api/chatbot/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputValue }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.success) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.message || t("chatbot.couldNotUnderstand"),
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);
        } else if (data && data.message) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.message,
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);
        } else {
          throw new Error("Invalid response from server");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t("chatbot.errorOccurred"),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-eco-green text-white rounded-full shadow-lg hover:bg-eco-green/90 transition-colors flex items-center justify-center z-40"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-screen md:h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-slide-up">
          {/* Header */}
          <div className="bg-eco-green text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-bangla">
                {t("chatbot.chat")}
              </h3>
              <p className="text-xs text-eco-green/80 text-bangla">
                {t("chatbot.alwaysHere")}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-bangla ${
                    message.sender === "user"
                      ? "bg-eco-green text-white rounded-br-none"
                      : "bg-light-grey text-dark-charcoal rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-eco-green/70"
                        : "text-dark-charcoal/50"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-light-grey text-dark-charcoal px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-dark-charcoal rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-dark-charcoal rounded-full animate-bounce animation-delay-100"></span>
                    <span className="w-2 h-2 bg-dark-charcoal rounded-full animate-bounce animation-delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder={t("chatbot.typeMessage")}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition text-bangla"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-green/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
