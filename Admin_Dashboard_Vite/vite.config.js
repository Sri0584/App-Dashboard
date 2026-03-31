import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"], // pass compiler via react plugin
			},
		}),
	],
	build: {
		sourcemap: true,
	},
});
