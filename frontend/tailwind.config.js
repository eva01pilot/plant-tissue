/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      boxShadow: {
        'blackSm': "2px 2px rgba(0, 0, 0, 1)",
        'blackMd': "4px 4px rgba(0, 0, 0, 1)",
        'blackLg': "8px 8px rgba(0, 0, 0, 1)",
      },
      containers: {
        '2xs': '6rem'
      }
    },
    fontFamily: {
      'display':['Inter'],
      'body': ['Rubik']
    },
  },
  plugins: [
      require('@tailwindcss/container-queries'),
  ],
}

