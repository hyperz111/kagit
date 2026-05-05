/** @type {import("nano-staged").Configuration} */
export default {
	"*": "pnpm exec prettier -w",
	"**/*.js": () => "pnpm run types",
};
