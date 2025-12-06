import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col relative">
        <div style={{ fontSize: "30px", marginTop: "10px" }}>
          <h1>Welcome to Coomer Mobile Site</h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "auto",
          fontSize: "20px",
          margin: "30px auto 0 0",
        }}
      >
        <p>
          This website is intended to document and explain the android
          application for <code>coomer.st</code>.
        </p>
        <p>
          This mobile application is a "fan made" copy and not in any way
          officially associated with the website.
        </p>
        <p>
          The website will be used to distribute and document the apk but the
          apk source code will remain in a private repo
        </p>
      </div>
      <div className="flex items-center justify-center min-h-[941px] bg-black" />
    </div>
  );
}
