const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const colleges = [
  {
    name: "DTU",
    location: "Delhi",
    fees: 240000,
    rating: 4.5,
    avgPackage: 2800000,
    overview: "Delhi Technological University - Premier engineering college in Delhi",
    courses: "B.Tech in CSE, ECE, EE, Mechanical, Civil",
    placements: "Top recruiters: Google, Microsoft, Amazon, Flipkart. 95% placement rate.",
    reviews: {
      create: [
        { userName: "Rahul S.", comment: "Excellent faculty and placement opportunities. The campus life is amazing!", rating: 4.5 },
        { userName: "Priya M.", comment: "Good infrastructure but the fees are a bit high. Overall a great college.", rating: 4.0 },
        { userName: "Amit K.", comment: "Best engineering college in Delhi. The CSE department is top-notch.", rating: 5.0 }
      ]
    }
  },
  {
    name: "NSUT",
    location: "Delhi",
    fees: 220000,
    rating: 4.4,
    avgPackage: 2600000,
    overview: "Netaji Subhas University of Technology - State university in Delhi",
    courses: "B.Tech in CSE, IT, ECE, EE, Mechanical",
    placements: "Top recruiters: Amazon, Microsoft, Goldman Sachs, Oracle.",
    reviews: {
      create: [
        { userName: "Sneha R.", comment: "Great college for IT and CSE. The coding culture is very strong.", rating: 4.5 },
        { userName: "Vikram S.", comment: "Good placements but the campus is small. Faculty is supportive.", rating: 4.0 }
      ]
    }
  },
  {
    name: "IIIT Delhi",
    location: "Delhi",
    fees: 200000,
    rating: 4.6,
    avgPackage: 3000000,
    overview: "IIIT Delhi - Premier research university for IT",
    courses: "B.Tech in CSE, ECE, CS with AI/ML",
    placements: "Top recruiters: Google, Facebook, Amazon, Uber.",
    reviews: {
      create: [
        { userName: "Arjun N.", comment: "Research-focused college with excellent AI/ML curriculum.", rating: 5.0 },
        { userName: "Kavya P.", comment: "Best for computer science. The professors are world-class.", rating: 4.5 },
        { userName: "Rohit G.", comment: "Small but elite. Placements are outstanding every year.", rating: 4.5 }
      ]
    }
  },
  {
    name: "USICT",
    location: "Delhi",
    fees: 180000,
    rating: 4.0,
    avgPackage: 1800000,
    overview: "University School of ICT - Specialized in IT education",
    courses: "B.Tech in CSE, IT, ECE",
    placements: "Top recruiters: TCS, Infosys, Wipro, HCL.",
    reviews: {
      create: [
        { userName: "Meera D.", comment: "Good for IT and software courses. Affordable fees.", rating: 4.0 },
        { userName: "Suresh P.", comment: "Decent college with good industry connections.", rating: 3.5 }
      ]
    }
  },
  {
    name: "MAIT",
    location: "Delhi",
    fees: 150000,
    rating: 3.8,
    avgPackage: 1500000,
    overview: "Maharaja Agrasen Institute of Technology - Private engineering college",
    courses: "B.Tech in CSE, ECE, EE, Mechanical",
    placements: "Top recruiters: Accenture, Capgemini, IBM.",
    reviews: {
      create: [
        { userName: "Ankit R.", comment: "Average college but good for budget-conscious students.", rating: 3.5 },
        { userName: "Pooja S.", comment: "Faculty is helpful. Placement support is decent.", rating: 4.0 }
      ]
    }
  },
  {
    name: "JIIT",
    location: "Noida",
    fees: 200000,
    rating: 4.2,
    avgPackage: 2200000,
    overview: "Jaypee Institute of IT - Top private university in Noida",
    courses: "B.Tech in CSE, IT, ECE, Biotechnology",
    placements: "Top recruiters: Google, Microsoft, Amazon, Adobe.",
    reviews: {
      create: [
        { userName: "Vivek K.", comment: "Great campus and facilities. Good placement record.", rating: 4.5 },
        { userName: "Neha G.", comment: "One of the best private colleges in NCR.", rating: 4.0 }
      ]
    }
  },
  {
    name: "Amity",
    location: "Noida",
    fees: 250000,
    rating: 3.9,
    avgPackage: 1200000,
    overview: "Amity University - Large private university in Noida",
    courses: "B.Tech in CSE, ECE, EE, Civil, Mechanical",
    placements: "Top recruiters: Amazon, Google, Microsoft, Adobe.",
    reviews: {
      create: [
        { userName: "Ritu S.", comment: "Huge campus with lots of facilities. Fee is high though.", rating: 4.0 },
        { userName: "Manish T.", comment: "Good brand name but placements could be better.", rating: 3.5 }
      ]
    }
  },
  {
    name: "SRM",
    location: "Chennai",
    fees: 280000,
    rating: 4.0,
    avgPackage: 1400000,
    overview: "SRM University - Top private university in Chennai",
    courses: "B.Tech in CSE, IT, ECE, EE, Mechanical",
    placements: "Top recruiters: Amazon, Google, Microsoft, TCS.",
    reviews: {
      create: [
        { userName: "Karthik R.", comment: "Great infrastructure and faculty. South India's best private college.", rating: 4.5 },
        { userName: "Lakshmi P.", comment: "Good placements but the fee is quite high.", rating: 4.0 }
      ]
    }
  }
];

async function main() {
  console.log('🌱 Seeding started...');
  
  for (const collegeData of colleges) {
    const { reviews, ...collegeInfo } = collegeData;
    
    const result = await prisma.college.create({
      data: {
        ...collegeInfo,
        reviews: reviews || undefined
      },
    });
    console.log(`✅ Created: ${result.name} with ${reviews?.create?.length || 0} reviews`);
  }
  
  console.log('🎉 Seeding finished!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });