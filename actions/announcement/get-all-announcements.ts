'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/database.types"

type Announcement = Database["public"]["Tables"]["announcement"]["Row"];

export async function getAllAnnouncements(limit: number = 6): Promise<{ data: Announcement[] | null, error: string | null }> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("announcement")
        .select("*")
        .order("date", { ascending: false })
        .limit(limit)

    return { data, error: error ? error.message : null }
}