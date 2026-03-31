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
					if (id.includes("node_modules")) {
						if (id.includes("@mui")) return "mui";
						if (id.includes("recharts")) return "charts";
						if (id.includes("formik")) return "formik";
						if (id.includes("yup")) return "yup";
						return "vendor";
					}
				},
			},
		},
	},
});
