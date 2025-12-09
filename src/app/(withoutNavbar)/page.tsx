import StartButtons from "@/components/onboarding/start-buttons";

export default function Onboarding() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-6">
      <div className="font-pretendard flex flex-1 flex-col justify-center space-y-7 text-center font-semibold">
        <h1 className="font-pretendard text-4xl font-semibold">re:cord</h1>
        <h2 className="text-primary-100">당신의 이야기를 기록해요</h2>
      </div>
      <StartButtons />
    </main>
  );
}
