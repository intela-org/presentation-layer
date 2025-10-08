"use client";
import useAuth from "@/hooks/useAuth";
import React from "react";

const page = () => {
  useAuth();
  return <div></div>;
};

export default page;
