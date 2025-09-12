"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2Icon, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { PhoneInput } from "../components/Phone-Input";

export default function Contact() {
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
    form.append("access_key", "cf7ea563-c1a8-473a-b2fb-554b4d2dc8d4");
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
        // Clear form fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }

      setLoading(false);

      // Hide status after 5 seconds
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
    <div className="container mx-auto p-4">
      <div>
        <Card className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1">
          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-1">Our Location</h2>
            <div className="flex items-start gap-3">
              <MapPin />
              <p>
                115, SHELTECH Rubynoor,
                <br />
                Level 3,
                <br />
                Senpara Parbata, Mirpur 10,
                <br />
                Dhaka, Bangladesh,
              </p>
            </div>
          </Card>
          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
            <p>
              <span className="flex items-center gap-4">
                <Phone /> Mobile: +880 1711-123456
              </span>
              <br />
              <span className="flex items-center gap-4">
                <Mail /> Email: info@example.com
              </span>
            </p>
          </Card>
        </div>

        {/* Form */}
        <div className="flex-1">
          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Get in Touch
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <Label htmlFor="name" className="mb-3">
                  Your Name
                </Label>
                <Input
                  required
                  className="bg-white"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email" className="mb-3">
                  Your Email
                </Label>
                <Input
                  required
                  className="bg-white"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <Label htmlFor="phone" className="mb-3">
                  Your Phone
                </Label>
                <PhoneInput
                  required
                  className="bg-white dark:bg-card rounded-md"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(value) => setPhone(value || "")}
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <Label htmlFor="message" className="mb-3">
                  Your Message
                </Label>
                <Textarea
                  required
                  className="bg-white"
                  id="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className="mt-10 text-center">
                <Button
                  type="submit"
                  className="btn btn-primary cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
                  disabled={loading}
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
                </Button>

                {/* Status Message */}
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
          </Card>
        </div>
      </div>
    </div>
  );
}
