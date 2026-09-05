import{ Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsuarioEntity } from '../../repositories/entities/usuario.entity';

export enum EstadoCaptacion{
    PROSPECTO_CREADO = 'prospectoCreado',
    VISITA1_REALIZADA = 'visita1Realizada',
    DOCUMENTOS_RECIBIDOS = 'documentosRecibidos',
    VISITA2_REALIZADA = 'visita2Realizada',
    RUT_VALIDADO = 'rutValidado',
    HABILITADO_BASICO = 'habilitadoBasico',
    HABILITADO_AVANZADO = 'habilitadoAvanzado',
}

@Entity('tiendas')
export class TiendaEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', {length:50, unique:true})
    codigoInterno!: string;

    @Column ('varchar', {length:255})
    nombreComercial!: string;

    @Column('uuid')
    responsableId!: string;

    @ManyToOne(()=> UsuarioEntity)
    @JoinColumn({name:'responsableId'})
    responsable!: UsuarioEntity;

    @Column('varchar', {length:50, unique:true})
    rut!: string;

    @Column('varchar', {length:255})
    direccion!: string;

    @Column('varchar', {length:50})
    telefono!: string;

    @Column({type:'enum', enum:EstadoCaptacion, default:EstadoCaptacion.PROSPECTO_CREADO})
    estadoCaptacion!: EstadoCaptacion;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
