"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  CalendarCheck,
  User,
  Smartphone,
  Clock,
  ArrowRight,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Turnstile } from "@marsidev/react-turnstile";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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
    <div>
      <section className="py-13 px-10 border-[#1b0e0e] border-2 rounded-3xl">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-10">
            <div>
              <h1 className="text-white text-xl font-bold">Reserve Space</h1>
              <p className="text-muted-foreground mt-3">
                Coomplete details below
              </p>
            </div>
            <div>
              <div className="border-[#4a1b1b] bg-[#211010] border-1 p-[9px] rounded-full text-[#ef4444]">
                <CalendarCheck />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="relative">
            <Label className="mb-3 block text-muted-foreground font-medium uppercase">
              Full Name
            </Label>
            <User className="absolute left-4 top-[52px] -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="e.g. Alex Smith"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
      mb-4
      bg-[#121212] border-[#2d2d2d] border-2 text-white
      py-[13px] h-12
      pl-11
    "
            />
          </div>

          {/* Phone Number */}
          <div className="relative mt-8">
            <Label className="mb-3 block text-muted-foreground font-medium uppercase">
              Phone Number
            </Label>
            <Smartphone className="absolute left-4 top-[52px] -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="+880 1XXX-XXXXXX"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="
      mb-4
      bg-[#121212] border-[#2d2d2d] border-2 text-white
      py-[13px] h-12
      pl-11
    "
            />
          </div>

          {/* Renting Hour */}
          <div className="mt-8">
            <Label className="mb-3 block text-muted-foreground font-medium uppercase">
              Renting Hour
            </Label>

            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />

              <Select
                value={formData.rentingHour}
                onValueChange={(value) =>
                  setFormData({ ...formData, rentingHour: value })
                }
                required
              >
                <SelectTrigger
                  className="
       mb-4
      bg-[#121212] border-[#2d2d2d] border-2 text-white
      cursor-pointer
      pl-11 w-full h-12"
                >
                  <SelectValue placeholder="Select renting hour" />
                </SelectTrigger>

                <SelectContent className="bg-[#121212] border-[#2d2d2d] border-2 text-white">
                  <SelectItem
                    className="py-[13px] bg-[#121212] border-[#2d2d2d] cursor-pointer"
                    value="2"
                  >
                    2 hours
                  </SelectItem>
                  <SelectItem
                    className="py-[13px] bg-[#121212] border-[#2d2d2d] cursor-pointer"
                    value="3"
                  >
                    3 hours
                  </SelectItem>
                  <SelectItem
                    className="py-[13px] bg-[#121212] border-[#2d2d2d] cursor-pointer"
                    value="4"
                  >
                    4 hours
                  </SelectItem>
                  <SelectItem
                    className="py-[13px] bg-[#121212] border-[#2d2d2d] cursor-pointer"
                    value="5"
                  >
                    5 hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Booking Date */}
          <div className="relative mt-8">
            <Label className="mb-3 block text-muted-foreground font-medium uppercase">
              Booking Date
            </Label>

            <CalendarIcon className="absolute left-4 top-[52px] -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />

            <Popover
              open={bookingDatePopoverOpen}
              onOpenChange={setBookingDatePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="
          cursor-pointer
          w-full
          h-12
          pl-11
          justify-start
          bg-[#121212]
          border-[#2d2d2d] border-2
          text-white
          font-normal
        "
                >
                  {bookingDate ? (
                    format(bookingDate, "PPP")
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 bg-[#272727] border-[#2d2d2d] text-white">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={(date) => {
                    setBookingDate(date);
                    setBookingDatePopoverOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Project Details */}
          <div className="relative mt-8">
            <Label className="mb-3 block text-muted-foreground font-medium uppercase">
              Project Details
            </Label>
            <Textarea
              placeholder="Describe your project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              className="
      mb-4
      bg-[#121212] border-[#2d2d2d] border-2 text-white
      py-[13px] h-24
      pl-4
    "
            />
          </div>

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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
    w-full mt-3 h-12
    bg-white text-primary
    font-bold text-lg
    flex items-center justify-center gap-2
    cursor-pointer
    hover:bg-gray-200
    transition-colors duration-300
    disabled:opacity-60 disabled:cursor-not-allowed
  "
          >
            {isSubmitting ? (
              <>
                <Spinner /> Submitting...
              </>
            ) : (
              <>
                Submit Request
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
          <AnimatePresence>
            {submissionMessage && (
              <motion.p
                key="submission-message"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-8 text-center text-sm text-white font-semibold"
              >
                {submissionMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>
    </div>
  );
}
