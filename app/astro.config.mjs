// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkLinkCardPlus from 'remark-link-card-plus';

// https://astro.build/config
export default defineConfig({
    site: 'https://yangniao23.github.io',
    integrations: [tailwind()],
    markdown: {
        remarkPlugins: [
            [remarkLinkCardPlus, { cache: true, shortenUrl: true }],
        ],
    },
});
