import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {},
    plugins: [nextui()],
};
export default config;