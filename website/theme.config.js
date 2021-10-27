export default {
  github: "https://github.com/achievements-app/psn-api",
  docsRepositoryBase:
    "https://github.com/achievements-app/psn-api/blob/main/website/pages",
  titleSuffix: " | psn-api",
  logo: <span className="font-extrabold hidden md:inline">psn-api</span>,

  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      <meta
        name="description"
        content="psn-api is a JavaScript library for fetching trophy, user, and game data from the PlayStation Network."
      />

      <meta
        name="og:description"
        content="psn-api is a JavaScript library for fetching trophy, user, and game data from the PlayStation Network."
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wescopeland_" />
      <meta
        name="twitter:image"
        content="https://github.com/achievements-app/psn-api/blob/main/twitter.png"
      />

      <meta
        name="og:title"
        content="psn-api: Fetch Data from the PlayStation Network"
      />
      <meta name="og:url" content="https://psn-api.achievements.app" />
      <meta
        name="og:image"
        content="https://github.com/achievements-app/psn-api/blob/main/twitter.png"
      />

      <meta name="apple-mobile-web-app-title" content="psn-api" />

      <script
        defer
        data-domain="psn-api.achievements.app"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </>
  ),

  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: "Edit this page on GitHub",
  footerText: (
    <span className="mr-2">
      MIT {new Date().getFullYear()} © achievements.app.
    </span>
  ),
  unstable_faviconGlyph: "⭕️"
};
