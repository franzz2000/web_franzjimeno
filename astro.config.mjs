import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from "@tailwindcss/vite";

import {SITE_METADATA} from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
    site: SITE_METADATA.siteUrl,
    integrations: [mdx(), sitemap()],
    vite: {
        plugins:[tailwindcss()],
    }
});
