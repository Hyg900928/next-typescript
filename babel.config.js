const presets = [
    ["next/babel"],
    // "@zeit/next-typescript/babel",
];
const plugins = [
    ["import", {
        "libraryName": "antd",
        // "libraryDirectory": "es",
        // if you want to use custom theme and set theme variables in less file. You should use style: true
        // "style": true
         // if you just want use antd's default theme, you could just use its css style.
        "style": 'css'
    }],
    ["@babel/plugin-proposal-decorators", {
        "legacy": true,
    }],
    ["@babel/plugin-proposal-class-properties", {
        "loose": true,
    }],
]

module.exports = { presets, plugins }
