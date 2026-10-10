import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer";
import type { CaseStudy } from "@/app/lib/projects-data";
import type { ProjectDoc } from "@/app/lib/project-docs";
import { siteConfig } from "@/app/lib/site";

// Palette mirrors the site (cobalt, shadow grey, lavender), as fixed hex so the PDF never depends on theme.
const COBALT = "#14248a";
const INK = "#28262c";
const MUTED = "#6b667a";
const RULE = "#d6cfe6";
const TINT = "#f1eef9";
const PERI = "#c5cbff";

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 8.8, color: INK, lineHeight: 1.42, backgroundColor: "#ffffff", paddingBottom: 34 },
  banner: { backgroundColor: COBALT, paddingHorizontal: 32, paddingTop: 22, paddingBottom: 16 },
  kicker: { fontSize: 7, letterSpacing: 1.6, color: PERI, textTransform: "uppercase", marginBottom: 8 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 26, color: "#ffffff", letterSpacing: -0.4 },
  tagline: { fontFamily: "Times-Italic", fontSize: 13, color: PERI, marginTop: 3 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  metaItem: { fontSize: 8, color: "#ffffff", marginRight: 14 },
  body: { paddingHorizontal: 32, paddingTop: 16 },
  block: { marginBottom: 12 },
  h: { fontFamily: "Helvetica-Bold", fontSize: 8, letterSpacing: 1.6, textTransform: "uppercase", color: COBALT, marginBottom: 6, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: RULE },
  p: { fontSize: 9, lineHeight: 1.45 },
  twoCol: { flexDirection: "row", gap: 20 },
  col: { flex: 1 },
  li: { flexDirection: "row", marginBottom: 3 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COBALT, marginTop: 4.4, marginRight: 7 },
  mark: { width: 6, fontSize: 9, color: COBALT, fontFamily: "Helvetica-Bold" },
  liText: { flex: 1 },
  flow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginTop: 2 },
  stage: { fontSize: 8, backgroundColor: TINT, color: COBALT, borderRadius: 3, paddingHorizontal: 6, paddingVertical: 3, marginRight: 4, marginBottom: 4, fontFamily: "Helvetica-Bold" },
  arrow: { fontSize: 9, color: MUTED, marginRight: 4, marginBottom: 4 },
  entity: { marginBottom: 7, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: COBALT },
  entityName: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  entityNote: { fontSize: 7.5, color: MUTED, marginTop: 1 },
  field: { flexDirection: "row", marginTop: 1.5 },
  fieldName: { fontSize: 8, fontFamily: "Helvetica-Bold", color: INK },
  fieldType: { fontSize: 8, color: MUTED },
  relation: { fontSize: 8, color: MUTED, marginBottom: 1.5 },
  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: { fontSize: 7.5, backgroundColor: TINT, color: COBALT, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, marginRight: 3, marginBottom: 3 },
  contribution: { marginTop: 2, padding: 10, backgroundColor: TINT, borderLeftWidth: 3, borderLeftColor: COBALT },
  footnote: { fontSize: 8.5, color: INK },
  footer: { position: "absolute", left: 32, right: 32, bottom: 16, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: RULE, paddingTop: 6 },
  footerText: { fontSize: 7, color: MUTED },
});

