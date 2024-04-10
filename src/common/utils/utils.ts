import { HttpStatus } from "@nestjs/common";
import { CaughtError, RequestResponse } from "./entities/utils.entities";
import * as bcrypt from 'bcrypt'
import { config } from "../config/config";
import { JwtService } from "@nestjs/jwt";

const jwtService = new JwtService();

export function throwError(message: string, code: number | null = null) {
    const error: any = new Error(message);
    error.code = code;

    throw error;
}

export function generateSuccessResponse(response: RequestResponse) {
    if (!response.data)
        return {
            status: response.statusCode,
            message: response.message,
        };

    return {
        status: response.statusCode,
        message: response.message,
        data: response.data,
    };
}


export function generateErrorResponse(error: CaughtError) {
    if (error?.response?.status === 400) {
        return {
            status: error?.response.status,
            message: error?.response?.data?.message,
        };
    }

    if (!error.code || typeof error.code === 'string') {
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong, Please try again later",
        };
    }
    return {
        status: error.code,
        message: error.message,
    };
}

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export async function getTokens(userId: number, email: string) {
    const [accessToken] = await Promise.all([
        jwtService.signAsync(
            {
                sub: userId,
                email,
            },
            {
                secret: config.jwtSecret,
                expiresIn: `${config.jwtExpiresIn}d`,
            },
        )
    ]);

    return {
        accessToken
    };
}
