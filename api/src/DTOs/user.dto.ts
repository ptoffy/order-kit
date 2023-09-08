import { IsIn, IsNotEmpty, IsString, MinLength } from "class-validator"
import { UserRole } from "../models/user.model"

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string
}
export class RegistrationRequest {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string

    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    role!: string
}
export class LoginResponse {
    header!: string
    payload!: string
    expiration!: number
    role!: string
    id!: string

    constructor(header: string, payload: string, expiration: number, role: string, id: string) {
        this.header = header
        this.payload = payload
        this.expiration = expiration
        this.role = role
        this.id = id
    }
}
