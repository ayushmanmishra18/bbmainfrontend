import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB', // Blue-600 for main actions
        'success': '#16A34A', // Green-600 for success actions
        'danger': '#DC2626',  // Red-600 for errors
        'content': '#1F2937', // For text
        'background': '#FFFFFF', // Page background
        'subtle': '#F3F4F6', // Lighter backgrounds
      },
    },
  },
  plugins: [],
}
export default config