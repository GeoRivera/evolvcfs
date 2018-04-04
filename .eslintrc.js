module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ],
        "no-undef": ["off"],
        "eqeqeq": ["error", "smart"],
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 2
        }]

    }
}