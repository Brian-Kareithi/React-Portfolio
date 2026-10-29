import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodSteps } from "@/data/troubleshooting";

export function MethodSteps() {
  return (
    <section aria-labelledby="process-title" className="d-process">
      <SectionHeading index="01" label="The process" title={<>Five steps to <em>a root cause</em></>} titleId="process-title" />
      <ol className="d-steps">
        {methodSteps.map((step, i) => (
          <li key={step.title}>
            <span className="d-step-dot" aria-hidden="true" />
            <span className="d-step-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="q-h3">{step.title}</h3>
            <p className="q-small">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
