"use client";

import { useState, useEffect } from "react";
import { fetchKnownIssuesData } from "@/utils/fetchKnownIssuesData";

interface KnownIssue {
  issue: string;
  notes?: string[];
}

interface KnownIssuesData {
  title: string;
  issues: KnownIssue[];
}

export default function KnownIssuesPage() {
  const [issuesData, setIssuesData] = useState<KnownIssuesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchKnownIssuesData();
        setIssuesData(data);
      } catch (error) {
        console.error("Failed to load known issues data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="issues-loading">
        <p>Loading known issues...</p>
      </div>
    );
  }

  if (!issuesData) {
    return (
      <div className="issues-error">
        <p>Failed to load known issues data.</p>
      </div>
    );
  }

  return (
    <div className="issues-container">
      <div className="issues-content">
        <h1 className="issues-title">{issuesData.title}</h1>

        <div className="issues-list">
          {issuesData.issues.map((item, index) => (
            <div key={index} className="issue-card">
              <h2 className="issue-title">{item.issue}</h2>
              {item.notes && item.notes.length > 0 && (
                <ul className="issue-notes">
                  {item.notes.map((note, noteIndex) => (
                    <li key={noteIndex}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .issues-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 40px 20px;
          font-family: Arial, Helvetica, sans-serif;
          color: #ededed;
        }

        .issues-loading,
        .issues-error {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ededed;
          font-size: 18px;
        }

        .issues-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .issues-title {
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 40px;
          line-height: 1.2;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .issue-card {
          background-color: rgba(30, 30, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }

        .issue-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background-color: rgba(30, 30, 30, 0.8);
        }

        .issue-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: rgba(65, 117, 5, 1);
          line-height: 1.4;
        }

        .issue-notes {
          margin: 12px 0 0 0;
          padding-left: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .issue-notes li {
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .issues-container {
            padding: 20px 16px;
          }

          .issues-title {
            font-size: 28px;
            margin-bottom: 24px;
          }

          .issue-card {
            padding: 16px;
          }

          .issue-title {
            font-size: 16px;
          }

          .issue-notes {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
