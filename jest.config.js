/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "diagnostics": true
    }
  },
  moduleNameMapper: {
    "hooks": "<rootDir>/src/hooks",
    "context": "<rootDir>/src/context",
    "components": "<rootDir>/src/components"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}
