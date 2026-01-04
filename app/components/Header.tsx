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
        <Link href="/" className={`nav-link ${isHomeActive ? "nav-link-active" : ""}`}>
          Home
        </Link>
        <div className="tab-separator" />
        <Link href="/changelog" className={`nav-link ${isChangelogActive ? "nav-link-active" : ""}`}>
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
          padding: 0 20px;
          gap: 40px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 1);
        }

        .nav-link-active {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(34, 197, 94, 1);
        }

        .tab-separator {
          width: 1px;
          height: 24px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 8px;
        }

        @media (max-width: 768px) {
          .nav-container {
            gap: 20px;
            padding: 0 16px;
          }

          .nav-link {
            padding: 12px 0;
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  );
}
