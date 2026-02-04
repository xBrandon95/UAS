import { DataSource } from 'typeorm';
import {
  Usuario,
  RolUsuario,
} from '../modules/usuarios/entities/usuario.entity';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  const usuarioRepository = dataSource.getRepository(Usuario);

  const adminExiste = await usuarioRepository.findOne({
    where: { usuario: 'admin' },
  });

  if (adminExiste) {
    console.log('⚠️  El usuario admin ya existe. Se omite el seed.');
    return;
  }

  const admin = usuarioRepository.create({
    nombre: 'Administrador',
    usuario: 'admin',
    password: 'admin123',
    rol: RolUsuario.ADMIN,
    activo: true,
  });

  await usuarioRepository.save(admin);
  console.log('✅ Usuario admin creado exitosamente.');
}
