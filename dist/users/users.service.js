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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entity/user.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const uuid_1 = require("uuid");
const isIdValid_1 = require("../utils/isIdValid");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findOne(id) {
        (0, isIdValid_1.isIdValid)(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        console.log(user);
        if (!user) {
            throw new common_1.NotFoundException('Not found');
        }
        const { password } = user, userWP = __rest(user, ["password"]);
        return userWP;
    }
    async create(createUserDto) {
        if (!createUserDto.login || !createUserDto.password) {
            throw new common_1.BadRequestException('Login and password are required');
        }
        const user = {
            id: (0, uuid_1.v4)(),
            login: createUserDto.login,
            password: createUserDto.password,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
        this.userRepository.save(user);
        const { password } = user, userWP = __rest(user, ["password"]);
        console.log(user);
        return userWP;
    }
    async update(id, body) {
        (0, isIdValid_1.isIdValid)(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Not found');
        }
        if (!body.oldPassword ||
            !body.newPassword ||
            typeof body.oldPassword !== 'string' ||
            typeof body.newPassword !== 'string') {
            throw new common_1.BadRequestException('Old password and new password are required and must be a string');
        }
        if (user.password !== body.oldPassword) {
            throw new common_1.ForbiddenException('Wrong password');
        }
        const updatedUser = Object.assign({}, user);
        updatedUser.password = body.newPassword;
        user.updatedAt = new Date().getTime();
        updatedUser.version = updatedUser.version + 1;
        this.userRepository.save(updatedUser);
        const { password } = updatedUser, userWP = __rest(updatedUser, ["password"]);
        return userWP;
    }
    async delete(id) {
        (0, isIdValid_1.isIdValid)(id);
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Not found');
        }
        else {
            this.userRepository.remove(user);
        }
    }
};
__decorate([
    (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_1.Repository)
], UsersService.prototype, "userRepository", void 0);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map