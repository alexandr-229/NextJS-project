module.exports = () => {
	require("dotenv").config({ path: "path/to/.env.production" });
	const nextConfig = {
		reactStrictMode: true,
		images: {
			domains: ["play-lh.googleusercontent.com"]
		},
		webpack(config, options) {
			config.module.rules.push({
				loader: "@svgr/webpack",
				issuer: /\.[jt]sx?$/,
				options: {
					prettier: false,
					svgo: true,
					svgoConfig: {
						plugins: [
							{
								name: "preset-default",
								params: {
									overrides: {
										removeViewBox: false
									}
								}
							}
						]
					},
					titleProp: true
				},
				test: /\.svg$/
			});

			return config;
		}
	};

	return nextConfig;
};
