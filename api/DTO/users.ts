import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches, IsInt, IsEmail, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class UsersDTO {


    @Expose({ name: 'CC' })
    @IsDefined({ message: 'El parametro "CC" es Obligatorio' })
    @IsInt({ message: 'El parametro "CC" es de tipo Number' })
    CC: number;

    @Expose({ name: 'username' })
    @IsDefined({ message: 'El parametro "UserName" es Obligatorio' })
    @IsString({ message: 'El parametro "UserName" es de tipo string' })
    username: string;

    @Expose({ name: 'password' })
    @IsDefined({ message: 'El parametro "password" es Obligatorio' })
    @IsString({ message: 'El parametro "password" es de tipo string' })
    password: string;

    @Expose({ name: 'email' })
    @IsDefined({ message: 'El parametro "email" es Obligatorio' })
    @IsEmail()
    @IsString({ message: 'El parametro "email" es de tipo string' })
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: 'El parámetro "email" no es una dirección de correo electrónico válida',
      })
    email: string;

  
    @Expose({ name: 'id_rol' })
    @IsOptional()
    @IsDefined({ message: 'El parametro "id_rol" es Obligatorio' })
    @IsInt({ message: 'El parametro "id_rol" es de tipo Number' })
    id_rol: number;
  

    constructor(data: Partial<UsersDTO>) {
        Object.assign(this, data);
        this.CC = 0;
        this.username = '';
        this.password = '';
        this.id_rol = 0;
        this.email ='';

      }
}