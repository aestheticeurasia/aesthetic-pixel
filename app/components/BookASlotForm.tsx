"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Phone, Send, Calendar as CalendarIcon, EarthIcon } from "lucide-react";
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

export default function BookASlotForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bookingDate: "",
    company: "",
    website: "",
    angle: [] as string[],
    retouching: "",
    totalProjects: "",
    remarks: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [today, setToday] = useState("");
  const [bookingDatePopoverOpen, setBookingDatePopoverOpen] = useState(false);

  useEffect(() => {
    setToday(dayjs().format("D MMM YYYY"));
  }, []);

  useEffect(() => {
    if (bookingDate) {
      setFormData((prev) => ({
        ...prev,
        bookingDate: format(bookingDate, "d-MMM-yyyy"),
      }));
    }
  }, [bookingDate]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | string[] } }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          subject: "New Booking Inquiry",
          sender_name: formData.name,
          sender_email: formData.email,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          company: formData.company,
          website: formData.website,
          angle: formData.angle,
          retouching: formData.retouching,
          totalProjects: formData.totalProjects,
          remarks: formData.remarks,
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
          email: "",
          bookingDate: "",
          company: "",
          website: "",
          angle: [],
          retouching: "",
          totalProjects: "",
          remarks: "",
        });
        setBookingDate(undefined);
      } else {
        setSubmissionMessage(
          "Oops! Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.error(err);
      setSubmissionMessage("Network error! Please try again later.");
    }
    setIsSubmitting(false);
  };
  return (
    <div>
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-full">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Fast-Track Booking Inquiry
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Fill in the details and we’ll get back to you within 24 hours.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col flex-grow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@domain.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      "w-full pl-3 text-left flex items-center",
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
                      setBookingDatePopoverOpen(false); // Close popover
                    }}
                    disabled={(date) => date < new Date()}
                    className="cursor-pointer"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EarthIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="string"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Angle
              </label>
              <div className="flex flex-wrap gap-4">
                {["Front", "Back", "Side", "Details"].map((angle) => (
                  <label key={angle} className="flex items-center">
                    <input
                      type="checkbox"
                      name="angle"
                      value={angle.toLowerCase()}
                      checked={formData.angle?.includes(angle.toLowerCase())}
                      onChange={(e) => {
                        const value = e.target.value;
                        const currentAngles = formData.angle || [];
                        const updatedAngles = e.target.checked
                          ? [...currentAngles, value]
                          : currentAngles.filter((a) => a !== value);
                        handleChange({
                          target: { name: "angle", value: updatedAngles },
                        });
                      }}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{angle}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retouching Requirements
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="retouching"
                    value="yes"
                    checked={formData.retouching === "yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="retouching"
                    value="no"
                    checked={formData.retouching === "no"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Projects
            </label>
            <div className="relative">
              <Input
                type="string"
                name="totalProjects"
                value={formData.totalProjects}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <Textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks..."
              rows={4}
              className="flex-1"
            />
          </div>

          {submissionMessage && (
            <div className="mt-4 p-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
              {submissionMessage}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white mt-auto cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    </div>
  );
}
