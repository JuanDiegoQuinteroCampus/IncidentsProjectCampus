var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsString, Matches, IsInt, IsEmail, IsOptional } from 'class-validator';
export class UsersDTO {
    constructor(data) {
        Object.assign(this, data);
        this.CC = 0;
        this.username = '';
        this.password = '';
        this.id_rol = 0;
        this.email = '';
    }
}
__decorate([
    Expose({ name: 'CC' }),
    IsDefined({ message: 'El parametro "CC" es Obligatorio' }),
    IsInt({ message: 'El parametro "CC" es de tipo Number' }),
    __metadata("design:type", Number)
], UsersDTO.prototype, "CC", void 0);
__decorate([
    Expose({ name: 'username' }),
    IsDefined({ message: 'El parametro "UserName" es Obligatorio' }),
    IsString({ message: 'El parametro "UserName" es de tipo string' }),
    __metadata("design:type", String)
], UsersDTO.prototype, "username", void 0);
__decorate([
    Expose({ name: 'password' }),
    IsDefined({ message: 'El parametro "password" es Obligatorio' }),
    IsString({ message: 'El parametro "password" es de tipo string' }),
    __metadata("design:type", String)
], UsersDTO.prototype, "password", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: 'El parametro "email" es Obligatorio' }),
    IsEmail(),
    IsString({ message: 'El parametro "email" es de tipo string' }),
    Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: 'El parámetro "email" no es una dirección de correo electrónico válida',
    }),
    __metadata("design:type", String)
], UsersDTO.prototype, "email", void 0);
__decorate([
    Expose({ name: 'id_rol' }),
    IsOptional(),
    IsDefined({ message: 'El parametro "id_rol" es Obligatorio' }),
    IsInt({ message: 'El parametro "id_rol" es de tipo Number' }),
    __metadata("design:type", Number)
], UsersDTO.prototype, "id_rol", void 0);
