const ignorePaths = [
    "/node_modules/",
    "/dist/",
    "/tests/",
    "jest.config.ts",
    "main.ts",
    "app.ts",
    "app.module.ts",
    "/src/external/",
    "/routes",
    "/src/internal/application/configs/",
    "/src/internal/application/docs/",
    "/src/internal/application/ports/",
]

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    rootDir: ".",
    setupFiles: ['dotenv/config'],
    testMatch: [
        "**/__tests__/**/*.ts?(x)",
        "**/?(*.)+(spec|test).ts?(x)"
    ],
    collectCoverageFrom: ["**/*.ts"],
    coverageDirectory: "<rootDir>/coverage",
    coverageThreshold: {
        global: {
            functions: 80,
            lines: 80,
            statements: 80,
            branches: 80,
        },
    },
    coveragePathIgnorePatterns: ignorePaths,
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
        "^tests/(.*)$": "<rootDir>/tests/$1"
    },
    coverageReporters: ["lcov", "text"],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
}