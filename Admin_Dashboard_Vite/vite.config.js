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
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("@mui")) {
						return "mui";
					}
					if (id.includes("recharts")) {
						return "charts";
					}
					if (id.includes("formik") || id.includes("yup")) {
						return "form";
					}
				},
			},
		},
	},
});
