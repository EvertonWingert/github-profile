module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                gray: {
                    '100': '#f7fafc',
                    '200': '#edf2f7',
                    '300': '#e2e8f0',
                    '400': '#cbd5e0',
                    '500': '#a0aec0',
                    '600': '#718096',
                    '700': '#373e47',
                    '800': '#22272e',
                    '900': '#1c2128',
                },
            }

        },
    },
    plugins: [],
}
