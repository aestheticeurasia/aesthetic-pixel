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
import { Spinner } from "@/components/ui/spinner";

interface BookASlotFormProps {
  buttonColor?: string; // optional, default: "bg-red-600"
}

export default function BookASlotForm({
  buttonColor = "bg-red-600",
}: BookASlotFormProps) {
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
  const [bookingDatePopoverOpen, setBookingDatePopoverOpen] = useState(false);

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
    <div className="p-8 rounded-xl shadow-lg flex flex-col h-full text-current">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Fast-Track Booking Inquiry
      </h3>
      <p className="text-sm mb-6 text-center">
        Fill in the details and we’ll get back to you within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col flex-grow"
      >
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Your Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="placeholder:text-current"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Phone Number *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-current opacity-50" />
              </div>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXXX XXXXX"
                className="pl-10 placeholder:text-current"
                required
              />
            </div>
          </div>
        </div>

        {/* Email & Booking Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@domain.com"
              className="placeholder:text-current"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
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
                    "w-full pl-3 text-left flex items-center cursor-pointer",
                    !bookingDate && "",
                    "bg-transparent text-current border-current hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  className="cursor-pointer"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Company & Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Company Name
            </label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="placeholder:text-current"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Website URL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EarthIcon className="h-5 w-5 text-current opacity-50" />
              </div>
              <Input
                type="string"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="pl-10 placeholder:text-current"
              />
            </div>
          </div>
        </div>

        {/* Preferred Angle & Retouching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Preferred Angle
            </label>
            <div className="flex flex-wrap gap-4">
              {["Front", "Back", "Side", "Details"].map((angle) => (
                <label key={angle} className="flex items-center text-current">
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
                    className="h-4 w-4 accent-red-500 rounded border-current focus:ring-current"
                  />
                  <span className="ml-2 text-sm">{angle}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-current">
              Retouching Requirements
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((option) => (
                <label key={option} className="flex items-center text-current">
                  <input
                    type="radio"
                    name="retouching"
                    value={option}
                    checked={formData.retouching === option}
                    onChange={handleChange}
                    className="h-4 w-4 accent-red-500 border-current focus:ring-current"
                  />
                  <span className="ml-2 text-sm">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Total Projects */}
        <div>
          <label className="block text-sm font-medium mb-1 text-current">
            Total Projects
          </label>
          <Input
            type="string"
            name="totalProjects"
            value={formData.totalProjects}
            onChange={handleChange}
            className="placeholder:text-current"
          />
        </div>

        {/* Remarks */}
        <div className="flex-1 flex flex-col">
          <label className="block text-sm font-medium mb-1 text-current">
            Remarks
          </label>
          <Textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks..."
            rows={4}
            className="flex-1 placeholder:text-current"
          />
        </div>

        {/* Submission Message */}
        {submissionMessage && (
          <div className="mt-4 p-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            {submissionMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center mt-auto text-white hover:opacity-90 cursor-pointer",
            buttonColor
          )}
        >
          {isSubmitting ? (
            <>
              <Spinner />
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
  );
}
