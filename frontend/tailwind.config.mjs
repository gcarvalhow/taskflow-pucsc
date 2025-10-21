/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // azul principal
          light: '#3b82f6',
          dark: '#1e40af',
        },
        accent: {
          DEFAULT: '#f59e42', // laranja destaque
        },
        background: {
          DEFAULT: '#f4f6fa', // fundo claro
        },
        surface: {
          DEFAULT: '#fff',
        },
        muted: {
          DEFAULT: '#64748b', // cinza
        },
        error: {
          DEFAULT: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
