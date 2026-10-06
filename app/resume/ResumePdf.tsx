import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer";
import type { ResumeRole } from "@/app/lib/resume-data";
import { resumeCertifications, resumeEducation, resumeHistory } from "@/app/lib/resume-data";
import { siteConfig } from "@/app/lib/site";

// Palette mirrors the site (cobalt, shadow grey, lavender), as fixed hex so the PDF never depends on theme.
const COBALT = "#14248a";
const INK = "#28262c";
const MUTED = "#6b667a";
const RULE = "#d6cfe6";
const TINT = "#f1eef9";
const PERI = "#c5cbff";

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 8.6, color: INK, lineHeight: 1.4, backgroundColor: "#ffffff" },
  banner: { backgroundColor: COBALT, paddingHorizontal: 32, paddingTop: 22, paddingBottom: 16 },
  kicker: { fontSize: 7, letterSpacing: 1.6, color: PERI, textTransform: "uppercase", marginBottom: 8 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 28, color: "#ffffff", letterSpacing: -0.5 },
  headline: { fontFamily: "Times-Italic", fontSize: 14, color: PERI, marginTop: 3 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  contactItem: { fontSize: 8, color: "#ffffff", marginRight: 14 },
  stats: { flexDirection: "row", backgroundColor: TINT, borderBottomWidth: 1, borderBottomColor: RULE, paddingHorizontal: 32, paddingVertical: 10 },
  stat: { flex: 1, flexDirection: "row", alignItems: "baseline" },
  statValue: { fontFamily: "Helvetica-Bold", fontSize: 15, color: COBALT, marginRight: 6 },
  statLabel: { fontSize: 7.5, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8 },
  body: { flexDirection: "row", paddingHorizontal: 32, paddingTop: 14 },
  main: { flex: 1.9, paddingRight: 22 },
  side: { flex: 1 },
  h: { fontFamily: "Helvetica-Bold", fontSize: 8, letterSpacing: 1.6, textTransform: "uppercase", color: COBALT, marginBottom: 6, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: RULE },
  block: { marginBottom: 11 },
  summary: { fontSize: 9, lineHeight: 1.45 },
  jobHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 },
  jobTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  jobPeriod: { fontSize: 8, color: MUTED },
  li: { flexDirection: "row", marginBottom: 2.5 },
  bullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: COBALT, marginTop: 4.2, marginRight: 7 },
  liText: { flex: 1 },
  past: { marginTop: 6 },
  pastHead: { flexDirection: "row", justifyContent: "space-between" },
  pastRole: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  pastPeriod: { fontSize: 7.5, color: MUTED },
  pastOrg: { fontSize: 8, color: COBALT },
  pastLine: { fontSize: 8.2, marginTop: 1 },
  project: { marginBottom: 6, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: COBALT },
  projectTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  projectNote: { fontSize: 8.5, color: INK, marginTop: 1 },
  projectStack: { fontSize: 7.5, color: COBALT, marginTop: 2 },
  group: { marginBottom: 8 },
  groupName: { fontSize: 7.5, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 },
  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: { fontSize: 7.5, backgroundColor: TINT, color: COBALT, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, marginRight: 3, marginBottom: 3 },
  eduDegree: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  eduMeta: { fontSize: 8, color: MUTED, marginTop: 1 },
  cert: { flexDirection: "row", marginBottom: 4 },
  certMark: { width: 5, height: 5, backgroundColor: COBALT, marginTop: 3, marginRight: 6 },
  certText: { flex: 1, fontSize: 8.2 },
  footer: { position: "absolute", left: 32, right: 32, bottom: 16, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: RULE, paddingTop: 6 },
  footerText: { fontSize: 7, color: MUTED },
});

