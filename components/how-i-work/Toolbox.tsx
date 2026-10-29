import { Section } from "@/components/ui/Section";
import { techs } from "@/data/skills";

export function Toolbox() {
  return (
    <Section id="toolbox" index="06" label="Toolbox" title={<>Languages, platforms <em>and tools</em></>}>
      <div className="w-tools">
        {techs.map((category) => (
          <div key={category.heading}>
            <h3 className="q-eyebrow" style={{ marginBottom: "1rem" }}>
              {category.heading}
            </h3>
            <ul>
              {category.items.map(({ title, icon: Icon }) => (
                <li key={title}>
                  <span aria-hidden="true">
                    <Icon />
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
