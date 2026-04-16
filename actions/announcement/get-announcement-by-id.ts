'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/database.types"

type Announcement = Database["public"]["Tables"]["announcement"]["Row"];

export async function getAnnouncementById(id: string): Promise<{ data: Announcement | null, error: string | null }> {
    const supabase = await createClient()

    if (!id) {
        return { data: null, error: "Invalid ID provided" }
    }

    const { data, error } = await supabase
        .from("announcement")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        return { data: null, error: error.message }
    }

    return { data, error: null }
}