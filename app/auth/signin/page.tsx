"use client"
import Image from "next/image"
import SigninForm from "../components/SigninForm"

const page = () => {
  return (
    <div className='bg-purple-200 w-full min-h-screen py-2 px-3 grid grid-cols-2 gap-5'>
      <Image src={"@/public/banner.jpg"} alt="banner" className="h-[98vh] rounded-xl"/>
      <SigninForm/>
    </div>
  )
}

export default page