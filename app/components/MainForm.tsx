"use client";
import { Loader2Icon, Send, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration for Services ---
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
    subOptions: ["Wedding", "Portrait", "Product", "Event"],
    radioQuestion: "Do you have a location selected?",
  },
  {
    id: "Videography",
    label: "Videography",
    subOptions: ["Commercial", "Music Video", "Documentary", "Social Reels"],
    radioQuestion: "Do you have a script/storyboard?",
  },
  {
    id: "Web Design & Development",
    label: "Web Design & Development",
    subOptions: ["E-commerce", "Portfolio", "Corporate Site", "Landing Page"],
    radioQuestion: "Do you have a domain & hosting?",
  },
  {
    id: "Digital Marketing Solution",
    label: "Digital Marketing Solution",
    subOptions: ["SEO", "Social Media", "PPC Ads", "Content Strategy"],
    radioQuestion: "Do you have existing brand guidelines?",
  },
];

interface ServiceDetailState {
  [key: string]: {
    checkboxes: string[];
    radioValue: string;
  };
}

export default function MainForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailState>({});

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceId));
      const newDetails = { ...serviceDetails };
      delete newDetails[serviceId];
      setServiceDetails(newDetails);
    } else {
      setSelectedServices([...selectedServices, serviceId]);
      setServiceDetails({
        ...serviceDetails,
        [serviceId]: { checkboxes: [], radioValue: "No" },
      });
    }
  };

  const handleSubCheckboxChange = (serviceId: string, option: string) => {
    const current = serviceDetails[serviceId] || {
      checkboxes: [],
      radioValue: "No",
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

  const handleSubRadioChange = (serviceId: string, value: string) => {
    const current = serviceDetails[serviceId] || {
      checkboxes: [],
      radioValue: "No",
    };
    setServiceDetails({
      ...serviceDetails,
      [serviceId]: { ...current, radioValue: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "241e599a-7dc1-4ecf-9d6f-ded6ddd0a9cd");
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);

    let servicesSummary = "";
    if (selectedServices.length > 0) {
      servicesSummary = selectedServices
        .map((serviceId) => {
          const details = serviceDetails[serviceId];
          return `
          ${serviceId}
          - Interests: ${details?.checkboxes.join(", ") || "None"}
          - ${
            SERVICE_OPTIONS.find((s) => s.id === serviceId)?.radioQuestion
          }: ${details?.radioValue}
          `;
        })
        .join("\n--------------------------------\n");
    }

    form.append("Services_Requested", servicesSummary);
    form.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        // Reset Form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSelectedServices([]);
        setServiceDetails({});
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }

      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred");
      setLoading(false);
      setTimeout(() => setStatus(null), 10000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Basic Info */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-4 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full p-4 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              required
              className="w-full p-4 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <hr className="border-gray-300 my-4" />

          {/* --- Service Selection Area --- */}
          <div>
            <label className="block text-gray-700 font-bold mb-3">
              Choose your desired services:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`cursor-pointer p-4 rounded-md border-2 transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isSelected ? "text-red-700" : "text-gray-600"
                      }`}
                    >
                      {service.label}
                    </span>
                    {isSelected && <Check size={18} className="text-red-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- Conditional Submenus --- */}
          <AnimatePresence>
            {selectedServices.map((serviceId) => {
              const serviceConfig = SERVICE_OPTIONS.find(
                (s) => s.id === serviceId
              );
              if (!serviceConfig) return null;

              return (
                <motion.div
                  key={serviceId}
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-2 shadow-sm">
                    <h3 className="font-bold text-lg text-red-600 mb-4 border-b border-gray-200 pb-2">
                      {serviceConfig.label} Options
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Column 1: 4 Checkboxes */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          What do you need?
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {serviceConfig.subOptions.map((option) => (
                            <label
                              key={option}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                checked={
                                  serviceDetails[
                                    serviceId
                                  ]?.checkboxes.includes(option) || false
                                }
                                onChange={() =>
                                  handleSubCheckboxChange(serviceId, option)
                                }
                              />
                              <span className="text-gray-600">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Yes/No Radio */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          {serviceConfig.radioQuestion}
                        </p>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`${serviceId}-radio`}
                              value="Yes"
                              checked={
                                serviceDetails[serviceId]?.radioValue === "Yes"
                              }
                              onChange={() =>
                                handleSubRadioChange(serviceId, "Yes")
                              }
                              className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-gray-600">Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`${serviceId}-radio`}
                              value="No"
                              checked={
                                serviceDetails[serviceId]?.radioValue === "No"
                              }
                              onChange={() =>
                                handleSubRadioChange(serviceId, "No")
                              }
                              className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-gray-600">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <textarea
            name="message"
            placeholder="Additional details or message..."
            rows={5}
            required
            className="w-full p-4 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
