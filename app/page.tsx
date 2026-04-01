"use client";

import { useState, useEffect } from "react";
import { fetchReleaseData } from "@/utils/fetchReleaseData";
import { ReleaseData } from '@/types/release';


export default function Home() {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {
      try {
        const data = await fetchReleaseData();
        setReleaseData(data);
      } catch (error) {
        console.error("Failed to load release data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
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
          margin: "30px auto 0 auto",
        }}
      >
        <p>
          This website is intended to document and explain the android
          application for <code>coomer.st</code>.
        </p>
        <p>
          This mobile application is "fan made" and not in any way
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
            margin: "40px auto 0 auto",
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
              backgroundColor: "rgba(0, 0, 0, 1)",
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
            <div
              style={{
                fontWeight: "400",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                {releaseData.current.releaseSummary}
              </p>
              {releaseData.current.releaseNotes.length > 0 && (
                <ul
                  style={{
                    margin: "0",
                    paddingLeft: "20px",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                  }}
                >
                  {releaseData.current.releaseNotes.map((note, index) => (
                    <li key={index} style={{ textIndent: "1em" }}>
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
              backgroundColor: "rgba(65, 117, 5, 1)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "rgba(85, 137, 5, 1)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "rgba(65, 117, 5, 1)";
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
