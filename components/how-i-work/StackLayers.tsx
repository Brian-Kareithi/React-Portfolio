import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { architecture } from "@/data/skills";

/** The stack from interface to delivery, each layer shaded a little deeper than the last. */
export function StackLayers() {
  return (
    <Section id="layers" index="03" label="Stack by layer" title={<>From the screen <em>to the server</em></>}>
      <ol className="w-strata">
        {architecture.map(({ title, icon: Icon, stack, desc }, i) => (
          <li key={title} style={{ "--depth": i / (architecture.length - 1) } as CSSProperties}>
            <span className="w-strata-icon" aria-hidden="true">
              <Icon className="h-4 w-4" />
            </span>
            <h3 className="q-h3">{title}</h3>
            <p className="w-strata-stack">{stack}</p>
            <p className="q-body">{desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
