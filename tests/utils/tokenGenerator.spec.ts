import jwt from "jsonwebtoken";
import { generateToken } from "../../src/utils/TokenGenerator";

jest.mock("jsonwebtoken");

describe("JWT Utility Functions", () => {
    const payload = { id: "123" };
    const secret = "secret";
    const key = "key";
    const token = "mockToken";
    const expiredToken = "expiredToken";
    const mockPayload = { id: "123", exp: Math.floor(Date.now() / 1000) + 60 * 60 };

    beforeEach(() => {
        (jwt.sign as jest.Mock).mockReturnValue(token);
        (jwt.verify as jest.Mock).mockImplementation((token: string, secret: string) => {
            if (token === expiredToken) {
                const error = new Error("TokenExpiredError");
                (error as any).name = "TokenExpiredError";
                throw error;
            }
            return mockPayload;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("generateToken", () => {
        it("should generate a token", () => {
            const generatedToken = generateToken(payload, secret, key);
            expect(generatedToken).toBe(token);
            expect(jwt.sign).toHaveBeenCalledWith(payload, secret, { keyid: key, expiresIn: '1d' });
        });
    });

});
