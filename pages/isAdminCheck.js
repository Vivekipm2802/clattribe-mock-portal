import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

// Bootstrap admin emails (fallback for first-time admin setup)
const bootstrapAdmins = [
  "rishabhsingh0363@gmail.com",
  "ipmcareeronline@gmail.com",
];

function IsAdminCheck(props) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const role = user.user_metadata?.role;
      const isAdmin =
        role === "admin" || bootstrapAdmins.includes(user.email);

      if (!isAdmin) {
        router.push("/");
        return;
      }

      setChecking(false);
    }

    checkAdmin();
  }, []);

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return props.children;
}

export default IsAdminCheck;
