import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './crear-usuario.dto';
import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class ActualizarUsuarioDto extends PartialType(
  OmitType(CrearUsuarioDto, ['password'] as const),
) {
  // Contraseña es completamente opcional en actualizaciones
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  // Sobrescribimos la validación de unidadId para actualizaciones
  @ValidateIf((o: ActualizarUsuarioDto) =>
    Boolean(o.rol && o.rol !== RolUsuario.ADMIN),
  )
  @IsNumber({}, { message: 'El ID de unidad debe ser un número' })
  @IsOptional()
  unidadId?: number | null;
}
