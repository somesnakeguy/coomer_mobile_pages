"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isChangelogActive = pathname === "/changelog";

  return (
    <header className="top-nav-header">
      <div className="header-content">
        <div className="logo">Coomer</div>
        <nav className="nav-container">
          <Link
            href="/"
            className={`nav-link ${isHomeActive ? "nav-link-active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className={`nav-link ${isChangelogActive ? "nav-link-active" : ""}`}
          >
            Changelog
          </Link>
        </nav>
      </div>
      <style jsx>{`
        .top-nav-header {
          background-color: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .header-content {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }

        .nav-container {
          display: flex;
          gap: 40px;
          align-items: center;
          margin-left: auto;
        }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #666;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 0;
        }

        .nav-link:hover {
          color: #000;
        }

        .nav-link-active {
          color: #000;
          font-weight: 600;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: rgba(65, 117, 5, 1);
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 20px;
            height: 60px;
          }

          .logo {
            font-size: 16px;
          }

          .nav-container {
            gap: 24px;
          }

          .nav-link {
            font-size: 13px;
          }
        }
      `}</style>
    </header>
  );
}
