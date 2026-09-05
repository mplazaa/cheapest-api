import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {QueryTiendaDto} from '../../identificacion/dtos/query-tienda.dto';
import {TiendaEntity} from './entities/tienda.entity';

@Injectable()
export class TiendaRepository {
    constructor(
        @Inject('TIENDA_REPOSITORY')
        private repository: Repository<TiendaEntity>,
    ){}
    
    async create(tienda: Partial<TiendaEntity>): Promise<TiendaEntity> {
        const newTienda = this.repository.create(tienda);
        return this.repository.save(newTienda);
    }

    async findAll(query: QueryTiendaDto): Promise<TiendaEntity[]> {
        const queryBuilder = this.repository.createQueryBuilder('tienda').leftJoinAndSelect('tienda.responsable', 'responsable');
        if (query.estadoCaptacion) {
            queryBuilder.andWhere('tienda.estadoCaptacion = :estadoCaptacion', { estadoCaptacion: query.estadoCaptacion });
        }
        return queryBuilder.getMany();
    }

    async findById(id:string): Promise<TiendaEntity | null> {
        return this.repository.findOne({where:{id}, relations:['responsable']});
    }

    async update(id:string, updates:Partial<TiendaEntity>): Promise<TiendaEntity | null> {
        await this.repository.update(id, updates);
        return this.findById(id);
    }

    async delete(id:string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0)>0;
    }
}