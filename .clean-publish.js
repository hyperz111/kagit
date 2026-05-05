class Keep extends RegExp {
	test(value) {
		// TODO: use regex
		return !["bin", "kagit.js", "package.json"].includes(value);
	}
}

/** @type {import("clean-publish").Config} */
export default {
	files: [new Keep()],
	fields: ["kagit", "packageManager", "scripts"],
};
