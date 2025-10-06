"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface HideOnRoutesProps {
  children: ReactNode;
  routes: string[];
}

export default function HideOnRoutes({ children, routes }: HideOnRoutesProps) {
  const pathname = usePathname();

  if (routes.includes(pathname)) return null; 
  return <>{children}</>;
}