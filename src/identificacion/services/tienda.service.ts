import {Injectable, NotFoundException} from '@nestjs/common';
import {TiendaRepository} from '../repositories/tienda.repository';
import {CreateTiendaDto, QueryTiendaDto, UpdateTiendaDto, TiendaResponseDto} from '../dtos';
import {TiendaEntity} from '../repositories/entities/tienda.entity';

@Injectable()
export class TiendaService {
    constructor(private readonly tiendaRepository:TiendaRepository){}

    async create(createTiendaDto:CreateTiendaDto):Promise<TiendaResponseDto>{
        const tienda = await this.tiendaRepository.create(createTiendaDto);
        return this.mapToResponse(tienda);
    }

    async findAll(query:QueryTiendaDto):Promise<TiendaResponseDto[]>{
        const tiendas = await this.tiendaRepository.findAll(query);
        return tiendas.map(t => this.mapToResponse(t));
    }

    async findById(id:string):Promise<TiendaResponseDto>{
        const tienda = await this.tiendaRepository.findById(id);
        if(!tienda){
            throw new NotFoundException(`Tienda con id ${id} no encontrada`);
        }
        return this.mapToResponse(tienda);
    }

    async exists(id:string):Promise<boolean>{
        const tienda = await this.tiendaRepository.findById(id);
        return !!tienda;
    }

    async update(id:string, updateTiendaDto:UpdateTiendaDto):Promise<TiendaResponseDto>{
        const tienda = await this.tiendaRepository.findById(id);
        if(!tienda){
            throw new NotFoundException(`Tienda con id ${id} no encontrada`);
        }
        const updated = await this.tiendaRepository.update(id, updateTiendaDto);
        return this.mapToResponse(updated!);
    }

    async delete(id:string):Promise<void>{
        const tienda = await this.tiendaRepository.findById(id);
        if(!tienda){
            throw new NotFoundException(`Tienda con id ${id} no encontrada`);
        }
        await this.tiendaRepository.delete(id);
    }   

    private mapToResponse(tienda: TiendaEntity): TiendaResponseDto {
        return {
            id: tienda.id,
            codigoInterno: tienda.codigoInterno,
            nombreComercial: tienda.nombreComercial,
            responsable: tienda.responsable &&{
                id: tienda.responsable.id,
                nombre: tienda.responsable.nombre,
                telefono: tienda.responsable.telefono,
                perfil: tienda.responsable.perfil,
            },
            rut: tienda.rut,
            direccion: tienda.direccion,
            telefono: tienda.telefono,
            estadoCaptacion: tienda.estadoCaptacion,
            createdAt: tienda.createdAt,
            updatedAt: tienda.updatedAt,
        };
    }
}