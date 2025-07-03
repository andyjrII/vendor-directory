import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient();

const vendors = [
  {
    name: 'Lagos Hair Palace',
    location: 'Victoria Island, Lagos',
    specialty: 'Brazilian Hair',
    verified: true,
    rating: 4.2,
    totalReviews: 15,
  },
  {
    name: 'Abuja Curls & Coils',
    location: 'Garki, Abuja',
    specialty: 'Natural Hair Wigs',
    verified: false,
    rating: 3.8,
    totalReviews: 8,
  },
  {
    name: 'Port Harcourt Weave Lounge',
    location: 'Port Harcourt, Rivers',
    specialty: 'Peruvian Hair',
    verified: true,
    rating: 4.7,
    totalReviews: 22,
  },
  {
    name: 'Benin City Glam Locks',
    location: 'GRA, Benin City',
    specialty: 'Dreadlock Styling',
    verified: true,
    rating: 4.0,
    totalReviews: 10,
  },
  {
    name: 'Kano Hair Haven',
    location: 'Nassarawa, Kano',
    specialty: 'Cornrow Braids',
    verified: false,
    rating: 3.9,
    totalReviews: 6,
  },
  {
    name: 'Ibadan Luxe Tresses',
    location: 'Ring Road, Ibadan',
    specialty: 'Lace Front Wigs',
    verified: true,
    rating: 4.5,
    totalReviews: 18,
  },
  {
    name: 'Enugu Hair Lounge',
    location: 'Independence Layout, Enugu',
    specialty: 'Closure Wigs',
    verified: true,
    rating: 4.1,
    totalReviews: 13,
  },
  {
    name: 'Calabar Curl Boutique',
    location: 'Marian Road, Calabar',
    specialty: 'Curly Hair Extensions',
    verified: false,
    rating: 3.7,
    totalReviews: 7,
  },
  {
    name: 'Jos Hair Studio',
    location: 'Rayfield, Jos',
    specialty: 'Relaxed Hair Styling',
    verified: true,
    rating: 4.3,
    totalReviews: 12,
  },
  {
    name: 'Warri Hair Stop',
    location: 'Airport Road, Warri',
    specialty: 'Frontal Installations',
    verified: false,
    rating: 3.6,
    totalReviews: 5,
  },
  {
    name: 'Uyo Silky Strands',
    location: 'Ewet Housing, Uyo',
    specialty: 'Vietnamese Hair',
    verified: true,
    rating: 4.4,
    totalReviews: 14,
  },
  {
    name: 'Abeokuta Hair Queens',
    location: 'Ibara, Abeokuta',
    specialty: 'Bob Cut Wigs',
    verified: false,
    rating: 3.5,
    totalReviews: 4,
  },
  {
    name: 'Osogbo Braids & More',
    location: 'Oke Fia, Osogbo',
    specialty: 'Twist Braids',
    verified: true,
    rating: 4.0,
    totalReviews: 9,
  },
  {
    name: 'Asaba Wave Studio',
    location: 'Summit Road, Asaba',
    specialty: 'Loose Wave Bundles',
    verified: true,
    rating: 4.6,
    totalReviews: 17,
  },
  {
    name: 'Owerri Shear Beauty',
    location: 'Ikenegbu, Owerri',
    specialty: 'Pixie Cuts',
    verified: false,
    rating: 3.8,
    totalReviews: 6,
  },
  {
    name: 'Ilorin Hair Boutique',
    location: 'Tanke, Ilorin',
    specialty: 'Straight Hair Bundles',
    verified: true,
    rating: 4.2,
    totalReviews: 11,
  },
  {
    name: 'Makurdi Crown & Co.',
    location: 'High Level, Makurdi',
    specialty: 'Lace Closure Installs',
    verified: false,
    rating: 3.9,
    totalReviews: 5,
  },
  {
    name: 'Akure Hair Lab',
    location: 'Alagbaka, Akure',
    specialty: 'Deep Wave Hair',
    verified: true,
    rating: 4.3,
    totalReviews: 10,
  },
  {
    name: 'Yola Elegant Locks',
    location: 'Jimeta, Yola',
    specialty: 'Afro Wigs',
    verified: false,
    rating: 3.6,
    totalReviews: 3,
  },
  {
    name: 'Sokoto Hair Studio',
    location: 'Old Market Road, Sokoto',
    specialty: 'Kinky Hair Extensions',
    verified: true,
    rating: 4.1,
    totalReviews: 8,
  },
];

async function main() {
  console.log('Seeding vendors...');
  for (const vendor of vendors) {
    await prisma.vendor.create({ data: vendor });
  }
  console.log('Seeding complete.');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
