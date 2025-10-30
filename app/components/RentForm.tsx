"use client";
import React, { useState, useEffect } from "react";
import { Phone, Send, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface RentFormProps {
  className?: string;
}

export default function RentForm({ className }: RentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rentingHour: "",
    bookingDate: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingDatePopoverOpen, setBookingDatePopoverOpen] = useState(false);

  useEffect(() => {
    if (bookingDate) {
      setFormData((prev) => ({
        ...prev,
        bookingDate: format(bookingDate, "d-MMM-yyyy"),
      }));
    } else {
      setFormData((prev) => ({ ...prev, bookingDate: "" }));
    }
  }, [bookingDate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "241e599a-7dc1-4ecf-9d6f-ded6ddd0a9cd",
          subject: "Studio Rent",
          sender_name: formData.name,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          hour_needed: formData.rentingHour,
          message: formData.project,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmissionMessage(
          "Thank you! We received your inquiry and will be in touch within 24 hours."
        );
        setFormData({
          name: "",
          phone: "",
          rentingHour: "",
          bookingDate: "",
          project: "",
        });
        setBookingDate(undefined);
      } else {
        setSubmissionMessage(
          "Oops! Something went wrong. Please try again later."
        );
      }
      setTimeout(() => setSubmissionMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setSubmissionMessage("Network error! Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className={cn(className)}>
      {/* 👇 all text inherits the color from parent via Tailwind */}
      <div className={cn("space-y-4", className)}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Studio Rent Inquiry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5" />
                </div>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXXX XXXXX"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Renting Hour
              </label>
              <Input
                type="number"
                name="rentingHour"
                min={2}
                value={formData.rentingHour}
                onChange={handleChange}
                placeholder="How many hours you need?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Target Booking Date
              </label>
              <Popover
                open={!!bookingDatePopoverOpen}
                onOpenChange={(state) => setBookingDatePopoverOpen(state)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left flex items-center bg-transparent",
                      !bookingDate && "text-gray-400",
                      "cursor-pointer"
                    )}
                  >
                    {bookingDate ? format(bookingDate, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingDate}
                    onSelect={(date) => {
                      setBookingDate(date);
                      setBookingDatePopoverOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    className="cursor-pointer bg-transparent"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Project Details
            </label>
            <Textarea
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Your Message..."
              rows={4}
            />
          </div>
          <AnimatePresence>
            {submissionMessage && (
              <motion.div
                key={submissionMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="text-center text-sm font-bold rounded-lg">{submissionMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center cursor-pointer bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Inquiry
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
