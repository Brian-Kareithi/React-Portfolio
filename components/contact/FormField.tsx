import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

export const fieldId = (name: string) => `contact-${name}`;
export const fieldErrorId = (name: string) => `${fieldId(name)}-error`;

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  /** Lets the field stretch to fill the remaining height, for the message box. */
  grow?: boolean;
  children: ReactNode;
}

/** Label, control and inline error for one contact form field. */
export function FormField({ label, name, error, grow, children }: FormFieldProps) {
  return (
    <div className="c-field" data-grow={grow || undefined} data-invalid={error ? "" : undefined}>
      <label htmlFor={fieldId(name)}>{label}</label>
      {children}
      {error && (
        <p id={fieldErrorId(name)} className="c-error">
          <TriangleAlert aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