export function CaseStudyPdf({ study, doc }: { study: CaseStudy; doc?: ProjectDoc }) {
  const site = siteConfig.url.replace("https://", "");
  const access = study.access.demo ? "Live demo" : study.access.repo ? "Public source" : study.access.note;

  return (
    <Document
      title={`${study.title} — Case study`}
      author={siteConfig.fullName}
      subject={study.tagline}
    >
      <Page size="A4" style={s.page}>
        <View style={s.banner}>
          <Text style={s.kicker}>Case study {study.index} · {study.status}</Text>
          <Text style={s.title}>{study.title}</Text>
          <Text style={s.tagline}>{study.tagline}</Text>
          <View style={s.metaRow}>
            <Text style={s.metaItem}>{access}</Text>
            {study.access.demo && <Link src={study.access.demo} style={s.metaItem}>Live demo</Link>}
            {study.access.repo && <Link src={study.access.repo} style={s.metaItem}>Source</Link>}
            <Link src={`${siteConfig.url}/projects#${study.id}`} style={s.metaItem}>{site}/projects#{study.id}</Link>
          </View>
        </View>

        <View style={s.body}>
          <View style={s.block}>
            <Text style={s.h}>Purpose</Text>
            <Text style={s.p}>{doc?.purpose ?? study.problem}</Text>
          </View>

          <View style={s.block}>
            <Text style={s.h}>The problem</Text>
            <Text style={s.p}>{study.problem}</Text>
          </View>

          {study.outcome && (
            <View style={s.block}>
              <Text style={s.h}>Outcome</Text>
              <Text style={s.p}>{study.outcome}</Text>
            </View>
          )}

          <View style={s.twoCol}>
            <View style={s.col}>
              <View style={s.block}>
                <Text style={s.h}>Solution</Text>
                {study.solution.map((line, i) => (
                  <View key={line} style={s.li} wrap={false}>
                    <Text style={s.mark}>{String(i + 1).padStart(2, "0")}</Text>
                    <Text style={s.liText}>{line}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={s.col}>
              {doc && (
                <View style={s.block}>
                  <Text style={s.h}>Target audience</Text>
                  {doc.audience.map((a) => (
                    <View key={a.who} style={s.li} wrap={false}>
                      <View style={s.dot} />
                      <Text style={s.liText}>
                        <Text style={s.fieldName}>{a.who}. </Text>
                        {a.needs}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={s.block} wrap={false}>
            <Text style={s.h}>Architecture</Text>
            <View style={s.flow}>
              {study.architecture.stages.map((stage, i) => (
                <View key={stage} style={s.flow}>
                  <Text style={s.stage}>{stage}</Text>
                  {i < study.architecture.stages.length - 1 && <Text style={s.arrow}>→</Text>}
                </View>
              ))}
            </View>
            {study.architecture.branch && (
              <Text style={s.relation}>
                Branch from {study.architecture.stages[study.architecture.branch.under]}: {study.architecture.branch.label}.
              </Text>
            )}
          </View>

          {doc && (
            <View style={s.block}>
              <Text style={s.h}>Data model</Text>
              {doc.erd ? (
                <View style={s.twoCol}>
                  <View style={s.col}>
                    {doc.erd.entities.map((e) => (
                      <View key={e.name} style={s.entity} wrap={false}>
                        <Text style={s.entityName}>{e.name}</Text>
                        {e.note && <Text style={s.entityNote}>{e.note}</Text>}
                        {e.fields.map((f) => (
                          <View key={f.name} style={s.field}>
                            <Text style={s.fieldName}>{f.name}</Text>
                            <Text style={s.fieldType}>  {f.type}{f.key ? ` · ${f.key.toUpperCase()}` : ""}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                  <View style={s.col}>
                    <Text style={[s.fieldName, { marginBottom: 4 }]}>Relations</Text>
                    {doc.erd.relations.map((r) => (
                      <Text key={`${r.from}-${r.to}`} style={s.relation}>
                        {r.from} {r.cardinality.replace(":", "→")} {r.to} · {r.label}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : (
                <Text style={s.p}>{doc.dataNote}</Text>
              )}
            </View>
          )}

          {doc && (
            <View style={s.twoCol}>
              <View style={s.col}>
                <View style={s.block}>
                  <Text style={s.h}>In scope</Text>
                  {doc.scope.in.map((item) => (
                    <View key={item} style={s.li} wrap={false}>
                      <View style={s.dot} />
                      <Text style={s.liText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={s.col}>
                <View style={s.block}>
                  <Text style={s.h}>Out of scope</Text>
                  {doc.scope.out.map((item) => (
                    <View key={item} style={s.li} wrap={false}>
                      <View style={s.dot} />
                      <Text style={s.liText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {doc && (
            <View style={s.block} wrap={false}>
              <Text style={s.h}>Design priorities</Text>
              <View style={s.chips}>
                {doc.qualities.map((q) => (
                  <Text key={q} style={s.chip}>{q}</Text>
                ))}
              </View>
            </View>
          )}

          <View style={s.block} wrap={false}>
            <Text style={s.h}>Technology</Text>
            <View style={s.chips}>
              {study.stack.map((tech) => (
                <Text key={tech} style={s.chip}>{tech}</Text>
              ))}
            </View>
          </View>

          <View style={s.contribution} wrap={false}>
            <Text style={s.fieldName}>My contribution</Text>
            <Text style={s.footnote}>{study.contribution}</Text>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>{siteConfig.fullName} · Case study: {study.title}</Text>
          <Link src={`${siteConfig.url}/projects`} style={s.footerText}>{site}/projects</Link>
        </View>
      </Page>
    </Document>
  );
}
