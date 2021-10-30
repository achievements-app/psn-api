import Head from "@docusaurus/Head";
import OriginalLayout from "@theme-original/Layout";
import React from "react";

export default function Layout(props) {
  return (
    <>
      <Head>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wescopeland_" />
        <meta
          name="twitter:image"
          content="https://github.com/achievements-app/psn-api/blob/main/twitter.png?raw=true"
        />

        <meta
          name="og:image"
          content="https://github.com/achievements-app/psn-api/blob/main/twitter.png?raw=true"
        />

        <meta name="apple-mobile-web-app-title" content="psn-api" />
      </Head>

      <OriginalLayout {...props} />
    </>
  );
}
