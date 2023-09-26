import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches, IsInt, IsEmail, IsArray, IsNotEmpty } from 'class-validator';

export class UsersDTO {

    @Expose({ name: 'id' })
    @IsDefined({ message: 'El parametro "_id" es Obligatorio' })
    @IsInt({ message: 'El parametro "_id" es de tipo Number' })
    _id: number;

    @Expose({ name: 'username' })
    @IsDefined({ message: 'El parametro "UserName" es Obligatorio' })
    @IsString({ message: 'El parametro "UserName" es de tipo string' })
    username: string;

    @Expose({ name: 'password' })
    @IsDefined({ message: 'El parametro "password" es Obligatorio' })
    @IsString({ message: 'El parametro "password" es de tipo string' })
    password: string;

    @Expose({ name: 'token' })
    @IsString({ message: 'El parametro "password" es de tipo string' })
    token: string;
  
    @Expose({ name: 'id_rol' })
    @IsDefined({ message: 'El parametro "id_rol" es Obligatorio' })
    @IsInt({ message: 'El parametro "id_rol" es de tipo Number' })
    id_rol: number;
  

    constructor(data: Partial<UsersDTO>) {
        Object.assign(this, data);
        this._id = 0;
        this.username = '';
        this.password = '';
        this.token = '';
        this.id_rol = 0;

      }
}