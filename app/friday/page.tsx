import type { Metadata } from "next";
import FridayClient from "./Client";
import { pageMeta } from "@/app/lib/site";

const description =
  "Meet FRIDAY, an Iron Man–inspired AI assistant that answers questions about Brian Kareithi's skills, projects and experience.";

export const metadata: Metadata = pageMeta({
  title: "Friday",
  description,
  path: "/friday",
});

export default function FridayPage() {
  return <FridayClient />;
}
