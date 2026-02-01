import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('unidades')
@Index(['nombre']) // Índice para búsquedas por nombre
@Index(['activo']) // Índice para filtros por estado
export class Unidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  ubicacion: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.unidad, {
    cascade: false, // No eliminar usuarios al eliminar unidad
  })
  usuarios: Usuario[];

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;
}
