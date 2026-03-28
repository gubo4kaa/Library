import type { Metadata } from "next";

import NotFound from "@/components/NotFound/NotFound";

export const metadata: Metadata = {
  title: "Nothing Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppNotFound() {
  return (
    <div style={{ padding: "16px 24px" }}>
      <NotFound />
    </div>
  );
}
