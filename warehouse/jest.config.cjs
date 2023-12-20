module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "/src/components/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  testEnvironment: "jsdom",
};
