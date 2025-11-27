"use client";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import MainForm from "../components/MainForm";

export default function Contact() {
  return (
    <div className="container mx-auto p-4 lg:mt-15 mt-10">
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-1/3 w-full flex flex-col gap-5">
          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md h-1/2">
            <h2 className="text-xl font-semibold mb-1">Our Location</h2>
            <div className="flex items-start gap-3">
              <MapPin />
              <p>
                115, SHELTECH Rubynur,
                <br />
                Level 3,
                <br />
                Senpara Parbata, Mirpur 10,
                <br />
                Dhaka, Bangladesh.
              </p>
            </div>
          </Card>

          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md h-1/2">
            <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
            <p>
              <span className="flex items-center gap-4">
                <Phone /> +880 1970-831822
              </span>
              <br />
              <span className="flex items-center gap-4">
                <Mail /> info@aestheticeurasia.com
              </span>
            </p>
          </Card>
        </div>

        <div className="md:w-2/3 w-full">
          <Card className="bg-[#edeef0] dark:bg-card p-6 rounded-lg shadow-md w-full h-auto flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-center mt-5">
              Get in Touch
            </h2>
            <div>
              <MainForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
