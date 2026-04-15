import Head from "next/head";

import NotFoundPage from "@/components/NotFoundPage/NotFoundPage";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Library</title>
        <meta
          name="description"
          content="The requested page could not be found."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NotFoundPage />
    </>
  );
}
