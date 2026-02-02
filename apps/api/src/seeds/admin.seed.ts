import { DataSource } from 'typeorm';
import {
  Usuario,
  RolUsuario,
} from '../modules/usuarios/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  const usuarioRepository = dataSource.getRepository(Usuario);

  const adminExiste = await usuarioRepository.findOne({
    where: { usuario: 'admin' },
  });

  if (adminExiste) {
    console.log('⚠️  El usuario admin ya existe. Se omite el seed.');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHasheado = await bcrypt.hash('admin123', salt);

  const admin = usuarioRepository.create({
    nombre: 'Administrador',
    usuario: 'admin',
    password: passwordHasheado,
    rol: RolUsuario.ADMIN,
    activo: true,
  });

  await usuarioRepository.save(admin);
  console.log('✅ Usuario admin creado exitosamente.');
}
