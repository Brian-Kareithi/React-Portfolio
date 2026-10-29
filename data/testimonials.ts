export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company?: string;
  relation?: string;
  href?: string;
}

export const testimonials: Testimonial[] = [];
