"use client";

import { useState, useEffect } from "react";

interface ReleaseData {
  current: {
    version: string;
    releaseNotes: string;
    apkUrl: string;
    releaseDate: string;
  };
  changelog: Array<{
    version: string;
    date: string;
    notes: string;
  }>;
}

export default function Home() {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReleaseData = async () => {
      try {
        const response = await fetch("/releases.json");
        const data = await response.json();
        setReleaseData(data);
      } catch (error) {
        console.error("Failed to load release data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleaseData();
  }, []);

  const handleDownloadAPK = () => {
    if (releaseData?.current.apkUrl) {
      window.location.href = releaseData.current.apkUrl;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col relative">
        <div style={{ fontSize: "30px", fontWeight: "400", lineHeight: "45px", marginTop: "10px" }}>
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
          margin: "30px auto 0 30px",
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
          apk source code will remain in a private repo.
        </p>
      </div>

      {!isLoading && releaseData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "40px auto 0 30px",
            maxWidth: "600px",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "36px",
              marginBottom: "16px",
            }}
          >
            Current Release
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "16px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {releaseData.current.version}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              {releaseData.current.releaseNotes}
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                fontWeight: "400",
                color: "#666",
              }}
            >
              Released: {new Date(releaseData.current.releaseDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handleDownloadAPK}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#333";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#000";
            }}
          >
            Download APK
          </button>
        </div>
      )}

      <div className="flex items-center justify-center min-h-[941px] bg-black" />
    </div>
  );
}
