"use client"
import banner from "@/public/banner.jpg"
import Image from "next/image"
import VerifyCodePage from "../components/VerifyForm"

const page = () => {
  return (
    <div className='bg-purple-200 w-full min-h-screen rounded-xl py-2 px-3 grid grid-cols-2 gap-5'>
      <Image src={banner} alt="banner" className="h-[98vh] rounded-xl"/>
      <VerifyCodePage/>
    </div>
  )
}

export default page