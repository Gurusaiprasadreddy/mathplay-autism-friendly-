/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-blue': '#AEC6CF',
                'pastel-green': '#77DD77',
                'pastel-yellow': '#FDFD96',
                'pastel-pink': '#FFB7B2',
                'pastel-purple': '#C3B1E1',
                'pastel-orange': '#FFDAC1',
            },
            fontFamily: {
                'comic': ['Comic Neue', 'cursive'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                }
            }
        },
    },
    plugins: [],
}
