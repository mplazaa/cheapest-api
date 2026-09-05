import {DataSource} from 'typeorm';
import {TiendaEntity} from './entities/tienda.entity';
import {UsuarioEntity} from './entities/usuario.entity';

export const repositoryProviders = [
    {
        provide: 'TIENDA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TiendaEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USUARIO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UsuarioEntity),
        inject: ['DATA_SOURCE'],
    },
];