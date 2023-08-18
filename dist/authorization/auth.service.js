"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const auth_helper_1 = require("./auth.helper");
const user_entity_1 = require("../users/entity/user.entity");
let AuthService = class AuthService {
    async register(body) {
        if (!body.login ||
            !body.password ||
            typeof body.login !== 'string' ||
            typeof body.password !== 'string') {
            throw new common_1.BadRequestException('Login and password are required and must be a string');
        }
        const hashPassword = await bcrypt.hash(body.password, +process.env.CRYPT_SALT);
        const newUser = {
            id: (0, uuid_1.v4)(),
            login: body.login,
            password: hashPassword,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
        console.log(newUser);
        await this.userRepository.save(newUser);
        const { password } = newUser, userWP = __rest(newUser, ["password"]);
        return userWP;
    }
    async login(body) {
        const { login, password } = body;
        if (!login ||
            !password ||
            typeof login !== 'string' ||
            typeof password !== 'string') {
            throw new common_1.BadRequestException('Login and password are required and must be a string');
        }
        const user = await this.userRepository.findOne({
            where: { login },
        });
        if (!user) {
            throw new common_1.ForbiddenException('No such user');
        }
        const isPasswordValid = this.helper.isPasswordValid(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.ForbiddenException('Wrong password');
        }
        return this.helper.generateToken(user);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], AuthService.prototype, "userRepository", void 0);
__decorate([
    (0, common_1.Inject)(auth_helper_1.AuthHelper),
    __metadata("design:type", auth_helper_1.AuthHelper)
], AuthService.prototype, "helper", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map