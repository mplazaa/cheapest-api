import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export  enum Perfil{
    TENDERO='tendero',
    CAJERO='cajero',
    VENDEDOR='vendedor',
    OPERADOR='operador',
    SUPERVISOR='supervisor',
}

@Entity('usuarios')
export class UsuarioEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', {length:255})
    nombre!: string;

    @Column('varchar', {length:20})
    telefono!: string;

    @Column({type:'enum', enum: Perfil})
    perfil!: Perfil;
}