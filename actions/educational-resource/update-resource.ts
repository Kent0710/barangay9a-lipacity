'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function updateEducationalResource(id: string, formData: FormData) {
    const supabase = await createClient()
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const slug = formData.get("slug") as string
    const icon = formData.get("icon") as string
    const content = formData.get("content") as string

    if (!id) {
        return { error: "Resource ID is missing" }
    }

    if (!title || !description || !slug || !content) {
        return { error: "Title, description, slug, and content are required" }
    }

    const { error } = await supabase
        .from("educational_resource")
        .update({
            title,
            description,
            slug,
            icon: icon || null,
            content
        })
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    redirect("/admin/educational-resources")
}