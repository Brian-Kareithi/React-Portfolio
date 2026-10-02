export interface Testimonial {
  quote: string;
  name: string;
  /** Role and organisation, e.g. "Head of ICT, Steadfast Academy". */
  title: string;
}

/**
 * Real quotes only, with the person's permission. The homepage section
 * stays hidden while this list is empty. Ask a Steadfast Academy lead and
 * the Sapio Homes client for one or two sentences each.
 */
export const testimonials: Testimonial[] = [];
