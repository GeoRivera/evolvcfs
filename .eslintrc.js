module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": ["error", {
            allow: ["warn", "error"]
        }],
        "no-undef": ["off"],
        "eqeqeq": ["error", "smart"],
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 2
        }]

    }
}