const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: "test@examplehfh.com",
       
      },
    })
    console.log('User created:', user)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()