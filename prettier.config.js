import config from "@hyperz111/prettier-config";

/** @type {import("prettier").Config} */
export default {
	overrides: [
		{
			files: "./bin/kagit.js",
			options: {
				printWidth: Infinity,
				semi: false,
				bracketSpacing: false,
				trailingComma: "none",
				singleQuote: true,
			},
		},
		{
			files: "!./bin/kagit.js",
			options: config,
		},
	],
};
