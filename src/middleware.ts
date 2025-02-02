import { NextRequest, NextResponse } from "next/server";
import { allowedPaths } from "@/projectData";
import { verifyUserFromAPI } from "./lib/api";
import { FirstLoginGETData } from "./@types/database";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isControlled =
    allowedPaths.some((path) => pathname.startsWith(`/${path}`)) ||
    pathname === "/";

  if (!isControlled) {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get("sessionToken")?.value;
  const apiRequestURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/firstLogin`;
  const { available, currentStep }: FirstLoginGETData = await (
    await fetch(apiRequestURL)
  ).json();

  if (pathname.startsWith("/setup")) {
    if (!available) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    const currentStepUrl = `/setup/step-${currentStep}`;

    if (currentStep === 1) {
      if (pathname === "/setup" || currentStepUrl === pathname)
        return NextResponse.next();
      return NextResponse.redirect(new URL("/setup", req.url));
    }

    if (pathname !== currentStepUrl) {
      return NextResponse.redirect(new URL(currentStepUrl, req.url));
    }

    return NextResponse.next();
  }

  if (available) {
    return NextResponse.redirect(new URL("/setup", req.url));
  }

  if (pathname.startsWith("/dashboard")) {
    const finalSessionToken = req.url.includes("?")
      ? new URL(req.url).searchParams.get("state") ?? undefined
      : sessionToken;

    const isMainPage = pathname === "/dashboard";
    const tokenVerification = await verifyUserFromAPI(finalSessionToken);

    if (!tokenVerification) {
      if (!isMainPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else {
      if (isMainPage) {
        return NextResponse.redirect(new URL("/dashboard/view", req.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
