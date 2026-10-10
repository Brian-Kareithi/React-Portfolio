export interface Testimonial {
  quote: string;
  name: string;
  /** Role, e.g. "Head of ICT". */
  title: string;
  /** Organisation, e.g. "Steadfast Academy". */
  company?: string;
  /** "Client", "Manager", "Colleague" — how this person knows your work. */
  relation?: string;
  /** Optional link to the project the quote refers to. */
  href?: string;
}

/**
 * Real quotes only, with the person's permission. The section stays hidden
 * while this list is empty. Two strong sources on file:
 *   - a Steadfast Academy lead (the portals and parent app are in daily use)
 *   - the Sapio Homes client (the shipped property site)
 * Ask each for one or two sentences and paste them here.
 */
export const testimonials: Testimonial[] = [];
