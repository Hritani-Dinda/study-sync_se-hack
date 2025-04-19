// test-node.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Test database connection
    const connection = await prisma.$queryRaw`SELECT 1+1 AS result`;
    console.log('✅ Database connection test:', connection);

    // Create test user
    const newUser = await prisma.user.create({
      data: {
        name: "Test Student",
        email: `student${Date.now()}@example.com`,
        password: "student123",
        role: "STUDENT"
      }
    });
    console.log('\n✅ Created user:', newUser);

    // Retrieve user by email
    const foundUser = await prisma.user.findUnique({
      where: { email: newUser.email }
    });
    console.log('\n✅ Retrieved user:', foundUser);

    // Create a course with teacher
    const teacherUser = await prisma.user.create({
      data: {
        name: "Prof. Smith",
        email: `teacher${Date.now()}@example.com`,
        password: "teacher123",
        role: "TEACHER",
        teacher: {
          create: {
            department: "Computer Science",
            officeLocation: "Building A-101"
          }
        }
      },
      include: { teacher: true }
    });
    console.log('\n✅ Created teacher:', teacherUser);

    const newCourse = await prisma.course.create({
      data: {
        title: "Introduction to Programming",
        description: "Basic programming concepts",
        teacherId: teacherUser.id
      }
    });
    console.log('\n✅ Created course:', newCourse);

    // Enroll student in course
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: newUser.id,
        courseId: newCourse.id
      }
    });
    console.log('\n✅ Created enrollment:', enrollment);

    // Retrieve full course details
    const courseWithDetails = await prisma.course.findUnique({
      where: { id: newCourse.id },
      include: {
        teacher: true,
        enrollments: {
          include: { user: true }
        }
      }
    });
    console.log('\n✅ Course details:', JSON.stringify(courseWithDetails, null, 2));

  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();