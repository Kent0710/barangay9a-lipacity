'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/database.types"

type EducationalResource = Database["public"]["Tables"]["educational_resource"]["Row"];

export async function getAllEducationalResources(limit: number = 6): Promise<{ data: EducationalResource[] | null, error: string | null }> {
    const supabase = await createClient()

    let query = supabase
        .from("educational_resource")
        .select("*")
        .order("created_at", { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        return { data: null, error: error.message }
    }

    return { data, error: null }
}