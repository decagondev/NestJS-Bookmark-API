import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post("signup")
    signup() {
        return "This is the SignUp Route";
    }

    @Post("signin")
    signin() {
        return "This is the SignIn Route";
    }
}