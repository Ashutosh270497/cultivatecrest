"use client";

import Link from "next/link";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="not-found-page">
          <div className="not-found-card">
            <p className="eyebrow">Storefront unavailable</p>
            <h1>We hit an unexpected problem.</h1>
            <p>Try loading the storefront again. No purchase or payment information is handled on this website.</p>
            <div className="error-actions">
              <button className="button button-primary" type="button" onClick={retry}>Try again</button>
              <Link className="button button-secondary" href="/">Return home</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
