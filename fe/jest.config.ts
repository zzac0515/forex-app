// // jest.config.ts
// import type { Config } from "jest";

// const config: Config = {
//   preset: "ts-jest/presets/js-with-ts", // handles TS + JSX
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   transformIgnorePatterns: ["<rootDir>/node_modules/"],
// };

// export default config;
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // optional, for style mocks
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
