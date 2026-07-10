import type { Metadata } from "next";

import { GroupsContent } from "@/components/groups/groups-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.groups);

export default function GroupsPage() {
  return <GroupsContent />;
}
