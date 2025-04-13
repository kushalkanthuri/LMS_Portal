"use server";

import { prisma } from "@/lib/db";
import type { CreateClassroomSchema } from "@/lib/validators";
import type { Classrooms } from "@prisma/client";

export async function getClassrooms(): ActionOutput<{
  classrooms: Classrooms[]
}> {
  try {
    const classrooms = await prisma.classrooms.findMany()

    return {
      success: true,
      classrooms,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch classrooms",
    }
  }
}

export async function getClassroomByID(id: string): ActionOutput<{
  classroom: ClassroomWithStudents | null;
}> {
  try {
    const classroom = await prisma.classrooms.findUnique({
      where: { id },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return {
      success: true,
      classroom,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch classrooms",
    };
  }
}

export async function createClassroom(
  data: CreateClassroomSchema,
): ActionOutput<{ classroom: Classrooms }> {
  try {
    const classroom = await prisma.classrooms.create({
      data,
    });
    return {
      success: true,
      classroom,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create classroom",
    };
  }
}

export async function updateStudents(
  ids: string[],
  classroomsId: string,
): ActionOutput {
  try {
    await prisma.users.updateMany({
      where: {
        id: {
          in: ids,
        },
        role: "student",
      },
      data: {
        classroomsId,
      },
    })

    return {
      success: true,
    }
  } catch (e) {
    console.log("error", e)
    return {
      success: false,
      error: e instanceof Error ? e.message : "Something went wrong",
    }
  }
}

export async function getSubjectsClassroom(facultyId: string): ActionOutput<{
  classrooms: {
    name: string
    id: string
    subejects: {
      name: string
      id: string
    }[]
    _count: {
      students: number
    }
  }[]
}> {
  try {
    const classrooms = await prisma.classrooms.findMany({
      where: {
        subejects: {
          some: {
            facultyId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        subejects: {
          select: {
            id: true,
            name: true,
          },
          where: {
            facultyId,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    })

    return {
      success: true,
      classrooms,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch classrooms",
    }
  }
}