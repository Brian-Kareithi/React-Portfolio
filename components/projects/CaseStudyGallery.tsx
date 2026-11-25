import Image from "next/image";
import type { CaseStudy } from "@/data/projects";

type Shot = NonNullable<CaseStudy["gallery"]>[number];

function Group({ label, shots, form }: { label: string; shots: Shot[]; form: Shot["form"] }) {
  if (shots.length === 0) return null;
  const phone = form === "phone";
  return (
    <div>
      <p className="field-label mb-3">{label}</p>
      <ul className={phone ? "q-gallery q-gallery-phone" : "q-gallery q-gallery-web"}>
        {shots.map((shot) => (
          <li key={shot.src}>
            <a href={shot.src} target="_blank" rel="noopener noreferrer" className="q-gallery-frame" aria-label={`Open full size: ${shot.title}`}>
              <Image
                src={shot.src}
                alt={`${shot.title}: ${shot.caption}`}
                width={phone ? 432 : 1280}
                height={phone ? 960 : 800}
                sizes={phone ? "(max-width: 640px) 42vw, 160px" : "(max-width: 640px) 88vw, (max-width: 1100px) 46vw, 360px"}
                className="h-auto w-full"
              />
            </a>
            <p className="mt-2 text-xs leading-snug" style={{ color: "var(--color-text-secondary)" }}>
              <strong className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{shot.title}.</strong> {shot.caption}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Desktop screens in a grid and phone screens in a swipeable row. */
export function CaseStudyGallery({ shots }: { shots: Shot[] }) {
  return (
    <section className="q-gallery-wrap" aria-label="Screens">
      <Group label="Web" shots={shots.filter((s) => s.form === "desktop")} form="desktop" />
      <Group label="Android" shots={shots.filter((s) => s.form === "phone")} form="phone" />
    </section>
  );
}
