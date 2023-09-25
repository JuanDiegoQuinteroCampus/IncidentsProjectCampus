var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsString, IsOptional, Matches, IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';
export class SupportDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.name = '';
        this.personal = '';
        this.estado = '';
        this.id_incident = 0;
        this.created_date = new Date();
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsInt({ message: '_id debe ser de tipo int' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", Number)
], SupportDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'name' }),
    IsString({ message: 'name debe ser de tipo string' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", String)
], SupportDTO.prototype, "name", void 0);
__decorate([
    Expose({ name: 'personal' }),
    IsString({ message: 'personal debe ser de tipo string' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", String)
], SupportDTO.prototype, "personal", void 0);
__decorate([
    Expose({ name: 'date' }),
    IsOptional(),
    IsString({ message: 'El parametro "date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], SupportDTO.prototype, "date", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsString({ message: 'estado debe ser de tipo estado' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", String)
], SupportDTO.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'id_incident' }),
    IsInt({ message: 'id_incident debe ser de tipo number' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", Number)
], SupportDTO.prototype, "id_incident", void 0);
__decorate([
    Expose({ name: 'created_date' }),
    IsString({ message: 'El parametro "created_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "created_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], SupportDTO.prototype, "created_date", void 0);
__decorate([
    Expose({ name: 'update_date' }),
    IsOptional(),
    IsString({ message: 'El parametro "update_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "update_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], SupportDTO.prototype, "update_date", void 0);
__decorate([
    Expose({ name: 'delete_date' }),
    IsOptional(),
    IsString({ message: 'El parametro "delete_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "delete_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], SupportDTO.prototype, "delete_date", void 0);
