import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  await prisma.$transaction(async (tx) => {
    const users = await tx.users.createManyAndReturn({
      data: [
        {
          name: "Geeta Rani",
          email: "geeta.rani.admin@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "admin",
        },
        {
          name: "Hari Om",
          email: "hari.om.admin@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "admin",
        },

        // faculty
        {
          name: "Sunil Yadav",
          email: "sunil.yadav.faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },
        {
          name: "Meera Bhatt",
          email: "meera.bhatt.faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },
        {
          name: "Ashok Mehra",
          email: "ashok.mehra.faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },
        {
          name: "Rekha Sharma",
          email: "rekha.sharma.faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },
        {
          name: "Vinod Patil",
          email: "vinod.patil.faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },

        // students
        {
          name: "Sai Ram",
          email: "sairam.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Neha Gupta",
          email: "neha.gupta.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Rahul Singh",
          email: "rahul.singh.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Priya Menon",
          email: "priya.menon.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Arjun Patel",
          email: "arjun.patel.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Divya Joshi",
          email: "divya.joshi.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Ravi Kumar",
          email: "ravi.kumar.student@email.com",
          password:
            "$rologie$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Sneha Pillai",
          email: "sneha.pillai.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Aarti Desai",
          email: "aarti.desai.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Vijay Choudhary",
          email: "vijay.choudhary.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Rohit Sharma",
          email: "rohit.sharma.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Kiran Malhotra",
          email: "kiran.malhotra.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Amitabh Sen",
          email: "amitabh.sen.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Deepa Nair",
          email: "deepa.nair.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Aditya Roy",
          email: "aditya.roy.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Pooja Mehra",
          email: "pooja.mehra.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Vikram Seth",
          email: "vikram.seth.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Anjali Rawat",
          email: "anjali.rawat.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Nikhil Bansal",
          email: "nikhil.bansal.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Swati Kulkarni",
          email: "swati.kulkarni.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Kunal Shah",
          email: "kunal.shah.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Tara Saini",
          email: "tara.saini.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Gaurav Jain",
          email: "gaurav.jain.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Shruti Das",
          email: "shruti.das.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Harish Vaidya",
          email: "harish.vaidya.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Lakshmi Rao",
          email: "lakshmi.rao.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Manoj Thakur",
          email: "manoj.thakur.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Ritu Saxena",
          email: "ritu.saxena.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Sameer Khan",
          email: "sameer.khan.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Bhavna Arora",
          email: "bhavna.arora.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Yashwant Dube",
          email: "yashwant.dube.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Preeti Luthra",
          email: "preeti.luthra.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Siddharth Bose",
          email: "siddharth.bose.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Nandini Garg",
          email: "nandini.garg.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Abhishek Dutta",
          email: "abhishek.dutta.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Shivani Tyagi",
          email: "shivani.tyagi.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Rakesh Mistry",
          email: "rakesh.mistry.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Ananya Vyas",
          email: "ananya.vyas.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Vivek Anand",
          email: "vivek.anand.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
        {
          name: "Tanvi Parekh",
          email: "tanvi.parekh.student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
      ],
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seeding completed successfully.")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
