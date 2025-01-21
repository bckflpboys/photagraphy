export interface Photographer {
  id: string;
  name: string;
  profileImage: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  bio: string;
  availability: 'available' | 'busy' | 'away';
  portfolio: {
    id: string;
    imageUrl: string;
    caption: string;
  }[];
  badges: {
    type: 'verified' | 'featured' | 'pro' | 'top-rated';
    label: string;
  }[];
}

export const mockPhotographers: Photographer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    profileImage: '/photographers/sarah.jpg',
    specialties: ['Portrait', 'Wedding', 'Family'],
    location: 'New York, NY',
    rating: 4.9,
    reviewCount: 128,
    priceRange: '$150-300/hr',
    bio: 'Award-winning photographer specializing in capturing life\'s precious moments. Over 10 years of experience in wedding and portrait photography.',
    availability: 'available',
    portfolio: [
      { id: '1', imageUrl: '/portfolio/sarah-1.jpg', caption: 'Summer Wedding' },
      { id: '2', imageUrl: '/portfolio/sarah-2.jpg', caption: 'Family Portrait' },
      { id: '3', imageUrl: '/portfolio/sarah-3.jpg', caption: 'Engagement Session' }
    ],
    badges: [
      { type: 'verified', label: 'Verified' },
      { type: 'pro', label: 'Pro Photographer' }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    profileImage: '/photographers/michael.jpg',
    specialties: ['Landscape', 'Architecture', 'Travel'],
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 95,
    priceRange: '$200-400/hr',
    bio: 'Passionate about capturing the beauty of urban landscapes and architecture. Featured in National Geographic and Architectural Digest.',
    availability: 'busy',
    portfolio: [
      { id: '1', imageUrl: '/portfolio/michael-1.jpg', caption: 'Golden Gate Bridge' },
      { id: '2', imageUrl: '/portfolio/michael-2.jpg', caption: 'Downtown SF' },
      { id: '3', imageUrl: '/portfolio/michael-3.jpg', caption: 'Coastal Highway' }
    ],
    badges: [
      { type: 'featured', label: 'Featured Artist' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  },
  {
    id: '3',
    name: 'Emma Davis',
    profileImage: '/photographers/emma.jpg',
    specialties: ['Fashion', 'Editorial', 'Commercial'],
    location: 'Los Angeles, CA',
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$300-600/hr',
    bio: 'Fashion photographer with a modern aesthetic. Worked with major brands and featured in Vogue, Elle, and Harper\'s Bazaar.',
    availability: 'available',
    portfolio: [
      { id: '1', imageUrl: '/portfolio/emma-1.jpg', caption: 'Summer Collection' },
      { id: '2', imageUrl: '/portfolio/emma-2.jpg', caption: 'Editorial Shoot' },
      { id: '3', imageUrl: '/portfolio/emma-3.jpg', caption: 'Brand Campaign' }
    ],
    badges: [
      { type: 'verified', label: 'Verified' },
      { type: 'featured', label: 'Featured Artist' }
    ]
  },
  {
    id: '4',
    name: 'David Wilson',
    profileImage: '/photographers/david.jpg',
    specialties: ['Nature', 'Wildlife', 'Macro'],
    location: 'Seattle, WA',
    rating: 4.9,
    reviewCount: 82,
    priceRange: '$175-350/hr',
    bio: 'Nature enthusiast specializing in wildlife photography. Published in National Geographic and winner of multiple nature photography awards.',
    availability: 'away',
    portfolio: [
      { id: '1', imageUrl: '/portfolio/david-1.jpg', caption: 'Mountain Wildlife' },
      { id: '2', imageUrl: '/portfolio/david-2.jpg', caption: 'Forest Life' },
      { id: '3', imageUrl: '/portfolio/david-3.jpg', caption: 'Macro Nature' }
    ],
    badges: [
      { type: 'pro', label: 'Pro Photographer' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  },
  {
    id: '5',
    name: 'Sofia Rodriguez',
    profileImage: '/photographers/sofia.jpg',
    specialties: ['Event', 'Concert', 'Corporate'],
    location: 'Miami, FL',
    rating: 4.8,
    reviewCount: 143,
    priceRange: '$200-450/hr',
    bio: 'Event photographer with an eye for capturing authentic moments. Extensive experience in corporate events and music festivals.',
    availability: 'available',
    portfolio: [
      { id: '1', imageUrl: '/portfolio/sofia-1.jpg', caption: 'Music Festival' },
      { id: '2', imageUrl: '/portfolio/sofia-2.jpg', caption: 'Corporate Event' },
      { id: '3', imageUrl: '/portfolio/sofia-3.jpg', caption: 'Award Ceremony' }
    ],
    badges: [
      { type: 'verified', label: 'Verified' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  }
];