export function ResumePdf({ role, date }: { role: ResumeRole; date: string }) {
  const site = siteConfig.url.replace("https://", "");
  return (
    <Document title={`${siteConfig.fullName} Resume, ${role.label}`} author={siteConfig.fullName} subject={role.headline}>
      <Page size="A4" style={s.page}>
        <View style={s.banner}>
          <Text style={s.kicker}>Resume · {role.label}</Text>
          <Text style={s.name}>{siteConfig.fullName}</Text>
          <Text style={s.headline}>{role.headline}</Text>
          <View style={s.contactRow}>
            <Link src={`mailto:${siteConfig.email}`} style={s.contactItem}>{siteConfig.email}</Link>
            <Text style={s.contactItem}>{siteConfig.phoneDisplay}</Text>
            <Text style={s.contactItem}>{siteConfig.location}</Text>
          </View>
          <View style={[s.contactRow, { marginTop: 3 }]}>
            <Link src={siteConfig.github} style={s.contactItem}>github.com/Brian-Kareithi</Link>
            <Link src={siteConfig.linkedin} style={s.contactItem}>linkedin.com/in/brian-kareithi-04007637b</Link>
            <Link src={siteConfig.url} style={s.contactItem}>{site}</Link>
          </View>
        </View>

        <View style={s.stats}>
          {role.highlights.map((h) => (
            <View key={h.label} style={s.stat}>
              <Text style={s.statValue}>{h.value}</Text>
              <Text style={s.statLabel}>{h.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.body}>
          <View style={s.main}>
            <View style={s.block}>
              <Text style={s.h}>Profile</Text>
              <Text style={s.summary}>{role.summary}</Text>
            </View>

            <View style={s.block}>
              <Text style={s.h}>Experience</Text>
              <View style={s.jobHead}>
                <Text style={s.jobTitle}>IT Support / Frontend Development, Steadfast Academy</Text>
                <Text style={s.jobPeriod}>2025 – Present</Text>
              </View>
              {role.experience.map((line) => (
                <View key={line} style={s.li} wrap={false}>
                  <View style={s.bullet} />
                  <Text style={s.liText}>{line}</Text>
                </View>
              ))}
            </View>

            <View style={s.block}>
              <Text style={s.h}>Earlier Experience</Text>
              {resumeHistory.map((j) => (
                <View key={j.role} style={s.past} wrap={false}>
                  <View style={s.pastHead}>
                    <Text style={s.pastRole}>{j.role}</Text>
                    <Text style={s.pastPeriod}>{j.period}</Text>
                  </View>
                  <Text style={s.pastOrg}>{j.org}</Text>
                  <Text style={s.pastLine}>{j.line}</Text>
                </View>
              ))}
            </View>

            <View style={s.block}>
              <Text style={s.h}>Selected Projects</Text>
              {role.projects.map((p) => (
                <View key={p.title} style={s.project} wrap={false}>
                  <Text style={s.projectTitle}>{p.title}</Text>
                  <Text style={s.projectNote}>{p.note}</Text>
                  <Text style={s.projectStack}>{p.stack}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={s.side}>
            <View style={s.block}>
              <Text style={s.h}>Skills</Text>
              {role.skillGroups.map((g) => (
                <View key={g.group} style={s.group}>
                  <Text style={s.groupName}>{g.group}</Text>
                  <View style={s.chips}>
                    {g.items.map((item) => (
                      <Text key={item} style={s.chip}>{item}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View style={s.block}>
              <Text style={s.h}>Education</Text>
              <Text style={s.eduDegree}>{resumeEducation.degree}</Text>
              <Text style={s.eduMeta}>{resumeEducation.institution} · {resumeEducation.period}</Text>
              <Text style={[s.eduMeta, { color: INK }]}>{resumeEducation.note}</Text>
            </View>

            <View style={s.block}>
              <Text style={s.h}>Certifications</Text>
              {resumeCertifications.map((c) => (
                <View key={c} style={s.cert}>
                  <View style={s.certMark} />
                  <Text style={s.certText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Tailored for {role.label} · {date}</Text>
          <Link src={`${siteConfig.url}/resume`} style={s.footerText}>{site}/resume</Link>
        </View>
      </Page>
    </Document>
  );
}
