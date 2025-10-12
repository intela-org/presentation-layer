"use client";

import useAuth from "@/hooks/useAuth";

const Page = () => {
  useAuth(); 
  return <div>Dashboard</div>;
};

export default Page;
