"use client";
import { Loader2Icon, Send, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

interface ServiceOption {
  id: string;
  label: string;
  subOptions: string[];
  radioQuestion: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "Photography",
    label: "Photography",
    subOptions: ["Portrait", "Product Photography"],
    radioQuestion: "Do you need photo editing & retouching?",
  },
  {
    id: "Videography",
    label: "Videography",
    subOptions: ["Commercial", "Product Promotional Video", "Reels Making"],
    radioQuestion: "Do you need video editing also?",
  },
  {
    id: "Web Design & Development",
    label: "Web Design & Development",
    subOptions: [
      "E-commerce",
      "Portfolio",
      "Corporate Site",
      "Landing Page",
      "Custom Website/Application",
    ],
    radioQuestion: "Do you have any design for your website / application?",
  },
  {
    id: "Digital Marketing Solution",
    label: "Digital Marketing Solution",
    subOptions: ["SEO", "Social Media", "Ads Management", "Content Strategy"],
    radioQuestion: "Do you have existing brand guidelines?",
  },
];

interface ServiceDetailState {
  [key: string]: {
    checkboxes: string[];
    radioValue: string;
    otherDetail: string;
  };
}

export default function MainForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailState>({});

  const toggleService = (serviceId: string) => {
    if (selectedService === serviceId) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceId);
      if (!serviceDetails[serviceId]) {
        setServiceDetails((prev) => ({
          ...prev,
          [serviceId]: { checkboxes: [], radioValue: "No", otherDetail: "" },
        }));
      }
    }
  };

  const handleSubCheckboxChange = (serviceId: string, option: string) => {
    const current = serviceDetails[serviceId] || {
      checkboxes: [],
      radioValue: "No",
      otherDetail: "",
    };
    const isChecked = current.checkboxes.includes(option);

    const newCheckboxes = isChecked
      ? current.checkboxes.filter((c) => c !== option)
      : [...current.checkboxes, option];

    setServiceDetails({
      ...serviceDetails,
      [serviceId]: { ...current, checkboxes: newCheckboxes },
    });
  };

  const handleOtherInputChange = (serviceId: string, value: string) => {
    const current = serviceDetails[serviceId];
    setServiceDetails({
      ...serviceDetails,
      [serviceId]: { ...current, otherDetail: value },
    });
  };

  const handleSubRadioChange = (serviceId: string, value: string) => {
    const current = serviceDetails[serviceId];
    setServiceDetails({
      ...serviceDetails,
      [serviceId]: { ...current, radioValue: value },
    });
  };

  //submit form handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!turnstileToken) {
        setStatus("Please complete the CAPTCHA first.");
        setLoading(false);
        return;
      }

      if (!name || !email || !message) {
        setStatus("Name, email and message are required.");
        setLoading(false);
        return;
      }

      let servicesSummary = "";

      if (selectedService) {
        const details = serviceDetails[selectedService];
        const serviceConfig = SERVICE_OPTIONS.find(
          (s) => s.id === selectedService
        );

        const interests =
          details?.checkboxes
            ?.map((item) => {
              if (item === "Other" && details.otherDetail) {
                return `Other (${details.otherDetail})`;
              }
              return item;
            })
            .join(", ") || "None selected";

        servicesSummary = `
Service: ${selectedService}
Interests: ${interests}
${serviceConfig?.radioQuestion}: ${details?.radioValue || "N/A"}
      `.trim();
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "mainForm",
          turnstileToken,
          name,
          email,
          phone,
          message,
          servicesSummary,
        }),
      });

      const text = await response.text();
      let result: any = {};

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response from server:", text);
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message);
      }

      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSelectedService(null);
      setServiceDetails({});
    } catch (error: any) {
      console.error("Submit error:", error);
      setStatus(error.message || "An error occurred");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const inputClasses =
    "w-full p-4 bg-transparent border-2 border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder:text-gray-400 transition-colors";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Basic Info */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className={inputClasses}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="+880 1XXX XXXXXX"
              required
              className={inputClasses}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <hr className="border-white/20 my-4" />

          {/* --- Service Selection Area --- */}
          <div>
            <label className="block text-white font-bold mb-3">
              Select a service:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`cursor-pointer p-4 rounded-md border-2 transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? "border-red-500 bg-red-500/10"
                        : "border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isSelected ? "text-red-400" : "text-gray-200"
                      }`}
                    >
                      {service.label}
                    </span>
                    {isSelected && <Check size={18} className="text-red-500" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- Conditional Submenus --- */}
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {(() => {
                  const serviceConfig = SERVICE_OPTIONS.find(
                    (s) => s.id === selectedService
                  );
                  if (!serviceConfig) return null;

                  const displayOptions = [...serviceConfig.subOptions, "Other"];

                  return (
                    // Submenu Container
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-2 shadow-sm backdrop-blur-sm">
                      <h3 className="font-bold text-lg text-red-400 mb-4 border-b border-white/10 pb-2">
                        {serviceConfig.label} Options
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Checkboxes */}
                        <div>
                          <p className="text-sm font-semibold text-gray-200 mb-3">
                            What do you need?
                          </p>
                          <div className="flex flex-col gap-3">
                            {displayOptions.map((option) => {
                              const isChecked =
                                serviceDetails[
                                  selectedService
                                ]?.checkboxes.includes(option);
                              return (
                                <div key={option} className="flex flex-col">
                                  <label className="flex items-center space-x-2 cursor-pointer group">
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-red-600 bg-transparent border-white/40 rounded focus:ring-red-500 focus:ring-offset-0"
                                      checked={isChecked || false}
                                      onChange={() =>
                                        handleSubCheckboxChange(
                                          selectedService,
                                          option
                                        )
                                      }
                                    />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">
                                      {option}
                                    </span>
                                  </label>

                                  {/* Conditional Input for Other */}
                                  {option === "Other" && isChecked && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{
                                        opacity: 1,
                                        height: "auto",
                                      }}
                                      className="ml-6 mt-2"
                                    >
                                      <input
                                        type="text"
                                        placeholder="Please specify..."
                                        className="w-full p-2 text-sm bg-transparent border border-white/30 text-white rounded focus:border-red-500 focus:outline-none placeholder:text-gray-500"
                                        value={
                                          serviceDetails[selectedService]
                                            ?.otherDetail || ""
                                        }
                                        onChange={(e) =>
                                          handleOtherInputChange(
                                            selectedService,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Yes/No Radio */}
                        <div>
                          <p className="text-sm font-semibold text-gray-200 mb-3">
                            {serviceConfig.radioQuestion}
                          </p>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`${selectedService}-radio`}
                                value="Yes"
                                checked={
                                  serviceDetails[selectedService]
                                    ?.radioValue === "Yes"
                                }
                                onChange={() =>
                                  handleSubRadioChange(selectedService, "Yes")
                                }
                                className="w-4 h-4 text-red-600 bg-transparent border-white/40 focus:ring-red-500 focus:ring-offset-0"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`${selectedService}-radio`}
                                value="No"
                                checked={
                                  serviceDetails[selectedService]
                                    ?.radioValue === "No"
                                }
                                onChange={() =>
                                  handleSubRadioChange(selectedService, "No")
                                }
                                className="w-4 h-4 text-red-600 bg-transparent border-white/40 focus:ring-red-500 focus:ring-offset-0"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            name="message"
            placeholder="Additional details or message..."
            rows={5}
            required
            className={inputClasses}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {/* Cloudflare Turnstile */}
          <div className="flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
              options={{ appearance: "always" }}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          </div>

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
                <p className="font-bold text-white">{status}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
