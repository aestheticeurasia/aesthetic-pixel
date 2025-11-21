"use client";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Services {
  title: string;
  tag: string;
  slug: string;
  desc: string;
  img: string;
}

export default function ServicesComponents() {
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/services.json");
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner className="size-8 mx-auto" />
      ) : (
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="space-y-4">
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={400}
              className="h-138 rounded-2xl"
            />
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={200}
              className="h-85 rounded-2xl"
            />
          </div>

          <div className="space-y-4">
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={400}
              className="rounded-2xl h-90 mt-20"
            />
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={200}
              className="h-113 rounded-2xl"
            />
          </div>

          <div className="space-y-4">
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={400}
              className="h-100 mt-30 rounded-2xl"
            />
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={200}
              className="h-93 rounded-2xl"
            />
          </div>

          <div className="space-y-4">
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={400}
              className="rounded-2xl h-110"
            />
            <Image
              src="/service1.png"
              alt="Services Overview"
              width={400}
              height={200}
              className="rounded-2xl h-113"
            />
          </div>
        </div>
      )}
    </div>
  );
}
