'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const rawUsername = formData.get("username") as string
  const password = formData.get("password") as string

  if (!rawUsername || !password) {
    return { error: "Username and password are required" }
  }

  const username = rawUsername.trim().toLowerCase()
  const email = `${username}@gmail.com`

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const rawUsername = formData.get("username") as string
  const password = formData.get("password") as string

  if (!rawUsername || !password) {
    return { error: "Username and password are required" }
  }

  const username = rawUsername.trim().toLowerCase()
  const email = `${username}@gmail.com`

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}