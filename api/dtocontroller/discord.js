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
import { IsDefined, IsString, Matches, IsInt, IsEmail, IsArray, IsNotEmpty } from 'class-validator';
export class DiscordDTO {
    constructor(data) {
        Object.assign(this, data);
        this.discordId = 0;
        this.global_name = '';
        this.username = '';
        this.email = '';
        this.guilds = [];
    }
}
__decorate([
    Expose({ name: 'discordId' }),
    IsDefined({ message: 'El parametro "ID_Discord" es Obligatorio' }),
    IsInt({ message: 'El parametro "ID_Discord" es de tipo Number' }),
    __metadata("design:type", Number)
], DiscordDTO.prototype, "discordId", void 0);
__decorate([
    Expose({ name: 'global_name' }),
    IsDefined({ message: 'El parametro "User" es Obligatorio' }),
    IsString({ message: 'El parametro "User" es de tipo String' }),
    __metadata("design:type", String)
], DiscordDTO.prototype, "global_name", void 0);
__decorate([
    Expose({ name: 'username' }),
    IsDefined({ message: 'El parametro "UserName" es Obligatorio' }),
    IsString({ message: 'El parametro "UserName" es de tipo string' }),
    __metadata("design:type", String)
], DiscordDTO.prototype, "username", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: 'El parámetro "email" es obligatorio' }),
    Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: 'El parámetro "email" no es una dirección de correo electrónico válida',
    }),
    IsEmail({}, { message: 'El parámetro "email" no es una dirección de correo electrónico válida' }),
    __metadata("design:type", String)
], DiscordDTO.prototype, "email", void 0);
__decorate([
    IsArray({ message: 'La propiedad "guilds" debe ser un arreglo' }),
    IsNotEmpty({ message: 'La propiedad "guilds" no puede estar vacía' }),
    IsString({ each: true, message: 'Cada elemento de "guilds" debe ser una cadena' }),
    __metadata("design:type", Array)
], DiscordDTO.prototype, "guilds", void 0);
