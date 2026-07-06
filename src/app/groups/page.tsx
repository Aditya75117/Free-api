import type { Metadata } from "next";

import { GroupsContent } from "@/components/groups/groups-content";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "My Groups",
  description: "Create and manage groups of related API endpoints with ApiGenerator.",
  path: "/groups",
});

export default function GroupsPage() {
  return <GroupsContent />;
}
