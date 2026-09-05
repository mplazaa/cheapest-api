import {EstadoCaptacion} from '../repositories/entities/tienda.entity';
import{Perfil} from '../repositories/entities/usuario.entity';

export class TiendaResponseDto{
    id:string;
    codigoInterno:string;
    nombreComercial:string;
    responsable:{
        id:string;
        nombre:string;
        telefono:string;
        perfil:Perfil;
    };
    rut:string;
    direccion:string;
    telefono:string;
    estadoCaptacion:EstadoCaptacion;
    createdAt:Date;
    updatedAt:Date;
}