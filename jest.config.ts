import type { Config } from "jest"
import nextJest from "next/jest"

const createJestConfig = nextJest({
\  dir: "./",
})

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
  },
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
}

export default createJestConfig(config)
