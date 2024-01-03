import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() {
        return {message: "signin from the service"};
    }
    signup() {
        return { message: "signup from the service"};
    }
}