"use client";

import { useState, useEffect } from "react";

interface ReleaseEntry {
  version: string;
  date: string;
  summary: string;
  notes: string[];
}

interface ReleaseData {
  current: {
    version: string;
    releaseSummary: string;
    releaseNotes: string[];
    apkUrl: string;
    releaseDate: string;
  };
  changelog: ReleaseEntry[];
}

export default function ChangelogPage() {
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

  if (isLoading) {
    return (
      <div className="changelog-loading">
        <p>Loading changelog...</p>
      </div>
    );
  }

  if (!releaseData) {
    return (
      <div className="changelog-error">
        <p>Failed to load changelog data.</p>
      </div>
    );
  }

  return (
    <div className="changelog-container">
      <div className="changelog-content">
        <h1 className="changelog-title">Release Changelog</h1>

        {releaseData.changelog.map((release, index) => (
          <div key={index} className="release-entry">
            <div className="release-header">
              <h2 className="release-version">{release.version}</h2>
              <span className="release-date">
                {new Date(release.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="release-summary">{release.summary}</p>
            {release.notes.length > 0 && (
              <ul className="release-notes">
                {release.notes.map((note, noteIndex) => (
                  <li key={noteIndex}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .changelog-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 40px 20px;
          font-family: Arial, Helvetica, sans-serif;
          color: #ededed;
        }

        .changelog-loading,
        .changelog-error {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ededed;
          font-size: 18px;
        }

        .changelog-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .changelog-title {
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 40px;
          line-height: 1.2;
        }

        .release-entry {
          background-color: rgba(30, 30, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }

        .release-entry:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background-color: rgba(30, 30, 30, 0.8);
        }

        .release-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .release-version {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          color: rgba(65, 117, 5, 1);
        }

        .release-date {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .release-summary {
          font-size: 16px;
          margin: 0 0 12px 0;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
        }

        .release-notes {
          margin: 12px 0 0 0;
          padding-left: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .release-notes li {
          margin-bottom: 6px;
        }

        @media (max-width: 768px) {
          .changelog-container {
            padding: 20px 16px;
          }

          .changelog-title {
            font-size: 28px;
            margin-bottom: 24px;
          }

          .release-entry {
            padding: 16px;
            margin-bottom: 16px;
          }

          .release-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .release-version {
            font-size: 18px;
          }

          .release-summary {
            font-size: 15px;
          }

          .release-notes {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
