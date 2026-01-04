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
        <Link href="/" className="logo-link" />
        <nav className="nav-container">
          <Link
            href="/"
            className={`nav-link ${isHomeActive ? "nav-link-active" : ""}`}
          >
            <p>
              <div style={{ display: "inline", color: "rgb(0, 0, 0)" }}>Home</div>
            </p>
          </Link>
          <Link
            href="/changelog"
            className={`nav-link ${isChangelogActive ? "nav-link-active" : ""}`}
          >
            <p>
              <div style={{ display: "inline", color: "rgb(0, 0, 0)" }}>Changelog</div>
            </p>
          </Link>
        </nav>
      </div>
      <style jsx>{`
        .top-nav-header {
          background-color: #ffffff;
          border-bottom: 2px solid #d0d0d0;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .header-content {
          display: flex;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          letter-spacing: -0.5px;
          cursor: pointer;
        }

        .nav-container {
          display: flex;
          gap: 40px;
          align-items: center;
          flex-shrink: 0;
        }

        .nav-link {
          font-size: 15px;
          font-weight: 600;
          color: #000000;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          padding: 8px 12px;
          cursor: pointer;
          white-space: nowrap;
          display: inline-block;
          border-radius: 4px;
        }

        .nav-link p {
          margin: 0;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
          display: inline;
        }

        .nav-link span {
          color: rgb(0, 0, 0);
          font-weight: 600;
        }

        .nav-link:hover {
          color: #333;
        }

        .nav-link:hover span {
          color: #333;
        }

        .nav-link-active {
          color: #000000;
          font-weight: 700;
        }

        .nav-link-active span {
          color: rgb(0, 0, 0);
          font-weight: 700;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          height: 3px;
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
