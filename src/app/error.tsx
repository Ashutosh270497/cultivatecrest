"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">Something went wrong</p>
        <h1>We could not load this page.</h1>
        <p>Please try again. If the problem continues, return to the storefront and choose another path.</p>
        <div className="error-actions">
          <button className="button button-primary" type="button" onClick={retry}>Try again</button>
          <Link className="button button-secondary" href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}
