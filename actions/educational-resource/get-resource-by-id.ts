'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/database.types"

type EducationalResource = Database["public"]["Tables"]["educational_resource"]["Row"];

export async function getEducationalResourceById(id: string): Promise<{ data: EducationalResource | null, error: string | null }> {
    const supabase = await createClient()

    if (!id) {
        return { data: null, error: "Invalid ID provided" }
    }

    const { data, error } = await supabase
        .from("educational_resource")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        return { data: null, error: error.message }
    }

    return { data, error: null }
}