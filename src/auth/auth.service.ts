import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    signin(dto: AuthDto) {
        return { message: "signin from the service" };
    }
    signup(dto: AuthDto) {
        return { message: "signup from the service"};
    }
}