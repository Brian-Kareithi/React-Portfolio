import { Eyebrow } from "@/components/ui/Eyebrow";
import { currentRole } from "@/data/about";

export function CurrentRole() {
  return (
    <section aria-labelledby="now-title" className="a-now">
      <Eyebrow index="●">Now · {currentRole.period}</Eyebrow>
      <div className="a-now-body">
        <div>
          <h2 id="now-title" data-split className="q-h2">
            {currentRole.role}
          </h2>
          <p className="a-now-company">{currentRole.company}</p>
          <p className="q-body" style={{ maxWidth: "30rem", marginTop: "1.25rem" }}>
            {currentRole.summary}
          </p>
        </div>
        <ul className="a-duties">
          {currentRole.duties.map((duty) => (
            <li key={duty}>{duty}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
