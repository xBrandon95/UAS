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

  @Column({ nullable: true, type: 'integer' })
  unidadId: number | null;

  @ManyToOne(() => Unidad, (unidad) => unidad.usuarios, {
    eager: true,
    onDelete: 'SET NULL', // Si se elimina la unidad, el usuario queda sin unidad
  })
  @JoinColumn({ name: 'unidadId' })
  unidad: Unidad | null;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.isPasswordHashed(this.password)) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    // Solo hashear si la contraseña NO está ya hasheada
    if (this.password && !this.isPasswordHashed(this.password)) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  /**
   * Verifica si una contraseña ya está hasheada con bcrypt
   * Los hashes de bcrypt siempre comienzan con $2a$, $2b$ o $2y$
   */
  private isPasswordHashed(password: string): boolean {
    return /^\$2[aby]\$\d{2}\$/.test(password);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
