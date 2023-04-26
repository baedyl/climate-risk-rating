/** @type {import('next').NextConfig} */
const { withExpo } = require("@expo/next-adapter");
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "react-native-web",
  "react-native-svg",
  "native-base",
  "react-native-svg",
]);

const nextConfig = {
  experimental: {
    appDir: true,
  },
}
module.exports = withPlugins(
  [
    withTM,
    [withFonts, { projectRoot: __dirname }],
    [withExpo, { projectRoot: __dirname }],
    // your plugins go here.
  ],
  nextConfig
);

module.exports = nextConfig
