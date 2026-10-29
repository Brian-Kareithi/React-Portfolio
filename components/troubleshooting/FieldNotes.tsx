"use client";

import { useState } from "react";
import { CircleAlert, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { fieldNotes, type FieldNote } from "@/data/troubleshooting";

const incidentId = (i: number) => `INC-${String(i + 1).padStart(3, "0")}`;

function FieldNoteDetail({ note, id }: { note: FieldNote; id: string }) {
  return (
    <dl id={id} className="d-detail animate-fade-in-up">
      <div>
        <dt>Problem</dt>
        <dd>{note.summary}</dd>
      </div>
      <div>
        <dt>Approach</dt>
        <dd>{note.approach}</dd>
      </div>
      <div data-key>
        <dt>
          <CircleAlert aria-hidden="true" /> Root cause
        </dt>
        <dd>{note.rootCause}</dd>
      </div>
      <div>
        <dt>Resolution</dt>
        <dd>{note.resolution}</dd>
      </div>
    </dl>
  );
}

/** Real incidents as an expandable log. The first one starts open. */
export function FieldNotes() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="cases" index="02" label="Field notes" title={<>Real problems, <em>real causes</em></>}>
      <ul className="d-log">
        {fieldNotes.map((note, i) => {
          const isOpen = openIndex === i;
          const detailId = `case-${i}`;
          return (
            <li key={note.title}>
              <button onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={detailId} className="d-row">
                <span className="d-row-id">{incidentId(i)}</span>
                <span className="d-row-title">{note.title}</span>
                <span className="d-row-domain">{note.domain}</span>
                <Plus className="d-row-plus" data-open={isOpen || undefined} aria-hidden="true" />
              </button>
              {isOpen && <FieldNoteDetail note={note} id={detailId} />}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
