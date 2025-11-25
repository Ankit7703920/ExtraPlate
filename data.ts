import { addHours, addMinutes, subHours } from 'date-fns';
import type { User, Donation, Bhandara, Claim } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return {
        imageUrl: `https://picsum.photos/seed/${id}/600/400`,
        imageHint: "placeholder image"
    }
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

export const users: User[] = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', ...findImage('user-1'), collegeId: 'C123' },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul@example.com', ...findImage('user-2') },
  { id: 'u3', name: 'Anjali Mehta', email: 'anjali@example.com', ...findImage('user-3'), collegeId: 'C123' },
];

export const donations: Donation[] = [
  {
    id: 'd1',
    title: '5 Plates of Chicken Biryani',
    description: 'Generous portion of flavorful chicken biryani, cooked today for a small party. Good for 5-6 people.',
    plates: 5,
    ...findImage('food-1'),
    category: 'Non-Veg',
    distance: 1.2,
    location: { address: 'Hostel Block A, near canteen' },
    expiry: addHours(new Date(), 2),
    visibility: 'College',
    donor: users[0],
    status: 'Available',
    createdAt: subHours(new Date(), 1),
  },
  {
    id: 'd2',
    title: 'Fresh Home-cooked Veg Thali',
    description: 'Complete meal with 2 rotis, sabzi, dal, and rice. Very healthy and fresh.',
    plates: 2,
    ...findImage('food-2'),
    category: 'Veg',
    distance: 2.5,
    location: { address: 'Gate No. 3, Civil Lines' },
    expiry: addHours(new Date(), 1),
    visibility: 'Public',
    donor: users[1],
    status: 'Available',
    createdAt: subHours(new Date(), 2),
  },
  {
    id: 'd3',
    title: 'Assorted Sweets Box',
    description: 'Leftover from a festival, includes ladoo, barfi, and gulab jamun. Barely touched.',
    plates: 10,
    ...findImage('food-3'),
    category: 'Veg',
    distance: 0.8,
    location: { address: 'Library Reading Hall' },
    expiry: addHours(new Date(), 24),
    visibility: 'College',
    donor: users[2],
    status: 'Claimed',
    createdAt: subHours(new Date(), 22),
  },
  {
    id: 'd4',
    title: 'Leftover Pizza',
    description: '4 slices of Dominos veg pizza from last night. Still good if heated up.',
    plates: 4,
    ...findImage('food-4'),
    category: 'Veg',
    distance: 3.1,
    location: { address: 'Kamla Nagar Market' },
    expiry: subHours(new Date(), 1),
    visibility: 'Public',
    donor: users[0],
    status: 'Expired',
    createdAt: subHours(new Date(), 12),
  },
    {
    id: 'd5',
    title: 'Idli Sambar for breakfast',
    description: '3 pieces of fresh idli with hot sambar and coconut chutney. Prepared this morning.',
    plates: 1,
    ...findImage('food-5'),
    category: 'Veg',
    distance: 0.5,
    location: { address: 'Department of Computer Science' },
    expiry: addHours(new Date(), 3),
    visibility: 'College',
    donor: users[2],
    status: 'Available',
    createdAt: subHours(new Date(), 1),
  },
];

export const bhandaras: Bhandara[] = [
    {
        id: 'b1',
        title: 'Guru ka Langar',
        description: 'All are welcome to the weekly langar service. Serving dal, roti, and kheer.',
        ...findImage('bhandara-1'),
        location: { address: 'Gurudwara Singh Sabha, Mukherjee Nagar' },
        startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
        endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
        organizer: users[1],
        distance: 4.2
    },
    {
        id: 'b2',
        title: 'Temple Prasad Vitran',
        description: 'Prasad will be distributed after the evening aarti. Poori, aloo sabzi, and halwa will be served.',
        ...findImage('bhandara-2'),
        location: { address: 'Hanuman Mandir, Connaught Place' },
        startTime: new Date(new Date().setDate(new Date().getDate() + 2)),
        endTime: new Date(new Date().setDate(new Date().getDate() + 2)),
        organizer: users[0],
        distance: 8.5
    },
];

export const claims: Claim[] = [
    {
        id: 'c1',
        donation: donations[2],
        user: users[0],
        claimedAt: addMinutes(donations[2].createdAt, 30),
        status: 'Picked Up'
    }
];

export const currentUser = users[0];
