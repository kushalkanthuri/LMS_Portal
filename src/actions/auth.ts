"use server"

import { prisma } from "@/lib/db"
import type { LoginSchema } from "@/lib/validators"
import { compare } from "bcrypt"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function loginUser(
  data: LoginSchema
): ActionOutput<{ redirect: string }> {
  try {
    const user = await prisma.users.findUnique({
      where: { email: data.email },
    })
    if (!user) {
      throw new Error("User doesn't exist with " + data.email)
    }

    const isPassMatch = await compare(data.password, user.password)
    if (!isPassMatch) {
      throw new Error("Incorrect password. Please enter a correct password.")
    }

    const session = await getIronSession<SessionUser>(await cookies(), {
      cookieName: "session",
      password: process.env.SESSION_SECRET_KEY!,
    })

    session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    await session.save()

    return {
      success: true,
      redirect: user.role === "student" ? "/portal" : "/dashboard",
    }
  } catch (e) {
    return {
      success: false,
      error:
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again later",
    }
  }
}

export async function logoutUser(): ActionOutput<{ redirect: string }> {
  try {
    const session = await getIronSession<SessionUser>(await cookies(), {
      cookieName: "session",
      password: process.env.SESSION_SECRET_KEY!,
    })

    session.destroy()

    return {
      success: true,
      redirect: "/login",
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Something went wrong",
    }
  }
}

export async function getUserSession() {
  const session = await getIronSession<SessionUser>(await cookies(), {
    cookieName: "session",
    password: process.env.SESSION_SECRET_KEY!,
  })

  if (!session.user) {
    return null
  }

  return session.user
}
