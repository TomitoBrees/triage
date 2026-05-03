import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.usersService.findByEmail(dto.email);
		if (existingUser) {
			throw new ConflictException("Email is already registered");
		}

		const passwordHash = await bcrypt.hash(dto.password, 12);
		const user = await this.usersService.create(dto.email, passwordHash);
		return this.createTokenResponse(user.id, user.email);
	}

	async login(dto: LoginDto) {
		const user = await this.usersService.findByEmail(dto.email);
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return this.createTokenResponse(user.id, user.email);
	}

	private createTokenResponse(userId: string, email: string) {
		return {
			accessToken: this.jwtService.sign({
				sub: userId,
				email,
			}),
		};
	}
}
