import { IsInt, IsString, IsDate, IsOptional, Matches, IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';

export class SupportDTO {
  @Expose({ name: '_id' })
  @IsInt({ message: '_id debe ser de tipo int' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  _id: number;

  @Expose({ name: 'name' })
  @IsString({ message: 'name debe ser de tipo string' })
  @IsDefined({ message: 'El parametro "name" es Obligatorio' })
  name: string;

  @Expose({ name: 'personal' })
  @IsString({ message: 'personal debe ser de tipo string' })
  @IsDefined({ message: 'El parametro "personal" es Obligatorio' })
  personal: string;

  @Expose({ name: 'date' })
  @IsOptional()
  @IsString({ message: 'El parametro "date" es de tipo String' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El parametro "date" tiene un Formato Invalido' })
  date: Date;

  @Expose({ name: 'estado' })
  @IsString({ message: 'estado debe ser de tipo string' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  estado: string;

  @Expose({ name: 'id_incident' })
  @IsInt({ message: 'id_incident debe ser de tipo number' })
  @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
  id_incident: number;

  @Expose({ name: 'created_date' })
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

  @Expose({ name: 'support_person' })
  @IsString({ message: 'support_person debe ser de tipo estado' })
  @IsDefined({ message: 'El parametro "support_person" es Obligatorio' })
  support_person: string;


  constructor(data: Partial<SupportDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.name = '';
    this.personal = '';
    this.estado = '';
    this.id_incident = 0;
    this.created_date = new Date();
    this.support_person = '';
  }
}
