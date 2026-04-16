'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteAnnouncement(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("announcement")
        .delete()
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/announcements")
    revalidatePath("/") // also refresh homepage
    
    return { success: true }
}