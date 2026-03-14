import { supabase } from "@/utils/supabaseClient";

export async function logoutUser(router){
    const { error } = await supabase.auth.signOut();
    if(!error){
        router.push('/login')
    } else {
        console.error("Logout error:", error);
        // Force redirect even on error
        router.push('/login')
    }
}
