/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-hero',
    'text-big',
    'text-heading',
    'text-special',
    'text-small-heading',
    'text-body',
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 15s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "0% 50%, 0% 50%",
          },
          "100%": {
            backgroundPosition: "200% 50%, 200% 50%",
          },
        },
      },
      fontSize: {
        hero: [
          "clamp(4.5rem, 9vw, 10rem)", // 72px → 160px
          {
            lineHeight: "clamp(4.5rem, 8vw, 8.75rem)", // 72px → 140px
            letterSpacing: "-0.06em",
          },
        ],
        big: [
          "clamp(1.5rem, 2.8vw, 2rem)", // 24px → 32px
          {
            lineHeight: "clamp(2rem, 3.5vw, 2.5rem)", // 32px → 40px
            letterSpacing: "-0.02em",
          },
        ],
        heading: [
          "clamp(3rem, 6vw, 5rem)", // 48px → 80px
          {
            lineHeight: "clamp(3.25rem, 6.8vw, 5.75rem)", // 52px → 92px
            letterSpacing: "-0.06em",
          },
        ],
        special: [
          "clamp(3rem, 6vw, 5rem)", // 48px → 80px
          {
            lineHeight: "clamp(4rem, 7vw, 7rem)", // 64px → 112px
            letterSpacing: "-0.05em",
          },
        ],
        "small-heading": [
          "clamp(2.25rem, 4vw, 4rem)", // 36px → 64px
          {
            lineHeight: "clamp(2.75rem, 4.8vw, 4.7rem)", // 44px → 75px
            letterSpacing: "-0.05em",
          },
        ],
        body: [
          "clamp(1.25rem, 2vw, 1.5rem)", // 20px → 24px
          {
            lineHeight: "clamp(1.75rem, 2.4vw, 2.125rem)", // 28px → 34px
            letterSpacing: "-0.03em",
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          fontFeatureSettings: '"kern"',
          textRendering: 'optimizeLegibility',
          fontSynthesis: 'none',
        },
      });
    }),
  ],
};