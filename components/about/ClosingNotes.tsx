import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { closingNotes } from "@/data/about";

export function ClosingNotes() {
  return (
    <section className="q-section">
      <div className="a-closing">
        {closingNotes.map((note, i) => (
          <Reveal key={note.title} index={i}>
            <div className="a-closing-item">
              <Eyebrow index={`0${i + 1}`} />
              <h3 className="q-h3">{note.title}</h3>
              <p className="q-body">{note.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
