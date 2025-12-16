import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

interface WithAuthLayoutProps {
  children: React.ReactNode;
}

export default async function WithAuthLayout({ children }: WithAuthLayoutProps) {
  const cookieStore = await cookies();
  const isTokenExist = cookieStore.get("refreshToken") !== undefined;

  if (!isTokenExist) {
    return redirect("/", RedirectType.replace);
  }

  return children;
}
