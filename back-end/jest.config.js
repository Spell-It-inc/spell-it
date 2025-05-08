module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testMatch: ["**/app.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
