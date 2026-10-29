"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { ResumeSheet } from "@/components/resume/ResumeSheet";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { resumeRoles, type ResumeRole } from "@/data/resume";
import { downloadBlob } from "@/lib/download";

type BuildStatus = "idle" | "building" | "error";

async function buildResumePdf(role: ResumeRole) {
  const [{ pdf }, { ResumePdf }] = await Promise.all([import("@react-pdf/renderer"), import("@/components/resume/ResumePdf")]);
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return pdf(<ResumePdf role={role} date={date} />).toBlob();
}

/** Role picker, live preview and PDF download. The PDF engine loads only when a download is requested. */
export function ResumeBuilder() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [status, setStatus] = useState<BuildStatus>("idle");
  const role = resumeRoles[roleIndex];

  const handleDownload = async () => {
    setStatus("building");
    try {
      downloadBlob(await buildResumePdf(role), `Brian-Kareithi-Resume-${role.fileLabel}.pdf`);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="r-layout">
      <aside className="r-controls">
        <Eyebrow style={{ marginBottom: "1rem" }}>Choose an angle</Eyebrow>
        <div role="tablist" aria-label="Resume role" className="r-roles">
          {resumeRoles.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === roleIndex}
              onClick={() => {
                setRoleIndex(i);
                setStatus("idle");
              }}
              className="r-role"
            >
              <span className="r-role-mark" aria-hidden="true" />
              {r.label}
              {r.primary && <span className="q-chip">Primary</span>}
            </button>
          ))}
        </div>
        <button onClick={handleDownload} disabled={status === "building"} className="q-btn" data-solid aria-live="polite">
          {status === "building" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Download aria-hidden="true" />}
          {status === "building" ? "Building PDF…" : "Download PDF"}
        </button>
        {status === "error" && (
          <p role="alert" className="q-small">
            Couldn’t build the PDF. Please try again.
          </p>
        )}
      </aside>

      <ResumeSheet key={role.id} role={role} position={roleIndex + 1} total={resumeRoles.length} />
    </div>
  );
}
