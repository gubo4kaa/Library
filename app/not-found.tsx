import type { Metadata } from "next";

import NotFoundPage from "@/components/NotFoundPage/NotFoundPage";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppNotFound() {
  return <NotFoundPage />;
}
