import {createMDX} from 'fumadocs-mdx/next';

const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isCI = !!process.env.GITHUB_ACTIONS;
const basePath = isCI && repo ? `/${repo}` : '';

/** @type {import('next').NextConfig} */
const basePathFromEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const effectiveBasePath = basePathFromEnv || basePath;

const config = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
    effectiveBasePath,
    assetPrefix: effectiveBasePath || undefined,
    trailingSlash: true,
    env: {
        NEXT_PUBLIC_BASE_PATH: effectiveBasePath || '',
    },
};

export default withMDX(config);
