import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col relative w-auto h-auto">
        <h1>Welcome to Coomer Mobile Site</h1>
      </div>
      <div className="flex items-center justify-center min-h-[941px] bg-black">
        <main className="flex flex-col items-start justify-between w-full max-w-3xl min-h-[941px] bg-black py-32 px-16 dark:bg-black" style={{ marginLeft: "-5px" }}>
        </main>
      </div>
    </div>
  );
}
