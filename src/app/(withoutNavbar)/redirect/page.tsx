import { redirect, RedirectType } from "next/navigation";

interface RedirectProps {
  searchParams: Promise<{
    registered?: string;
  }>;
}

export default async function Redirect({ searchParams }: RedirectProps) {
  const resolvedSearchParams = await searchParams;

  if (resolvedSearchParams.registered === undefined) {
    return redirect("/home", RedirectType.replace);
  }

  return redirect("/signup", RedirectType.replace);
}
