"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Phone,
  Send,
  Calendar as CalendarIcon,
  EarthIcon,
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
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { GoDotFill } from "react-icons/go";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Turnstile } from "@marsidev/react-turnstile";

interface BookASlotFormProps {
  buttonColor?: string;
}

export default function BookASlotForm({}: BookASlotFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bookingDate: "",
    company: "",
    website: "",
    angle: [] as string[],
    editing: "",
    totalProjects: "",
    remarks: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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
      if (!turnstileToken) {
        setSubmissionMessage("Please complete the CAPTCHA first.");
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "book_a_slot",
          turnstileToken,

          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          company: formData.company,
          website: formData.website,
          angle: formData.angle,
          editing: formData.editing,
          totalProjects: formData.totalProjects,
          remarks: formData.remarks,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

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
        editing: "",
        totalProjects: "",
        remarks: "",
      });

      setBookingDate(undefined);
    } catch (err: any) {
      console.error(err);
      setSubmissionMessage(
        err.message || "Network error! Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <span className="text-sm font-semibold mb-3 text-[#dc2626] flex items-center">
          <GoDotFill className="mr-1 w-5 h-5" />
          FAST-TRACK
        </span>
        <h1 className="font-bold text-white text-3xl leading-relaxed">
          Booking Inquiry
        </h1>
        <p className="text-sm mb-6 lg:text-start text-center text-muted-foreground">
          Fill in the details and we’ll get back to you within 24 hours.
        </p>
      </div>
      <hr className="my-7 border-[#0f0e0e]" />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col flex-grow"
      >
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Your Name *
            </Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Phone Number *
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-white opacity-50" />
              </div>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXXX XXXXX"
                className="pl-10 border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Email & Booking Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@domain.com"
              className="border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="bookingDate"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Target Booking Date
            </Label>
            <Popover
              open={!!bookingDatePopoverOpen}
              onOpenChange={(state) => setBookingDatePopoverOpen(state)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white w-full"
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
            <Label
              htmlFor="company"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Company Name
            </Label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="website"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Website URL
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EarthIcon className="h-5 w-5 text-white opacity-50" />
              </div>
              <Input
                type="string"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="pl-10 border-[#242426] border-2 bg-[#0c0c0e] py-5 focus:border-red-800 text-white"
              />
            </div>
          </div>
        </div>
        <div>
          <Label
            htmlFor="angle"
            className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
          >
            Preferred Angle
          </Label>
          <ToggleGroup
            type="multiple"
            value={formData.angle || []}
            onValueChange={(value) =>
              handleChange({
                target: { name: "angle", value },
              })
            }
            className="flex  w-full gap-3"
          >
            {["front", "back", "side", "details"].map((angle) => (
              <ToggleGroupItem
                key={angle}
                value={angle}
                className="
        px-4 py-2 rounded-lg
        border border-muted-foreground/40
        text-sm text-white capitalize
        data-[state=on]:border-red-500
        data-[state=on]:bg-red-500/10
        data-[state=on]:text-red-600
      "
              >
                {angle}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/*Edit & Total Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Editing Requirements */}
          <div className="w-full">
            <Label
              htmlFor="editing"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Editing Requirements
            </Label>

            <Tabs
              value={formData.editing}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "editing", value },
                })
              }
              className="w-full"
            >
              <TabsList className="w-full rounded-lg bg-[#0f0c0e] grid grid-cols-2 h-auto">
                {["yes", "no"].map((option) => (
                  <TabsTrigger
                    key={option}
                    value={option}
                    className="
              w-full
              px-6 py-2 text-sm capitalize
              bg-transparent
              text-muted-foreground
              data-[state=active]:bg-[#27272a]
              data-[state=active]:text-white
            "
                  >
                    {option}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Total Projects */}
          <div className="w-full">
            <Label
              htmlFor="totalProjects"
              className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
            >
              Total Projects
            </Label>

            <Input
              type="text"
              name="totalProjects"
              value={formData.totalProjects}
              onChange={handleChange}
              className="
        w-full
        border-[#242426] border-2
        bg-[#0c0c0e]
        py-5
        focus:border-red-800
        text-white
      "
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="flex-1 flex flex-col">
          <Label
            htmlFor="remarks"
            className="block text-sm font-semibold mb-2 text-muted-foreground uppercase"
          >
            Remarks
          </Label>
          <Textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks..."
            rows={5}
            className="border-[#242426] border-2 bg-[#0c0c0e] focus:border-red-800 text-white"
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="
    w-full mt-2 h-12
    bg-white text-primary
    font-bold text-md
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
              Submit Inquiry
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

              {/* Submission Message */}
        <AnimatePresence>
          {submissionMessage && (
            <motion.p
              key="submission-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4 text-center text-sm text-white font-semibold"
            >
              {submissionMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
