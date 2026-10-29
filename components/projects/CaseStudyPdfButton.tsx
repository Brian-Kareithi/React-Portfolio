"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import { projectDocs } from "@/data/project-docs";
import { downloadBlob, toFileName } from "@/lib/download";

/** Builds the case study PDF in the browser. The PDF engine is only loaded on click. */
export function CaseStudyPdfButton({ study }: { study: CaseStudy }) {
  const [building, setBuilding] = useState(false);

  const download = async () => {
    if (building) return;
    setBuilding(true);
    try {
      const [{ pdf }, { CaseStudyPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/projects/CaseStudyPdf"),
      ]);
      const blob = await pdf(<CaseStudyPdf study={study} doc={projectDocs[study.id]} />).toBlob();
      downloadBlob(blob, `${toFileName(study.title)}-case-study.pdf`);
    } catch {
      // A failed build leaves the button ready to retry.
    } finally {
      setBuilding(false);
    }
  };

  return (
    <button type="button" onClick={download} disabled={building} aria-busy={building} className="q-btn">
      {building ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <FileDown className="h-4 w-4" aria-hidden="true" />}
      {building ? "Building PDF…" : "Case study PDF"}
    </button>
  );
}
