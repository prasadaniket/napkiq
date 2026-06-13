require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('../generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

prisma.outlet
  .updateMany({
    where: { slug: 'boisar' },
    data: { instagramUrl: 'https://www.instagram.com/citrinefinedineofficial/' },
  })
  .then((result) => {
    console.log('Updated rows:', JSON.stringify(result));
    return prisma.$disconnect();
  })
  .then(() => pool.end())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
