import { UserRole } from "../models/user.model"


/**
 * Login response DTO.
 */
export interface LoginResponse {
    header: string
    payload: string
    expiration: string
    role: UserRole
    id: string
}
