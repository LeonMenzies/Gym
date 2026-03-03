module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
            [
                "module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        "~assets": "./assets",
                        "~components": "./src/components",
                        "~screens": "./src/screens",
                        "~navigation": "./src/navigation",
                        "~store": "./src/store",
                        "~types": "./src/types",
                        "~utils": "./src/utils",
                        "~hooks": "./src/hooks",
                    },
                },
            ],
        ],
    };
};
