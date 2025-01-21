import { Session } from './models/Session';

const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();

// Helper function to create dates relative to current time
const createDate = (dayOffset: number, hourOffset: number = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours + hourOffset, minutes);
  return date;
};

export const mockSessions: Session[] = [
  // Active Sessions
  {
    id: '1',
    photographerName: 'Sarah Johnson',
    location: 'Central Park, NY',
    startTime: createDate(0, -1), // Started 1 hour ago
    endTime: createDate(0, 1), // Ends in 1 hour
    price: 150,
    currentClients: ['John D.', 'Mary S.'],
    status: 'active',
    type: 'Nature Photography'
  },
  {
    id: '2',
    photographerName: 'Michael Chen',
    location: 'Venice Beach, LA',
    startTime: createDate(0, -2),
    endTime: createDate(0, 2),
    price: 200,
    currentClients: ['Alice B.'],
    status: 'active',
    type: 'Beach Photography'
  },
  {
    id: '3',
    photographerName: 'Emma Davis',
    location: 'Downtown Studio',
    startTime: createDate(0, -0.5),
    endTime: createDate(0, 1.5),
    price: 175,
    currentClients: ['Tom H.', 'Lisa M.', 'James P.'],
    status: 'active',
    type: 'Portrait Session'
  },

  // Upcoming Sessions
  {
    id: '4',
    photographerName: 'David Wilson',
    location: 'Botanical Gardens',
    startTime: createDate(1, 2), // Tomorrow
    endTime: createDate(1, 4),
    price: 180,
    currentClients: [],
    status: 'upcoming',
    type: 'Wedding Photography'
  },
  {
    id: '5',
    photographerName: 'Jessica Lee',
    location: 'City Waterfront',
    startTime: createDate(2), // Day after tomorrow
    endTime: createDate(2, 3),
    price: 160,
    currentClients: ['Robert K.'],
    status: 'upcoming',
    type: 'Sunset Session'
  },
  {
    id: '6',
    photographerName: 'Marcus Brown',
    location: 'Historic District',
    startTime: createDate(3),
    endTime: createDate(3, 2),
    price: 190,
    currentClients: [],
    status: 'upcoming',
    type: 'Architecture Photography'
  },

  // Finished Sessions
  {
    id: '7',
    photographerName: 'Anna Martinez',
    location: 'Mountain View Park',
    startTime: createDate(-1, -3), // Yesterday
    endTime: createDate(-1, -1),
    price: 140,
    currentClients: ['Chris B.', 'Diana F.'],
    status: 'finished',
    type: 'Family Portraits'
  },
  {
    id: '8',
    photographerName: 'Thomas Wright',
    location: 'Beach Sunset Point',
    startTime: createDate(-2, -4),
    endTime: createDate(-2, -2),
    price: 220,
    currentClients: ['Sarah M.', 'Mike R.', 'Emily T.'],
    status: 'finished',
    type: 'Golden Hour Session'
  },
  {
    id: '9',
    photographerName: 'Olivia Taylor',
    location: 'Urban Streets',
    startTime: createDate(-3, -2),
    endTime: createDate(-3, 0),
    price: 165,
    currentClients: ['Peter L.'],
    status: 'finished',
    type: 'Street Photography'
  }
];
