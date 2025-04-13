import { getIronSession } from "iron-session"
import { NextResponse, type NextRequest } from "next/server"
import {
  authRoutes,
  facultyPathMatcher,
  privateRoutes,
  studentPathMatcher,
} from "./lib/routes"

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getMiddlewareSession(request, response)
  const pathType = getPathType(request.nextUrl.pathname)

  if (pathType === "auth") {
    if (session) {
      if (session.role === "student") {
        return NextResponse.redirect(new URL("/portal", request.url))
      }
      if (session.role === "faculty") {
        return NextResponse.redirect(new URL("/dashboard/faculty", request.url))
      }
      if (session.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url))
      }
    }
  } else if (pathType === "private") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (request.nextUrl.pathname === "/dashboard") {
      if (session.role === "student") {
        return NextResponse.redirect(new URL("/portal", request.url))
      }
      if (session.role === "faculty") {
        return NextResponse.redirect(new URL("/dashboard/faculty", request.url))
      }
      if (session.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url))
      }
    }

    const roleType = getRoleType(request.nextUrl.pathname)
    if (roleType === "student" && session.role !== "student") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else if (roleType === "faculty" && session.role !== "faculty") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    } else if (roleType === "admin" && session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/faculty", request.url))
    }
  }

  return NextResponse.next()
}

function getRoleType(path: string) {
  if (path.includes(studentPathMatcher)) {
    return "student"
  }
  if (path.includes(facultyPathMatcher)) {
    return "faculty"
  }

  return "admin"
}

function getPathType(path: string) {
  if (path.includes(authRoutes)) {
    return "auth"
  } else if (privateRoutes.some((route) => path.includes(route))) {
    return "private"
  }

  return "public"
}

async function getMiddlewareSession(
  request: NextRequest,
  response: NextResponse
) {
  const session = await getIronSession<SessionUser>(request, response, {
    cookieName: "session",
    password: process.env.SESSION_SECRET_KEY!,
  })

  if (session.user) {
    return session.user
  }

  return null
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
