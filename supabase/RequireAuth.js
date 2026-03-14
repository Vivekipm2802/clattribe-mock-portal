import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirectTo=${encodeURIComponent(router.asPath)}`);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
};

export default RequireAuth;
