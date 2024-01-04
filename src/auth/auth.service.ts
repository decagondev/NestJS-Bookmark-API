import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signin() {
        return { message: "signin from the service" };
    }
    signup() {
        return { message: "signup from the service"};
    }
}