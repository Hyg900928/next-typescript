const presets = [
    ["next/babel"],
    // "@zeit/next-typescript/babel",
];
const plugins = [
    ["@babel/plugin-proposal-decorators", {
        "legacy": true,
    }],
    ["@babel/plugin-proposal-class-properties", {
        "loose": true,
    }],

]

module.exports = { presets, plugins }
