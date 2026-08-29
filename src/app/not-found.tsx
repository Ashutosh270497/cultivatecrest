import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This path has not taken root.</h1>
        <p>The page may have moved, or the address may be incomplete. Return to the storefront to continue exploring.</p>
        <Link className="button button-primary" href="/"><ArrowLeft size={18} /> Back to home</Link>
      </div>
    </main>
  );
}
