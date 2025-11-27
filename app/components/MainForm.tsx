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
    subOptions: ["Portrait", "Product Photography"],
    radioQuestion: "Do you photo editing & retouching?",
  },
  {
    id: "Videography",
    label: "Videography",
    subOptions: ["Commercial", "Product Promotional Video", "Reels Making"],
    radioQuestion: "Do you video editing also?",
  },
  {
    id: "Web Design & Development",
    label: "Web Design & Development",
    subOptions: ["E-commerce", "Portfolio", "Corporate Site", "Landing Page","Custom Website/Application"],
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
    otherDetail: string; // Added to store text for "Other"
  };
}

export default function MainForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // CHANGED: Single string instead of array for exclusive selection
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailState>({});

  const toggleService = (serviceId: string) => {
    // If clicking the already selected one, deselect it. Otherwise, select new one.
    if (selectedService === serviceId) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceId);
      // Initialize state for this service if it doesn't exist yet
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

  // NEW: Handle text input for "Other"
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "241e599a-7dc1-4ecf-9d6f-ded6ddd0a9cd");
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);

    let servicesSummary = "";

    // Process the single selected service
    if (selectedService) {
      const details = serviceDetails[selectedService];
      const serviceConfig = SERVICE_OPTIONS.find(
        (s) => s.id === selectedService
      );

      // Format interests, including specific text for "Other" if applicable
      const interests = details?.checkboxes
        .map((item) => {
          if (item === "Other" && details.otherDetail) {
            return `Other (${details.otherDetail})`;
          }
          return item;
        })
        .join(", ");

      servicesSummary = `
          Service: ${selectedService}
          - Interests: ${interests || "None selected"}
          - ${serviceConfig?.radioQuestion}: ${details?.radioValue}
          `;
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
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSelectedService(null);
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

                  // Dynamically add "Other" to options
                  const displayOptions = [...serviceConfig.subOptions, "Other"];

                  return (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-2 shadow-sm">
                      <h3 className="font-bold text-lg text-red-600 mb-4 border-b border-gray-200 pb-2">
                        {serviceConfig.label} Options
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1: Checkboxes */}
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-3">
                            What do you need?
                          </p>
                          <div className="flex flex-col gap-3">
                            {displayOptions.map((option) => {
                              const isChecked =
                                serviceDetails[
                                  selectedService
                                ]?.checkboxes.includes(option);
                              return (
                                <div key={option} className="flex">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                      checked={isChecked || false}
                                      onChange={() =>
                                        handleSubCheckboxChange(
                                          selectedService,
                                          option
                                        )
                                      }
                                    />
                                    <span className="text-gray-600">
                                      {option}
                                    </span>
                                  </label>

                                  {/* Conditional Input for Other */}
                                  {option === "Other" && isChecked && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      className="ml-6 mt-2"
                                    >
                                      <input
                                        type="text"
                                        placeholder="Please specify..."
                                        className="w-full p-2 text-sm border border-gray-300 rounded focus:border-red-500 focus:outline-none"
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

                        {/* Column 2: Yes/No Radio */}
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-3">
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
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-gray-600">Yes</span>
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
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-gray-600">No</span>
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
