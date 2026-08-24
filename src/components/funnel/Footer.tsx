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
          <a href={links.contact} className="hover:text-primary">
            Contact
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 w-full max-w-5xl whitespace-pre-line text-xs text-muted-foreground">
        {`INTELLECTUAL PROPERTY RIGHTS AND OWNERSHIP : The company owns the intellectual property rights in all training materials provided, including the design, graphics, and content of all printed materials, as well as the audio and video of all webinars and podcasts. All materials provided to you prior to or during the programme are the intellectual property of the company, and you must not copy or use them except for the intended purpose. All materials must be kept confidential and not disclosed to third parties unless a specific written permission is obtained from the company in advance.\n\n\nPlease note: This is a non-refundable program, so we encourage you to join only if you're truly ready to commit and grow — we’re here to support you every step of the way!\n\n\nThis Site Is NOT A Part Of The Google Website Or Google Inc Or Facebook Website Or Facebook Inc. Additionally, This Site Is NOT Endorsed By Google Or Facebook In Any Way. Google Is A Trademark Of Google, Inc. Facebook Is A Trademark Of Facebook, Inc. Please Be Advised That Revenues And Results Shown Are EXTRAORDINARY And Are Not Intended To Serve As Guarantees.\n\n\n`}
      </p>
    </footer>
  );
}
