import {IsEnum, IsOptional, IsString, MaxLength} from 'class-validator';
import {EstadoCaptacion} from '../repositories/entities/tienda.entity';

export class QueryTiendaDto{
    @IsOptional()
    @IsEnum(EstadoCaptacion)
    estadoCaptacion?:EstadoCaptacion;
}