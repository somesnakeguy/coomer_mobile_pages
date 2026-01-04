"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isChangelogActive = pathname === "/changelog";

  return (
    <header className="top-nav-header">
      <nav className="nav-container">
        <Link
          href="/"
          className="nav-link"
          style={isHomeActive ? {
            backgroundColor: "rgba(65, 117, 5, 1)",
            color: "rgba(255, 255, 255, 1)"
          } : {}}
        >
          Home
        </Link>
        <div className="tab-separator" />
        <Link
          href="/changelog"
          className="nav-link"
          style={isChangelogActive ? {
            backgroundColor: "rgba(65, 117, 5, 1)",
            color: "rgba(255, 255, 255, 1)"
          } : {}}
        >
          Changelog
        </Link>
      </nav>
      <style jsx>{`
        .top-nav-header {
          background-color: rgba(0, 0, 0, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(8px);
        }

        .nav-container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 20px;
          gap: 8px;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 0;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 1);
        }

        .nav-link-active {
          color: rgba(255, 255, 255, 1);
          background-color: #22c55e;
        }

        .tab-separator {
          width: 1px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.3);
          margin: 0;
        }

        @media (max-width: 768px) {
          .nav-container {
            gap: 6px;
            padding: 6px 16px;
          }

          .nav-link {
            padding: 12px 16px;
            font-size: 14px;
          }

          .tab-separator {
            height: 24px;
            margin: 0;
          }
        }
      `}</style>
    </header>
  );
}
