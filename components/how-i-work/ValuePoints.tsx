import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { valuePoints } from "@/data/value-points";

export function ValuePoints() {
  return (
    <Section id="reasons" index="01" label="Why it holds up" title={<>Five things I <em>bring</em></>}>
      <ol className="w-reasons">
        {valuePoints.map((point, i) => (
          <li key={point.id}>
            <Reveal index={i}>
              <Link href={point.href} className="w-reason">
                <span className="w-reason-num">0{i + 1}</span>
                <h3 className="q-h3 w-reason-edge">{point.edge}</h3>
                <div className="w-reason-copy">
                  <p className="q-body">{point.benefit}</p>
                  <p className="q-small">
                    <ArrowUpRight aria-hidden="true" />
                    {point.proof}
                  </p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
