import { db } from '../app/lib/prisma';
import bcrypt from 'bcryptjs';

async function seed() {
  const hashed = await bcrypt.hash('admin123', 10);
  await db.user.upsert({
    where: { email: 'admin@midastech.com' },
    update: {},
    create: {
      email: 'admin@midastech.com',
      name: 'Admin',
      password: hashed,
      role: 'admin',
    },
  });
  console.log('Admin created: admin@midastech.com / admin123');
}

seed();
