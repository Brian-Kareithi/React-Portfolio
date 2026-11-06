import Link from "next/link";
import { siteConfig } from "@/lib/site";

/** Green-dot pill saying Brian is open to work. Links to the contact page unless `asLink` is false. */
export function AvailabilityBadge({ asLink = true }: { asLink?: boolean }) {
  const { open, label } = siteConfig.availability;
  if (!open) return null;

  const body = (
    <>
      <span className="live-dot" aria-hidden="true" />
      {label}
    </>
  );

  return asLink ? (
    <Link href="/contact" className="q-avail">
      {body}
    </Link>
  ) : (
    <p className="q-avail">{body}</p>
  );
}
