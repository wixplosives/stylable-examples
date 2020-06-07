module.exports = {
    printWidth: 120,
    singleQuote: true,
    tabWidth: 4,
    overrides: [
        {
            files: ['*.json', '*.yml', '*.md'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
