'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function updateAnnouncement(id: string, formData: FormData) {
    const supabase = await createClient()
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const date = formData.get("date") as string

    if (!id) {
        return { error: "Announcement ID is missing" }
    }

    if (!title || !description) {
        return { error: "Title and description are required" }
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return { error: "You must be logged in to update an announcement" }
    }

    const { error } = await supabase
        .from("announcement")
        .update({
            title,
            description,
            category,
            date: date ? new Date(date).toISOString() : new Date().toISOString(),
        })
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    redirect("/admin/announcements")
}