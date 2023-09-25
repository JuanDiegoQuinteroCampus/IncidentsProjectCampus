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
import { IsInt, IsString, IsOptional, IsNotEmpty, Matches, IsDefined } from 'class-validator';
export class IncidentDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.date = '';
        this.report_user = 0;
        this.id_soporte = 0;
        this.created_date = new Date();
    }
}
__decorate([
    IsInt({ message: '_id debe ser de tipo int' }),
    __metadata("design:type", Number)
], IncidentDTO.prototype, "_id", void 0);
__decorate([
    IsString({ message: 'name debe ser de tipo string' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    IsNotEmpty({ message: 'El campo "name" no puede estar vacío' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "name", void 0);
__decorate([
    IsString({ message: 'description debe ser de tipo string' }),
    IsNotEmpty({ message: 'El campo "description" no puede estar vacío' }),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "description", void 0);
__decorate([
    Expose({ name: 'date' }),
    IsOptional(),
    IsDefined({ message: 'El parametro "_id" es Obligatorio' }),
    IsString({ message: 'El parametro "date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "date" tiene un Formato Invalido' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "date", void 0);
__decorate([
    Expose({ name: 'report_user' }),
    IsDefined({ message: 'El parametro "report_user" es Obligatorio' }),
    IsInt({ message: 'report_user debe ser de tipo int' }),
    __metadata("design:type", Number)
], IncidentDTO.prototype, "report_user", void 0);
__decorate([
    Expose({ name: 'severity' }),
    IsDefined({ message: 'El parametro "severity" es Obligatorio' }),
    IsString({ message: 'severity debe ser de tipo string' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "severity", void 0);
__decorate([
    Expose({ name: 'zone' }),
    IsDefined({ message: 'El parametro "zone" es Obligatorio' }),
    IsString({ message: 'zone debe ser de tipo string' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "zone", void 0);
__decorate([
    Expose({ name: 'place' }),
    IsDefined({ message: 'El parametro "place" es Obligatorio' }),
    IsString({ message: 'place debe ser de tipo string' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "place", void 0);
__decorate([
    Expose({ name: 'priority' }),
    IsDefined({ message: 'El parametro "priority" es Obligatorio' }),
    IsString({ message: 'priority debe ser de tipo string' }),
    __metadata("design:type", String)
], IncidentDTO.prototype, "priority", void 0);
__decorate([
    Expose({ name: 'solution_date' }),
    IsDefined({ message: 'El parametro "solution_date" es Obligatorio' }),
    IsString({ message: 'El parametro "solution_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "solution_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], IncidentDTO.prototype, "solution_date", void 0);
__decorate([
    Expose({ name: 'id_soporte' }),
    IsDefined({ message: 'El parametro "id_soporte" es Obligatorio' }),
    IsInt({ message: 'id_soporte debe ser de tipo number' }),
    __metadata("design:type", Number)
], IncidentDTO.prototype, "id_soporte", void 0);
__decorate([
    Expose({ name: 'created_date' }),
    IsOptional(),
    IsString({ message: 'El parametro "created_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "created_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], IncidentDTO.prototype, "created_date", void 0);
__decorate([
    Expose({ name: 'update_date' }),
    IsOptional(),
    IsString({ message: 'El parametro "update_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "update_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], IncidentDTO.prototype, "update_date", void 0);
__decorate([
    Expose({ name: 'delete_date' }),
    IsOptional(),
    IsString({ message: 'El parametro "delete_date" es de tipo String' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "delete_date" tiene un Formato Invalido' }),
    __metadata("design:type", Date)
], IncidentDTO.prototype, "delete_date", void 0);
