import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("refresh_token")
    ) {
      router.push("/auth/signin");
    }
  });
};

export default useAuth;
