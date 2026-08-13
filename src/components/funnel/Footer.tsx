import { Link } from "@tanstack/react-router";

import { brand, links } from "@/content/funnel";

export function Footer() {
  return (
    <footer className="bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-extrabold">{brand.name}</p>
          <p className="text-sm text-muted-foreground">{brand.role}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary">
            Terms &amp; Conditions
          </Link>
          <Link to="/refund" className="hover:text-primary">
            Refund Policy
          </Link>
          <a href={links.contact} className="hover:text-primary">
            Contact
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 w-full max-w-5xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </p>
    </footer>
  );
}
