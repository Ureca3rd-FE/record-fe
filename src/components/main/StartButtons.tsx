"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import GoogleIcon from "@/assets/google.svg";
import Button from "@/components/common/Button";

export default function StartButtons() {
  const router = useRouter();

  const onGoogleLogin = () => {
    // TODO: Google 로그인 API 연결
    // 백엔드 base url + /oauth2/authorization/google로 router.push 하기
  };

  return (
    <div className="space-y-4 text-sm">
      <Link href="/onboarding" className="mx-auto block text-center underline">
        시작하기에 앞서
      </Link>
      <Button
        onClick={onGoogleLogin}
        className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 text-black"
      >
        <GoogleIcon />
        <span>Google 계정으로 로그인</span>
      </Button>
      <Button onClick={() => router.push("/home")} className="rounded-xl py-4">
        로그인 없이 둘러보기
      </Button>
    </div>
  );
}
