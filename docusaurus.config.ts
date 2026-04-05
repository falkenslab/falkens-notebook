import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Dr. Falken\'s Notebook',
  tagline: 'Experimentos, ejemplos y pinceladas de IA aplicada',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://falkenslab.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/falkens-notebook',  

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'falkenslab', // Usually your GitHub org/user name.
  projectName: 'falkens-notebook', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: './notes',
          routeBasePath: '/notes',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/falkenslab/falkens-notebook/edit/main/',
        },
        blog: {
          path: './experiments',
          routeBasePath: '/experiments',
          showReadingTime: true,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Todos los experimentos',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/falkenslab/falkens-notebook/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        docsDir: 'notes',
        blogDir: 'experiments',
        docsRouteBasePath: '/notes',
        blogRouteBasePath: '/experiments',
        language: ['es'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Dr. Falken\'s Notebook',
      logo: {
        alt: 'Falken\'s Lab Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'html',
          position: 'left',
          value: '<a href="https://github.com/falkenslab/falkens-notebook/issues/new?template=idea.md" target="_blank" rel="noopener noreferrer" class="navbar__idea-btn" title="Proponer una idea">💡</a>',
        },
        {
          href: 'https://github.com/falkenslab/falkens-notebook/issues',
          label: 'Ideas',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Experimentos',
          position: 'left',
          items: [
            {to: '/experiments', label: 'Todos'},
            {to: '/experiments/tags', label: 'Por temática'},
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Notas',
        },
        {type: 'search', position: 'right'},
        {
          href: 'https://github.com/falkenslab/falkens-notebook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Cuaderno',
          items: [
            {
              label: 'Experimentos',
              to: '/experiments',
            },
            {
              label: 'Notas',
              to: '/notes/intro',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'Hugging Face',
              href: 'https://huggingface.co/falkenslab',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/falkenslab',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: '¿Quién es el Dr. Falken?',
              href: 'https://war-games.fandom.com/wiki/Stephen_Falken',
            },
          ],
        },
      ],
      copyright: `Made with 💖 by Falken's Lab team`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
