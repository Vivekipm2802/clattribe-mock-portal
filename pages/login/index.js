import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Button, Spacer, Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useNMNContext } from "@/components/NMNContext";
import Image from "next/image";

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetails } = useNMNContext();

  // If already logged in, redirect based on role
  useEffect(() => {
    if (userDetails && userDetails.id) {
      const role = userDetails.user_metadata?.role;
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "teacher") {
        router.push("/teacher");
      } else {
        router.push(router.query.redirectTo ?? "/");
      }
    }
  }, [userDetails]);

  async function handleGoogleLogin() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL || "https://clattribe-mock-portal1.vercel.app",
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // If successful, the user is redirected to Google — no need to handle data here
  }

  return (
    <>
      <div
        className={
          "w-full h-screen max-h-screen lg:p-0 p-6 bg-[#ddd] flex flex-col items-center justify-center overflow-hidden"
        }
      >
        <div className={styles.bgfill}></div>
        <div className="w-full max-w-[1000px] z-10 relative shadow-lg border-1 bg-white border-white h-full max-h-[80vh] md:max-h-[95vh] overflow-hidden my-auto rounded-xl mx-auto flex flex-row justify-between">
          <div
            className={
              styles.col1 + " relative md:flex-1 flex-0 !w-full"
            }
          >
            <img
              className={"relative w-[50vw] md:w-[20vw] mr-auto"}
              width={100}
              src="/newlog.svg"
            />

            <div className={styles.form}>
              <h2
                className="!text-md"
                style={{ color: "var(--brand-col1)" }}
              >
                Welcome to CLAT Tribe
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Sign in with your Google account to continue
              </p>

              <Spacer y={4} />

              <Button
                className="w-full text-white bg-gradient-purple gradient-purple flex items-center justify-center gap-2"
                size="lg"
                onClick={handleGoogleLogin}
                isDisabled={loading}
              >
                {loading ? (
                  <Spinner size="sm" color="default" />
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>

              <Spacer y={2} />
              <p className="text-xs text-center text-gray-400">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>

            <div></div>
          </div>
          <div
            className={
              styles.col2 +
              " !p-3 flex-1 flex flex-col items-stretch justify-center"
            }
          >
            <div className="w-full h-full rounded-3xl relative items-center flex flex-col justify-center">
              <Image
                src="/framed.jpeg"
                alt="CLAT Tribe"
                width={500}
                height={600}
                className="w-full h-auto object-fit"
                priority={false}
                loading="lazy"
                quality={60}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
