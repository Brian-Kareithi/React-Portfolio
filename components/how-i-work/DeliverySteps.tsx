import { SectionHeading } from "@/components/ui/SectionHeading";
import { workflow } from "@/data/skills";

/** Full-bleed dark band with the six delivery steps on a timeline. */
export function DeliverySteps() {
  return (
    <section aria-labelledby="delivery-title" className="w-delivery q-dark">
      <div className="q-wrap">
        <SectionHeading index="●" label="Delivery" title={<>From idea <em>to production</em></>} titleId="delivery-title" style={{ marginBottom: "3.5rem" }} />
        <ol className="w-steps">
          {workflow.map((step) => (
            <li key={step.step}>
              <span className="w-step-dot" aria-hidden="true" />
              <span className="w-step-num">{step.step}</span>
              <h3 className="q-h3">{step.title}</h3>
              <p className="q-small">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
