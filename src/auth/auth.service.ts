import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    signin() {
        return { message: "signin from the service" };
    }
    signup() {
        return { message: "signup from the service"};
    }
}