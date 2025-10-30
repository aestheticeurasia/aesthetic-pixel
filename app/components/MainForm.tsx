"use client";
import { Loader2Icon, Send } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function MainForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "241e599a-7dc1-4ecf-9d6f-ded6ddd0a9cd");
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);
    form.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }

      setLoading(false);
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred");
      setLoading(false);

      setTimeout(() => {
        setStatus(null);
      }, 10000);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              required
              className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              required
              className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <textarea
            name="message"
            placeholder="Write a Message"
            rows={5}
            required
            className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2Icon className="animate-spin font-bold" /> &nbsp;
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center font-bold">
                <Send /> &nbsp; Send Message
              </span>
            )}
          </button>
          <AnimatePresence>
            {status && (
              <motion.div
                key={status}
                className="text-center mt-5 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="font-bold">{status}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
