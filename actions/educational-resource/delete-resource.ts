'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteEducationalResource(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("educational_resource")
        .delete()
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/educational-resources")
    revalidatePath("/educational-resources")
    
    return { success: true }
}