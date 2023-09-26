
import { Expose } from 'class-transformer';
import { IsInt, IsString, IsDate, IsOptional, IsNotEmpty, Matches, IsDefined } from 'class-validator';

export class IncidentDTO {
  @Expose({ name: '_id' })
  @IsInt({ message: '_id debe ser de tipo int' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  _id: number;

  @Expose({ name: 'date' })
  @IsString({ message: 'name debe ser de tipo string' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  @IsNotEmpty({ message: 'El campo "name" no puede estar vacío' })
  name: string;

  @Expose({ name: 'description' })
  @IsString({ message: 'description debe ser de tipo string' })
  @IsNotEmpty({ message: 'El campo "description" no puede estar vacío' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  description: string;

  @Expose({ name: 'date' })
  @IsOptional()
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  @IsString({ message: 'El parametro "date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "date" tiene un Formato Invalido' })
  date: string;

  @Expose({ name: 'report_user' })
  @IsDefined({ message: 'El parametro "report_user" es Obligatorio' })
  @IsInt({ message: 'report_user debe ser de tipo int' })
  report_user: number;

  @Expose({ name: 'severity' })
  @IsDefined({ message: 'El parametro "severity" es Obligatorio' })
  @IsString({ message: 'severity debe ser de tipo string' })
  severity: string;

  @Expose({ name: 'zone' })
  @IsDefined({ message: 'El parametro "zone" es Obligatorio' })
  @IsString({ message: 'zone debe ser de tipo string' })
  zone: string;

  @Expose({ name: 'place' })
  @IsDefined({ message: 'El parametro "place" es Obligatorio' })
  @IsString({ message: 'place debe ser de tipo string' })
  place: string;

  @Expose({ name: 'priority' })
  @IsDefined({ message: 'El parametro "priority" es Obligatorio' })
  @IsString({ message: 'priority debe ser de tipo string' })
  priority: string;

  @Expose({ name: 'solution_date' })
  @IsDefined({ message: 'El parametro "solution_date" es Obligatorio' })
  @IsString({ message: 'El parametro "solution_date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "solution_date" tiene un Formato Invalido' })
  solution_date: Date;

  @Expose({ name: 'id_soporte' })
  @IsDefined({ message: 'El parametro "id_soporte" es Obligatorio' })
  @IsInt({ message: 'id_soporte debe ser de tipo number' })
  id_soporte: number;

  @Expose({ name: 'created_date' })
  @IsOptional()
  @IsString({ message: 'El parametro "created_date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "created_date" tiene un Formato Invalido' })
  created_date: Date;

  @Expose({ name: 'update_date' })
  @IsOptional()
  @IsString({ message: 'El parametro "update_date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "update_date" tiene un Formato Invalido' })
  update_date?: Date;

  @Expose({ name: 'delete_date' })
  @IsOptional()
  @IsString({ message: 'El parametro "delete_date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "delete_date" tiene un Formato Invalido' })
  delete_date?: Date;

    

  constructor(data: Partial<IncidentDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.date = '';
    this.report_user = 0;
    this.id_soporte = 0;
    this.created_date = new Date();
  }
}
