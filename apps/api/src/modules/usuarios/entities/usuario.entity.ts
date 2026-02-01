import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Unidad } from '../../unidades/entities/unidad.entity';

export enum RolUsuario {
  ADMIN = 'admin',
  OPERADOR = 'operador',
  SUPERVISOR = 'supervisor',
}

@Entity('usuarios')
@Index(['usuario']) // Índice para búsquedas rápidas por usuario
@Index(['rol']) // Índice para filtros por rol
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, unique: true })
  usuario: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.OPERADOR,
  })
  rol: RolUsuario;

  @Column({ nullable: true })
  unidadId: number;

  @ManyToOne(() => Unidad, (unidad) => unidad.usuarios, {
    eager: true,
    onDelete: 'SET NULL', // Si se elimina la unidad, el usuario queda sin unidad
  })
  @JoinColumn({ name: 'unidadId' })
  unidad: Unidad;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' }) // Más preciso en PostgreSQL
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
