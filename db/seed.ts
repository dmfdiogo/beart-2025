import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data'

async function main() {
  const prisma = new PrismaClient()
  try {
    await prisma.product.deleteMany()
    await prisma.product.createMany({ data: sampleData.products })
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
