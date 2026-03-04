import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "psn-api",
  tagline: "Dinosaurs are cool",
  url: "https://psn-api.achievements.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "achievements.app",
  projectName: "psn-api",

  markdown: {
    format: "detect"
  },

  scripts: [
    {
      src: "https://plausible.io/js/plausible.js",
      defer: true,
      "data-domain": "psn-api.achievements.app"
    }
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          editUrl:
            "https://github.com/achievements-app/psn-api/edit/main/website/",

          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }]
          ]
        },
        theme: {
          customCss: "./src/css/custom.css"
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    navbar: {
      title: "psn-api",

      items: [
        {
          type: "doc",
          docId: "get-started",
          position: "left",
          label: "Quick start"
        },
        {
          href: "https://github.com/achievements-app/psn-api",
          label: "GitHub",
          position: "right"
        }
      ]
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/wescopeland_"
            }
          ]
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/achievements-app/psn-api"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} achievements.app.`
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },

    algolia: {
      appId: "BH4D9OD16A",
      apiKey: "2ce8bc4c877d89ada212a38523a0d4d0",
      indexName: "psn-api"
    }
  } satisfies Preset.ThemeConfig
};

export default config;
