import { serversupabase } from "@/utils/supabaseClient";

// Bootstrap admin emails — these users are always treated as admin
// even if their user_metadata hasn't been set yet.
const bootstrapAdmins = [
  "rishabhsingh0363@gmail.com",
  "ipmcareeronline@gmail.com",
];

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // Check bootstrap list first
  if (bootstrapAdmins.includes(email)) {
    return res.status(200).json({ success: true, message: "Admin (bootstrap)" });
  }

  // Check user_metadata role
  if (role === "admin") {
    return res.status(200).json({ success: true, message: "Admin (role)" });
  }

  return res.status(200).json({ success: false, message: "Not an admin" });
};
