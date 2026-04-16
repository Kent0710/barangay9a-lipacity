'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/database.types"

type EducationalResource = Database["public"]["Tables"]["educational_resource"]["Row"];

export async function getAllEducationalResources(): Promise<{ data: EducationalResource[] | null, error: string | null }> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("educational_resource")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return { data: null, error: error.message }
    }

    return { data, error: null }
}