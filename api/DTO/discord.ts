import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches, IsInt, IsEmail, IsArray, IsNotEmpty } from 'class-validator';

export class DiscordDTO {

    @Expose({ name: 'discordId' })
    @IsDefined({ message: 'El parametro "ID_Discord" es Obligatorio' })
    @IsInt({ message: 'El parametro "ID_Discord" es de tipo Number' })
    discordId: number;

    @Expose({ name: 'global_name' })
    @IsDefined({ message: 'El parametro "User" es Obligatorio' })
    @IsString({ message: 'El parametro "User" es de tipo String' })
    global_name: string;

    @Expose({ name: 'username' })
    @IsDefined({ message: 'El parametro "UserName" es Obligatorio' })
    @IsString({ message: 'El parametro "UserName" es de tipo string' })
    username: string;

    @Expose({ name: 'email' })
    @IsDefined({ message: 'El parámetro "email" es obligatorio' })
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'El parámetro "email" no es una dirección de correo electrónico válida',
    })
    @IsEmail({}, { message: 'El parámetro "email" no es una dirección de correo electrónico válida' })
    email: string;

    @IsArray({ message: 'La propiedad "guilds" debe ser un arreglo' })
    @IsNotEmpty({ message: 'La propiedad "guilds" no puede estar vacía' })
    @IsString({ each: true, message: 'Cada elemento de "guilds" debe ser una cadena' })
    guilds: string[]; 
  
  

    constructor(data: Partial<DiscordDTO>) {
        Object.assign(this, data);
        this.discordId = 0;
        this.global_name = '';
        this.username = '';
        this.email = '';
        this.guilds = [];
      }
}