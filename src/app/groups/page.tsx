import type { Metadata } from "next";

import { GroupsContent } from "@/components/groups/groups-content";

export const metadata: Metadata = {
  title: "My Groups",
  description: "Create and manage groups of related API endpoints.",
};

export default function GroupsPage() {
  return <GroupsContent />;
}
