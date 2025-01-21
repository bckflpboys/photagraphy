export interface Review {
  id: string;
  photographerId: string;
  photographer: {
    name: string;
    avatar: string;
    specialties: string[];
  };
  sessionType: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  photos: {
    id: string;
    url: string;
    caption: string;
  }[];
  likes: number;
  status: 'published' | 'draft' | 'pending';
  response?: {
    content: string;
    date: Date;
  };
}

export const mockReviews: Review[] = [
  {
    id: "1",
    photographerId: "photographer1",
    photographer: {
      name: "Sarah Johnson",
      avatar: "/photographers/sarah.jpg",
      specialties: ["Portrait", "Wedding", "Family"],
    },
    sessionType: "Family Portrait",
    rating: 5,
    title: "Amazing family photo session!",
    content: "Sarah was absolutely wonderful with our kids. She knew exactly how to make them comfortable and capture their genuine smiles. The photos turned out better than we could have imagined!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    photos: [
      {
        id: "1",
        url: "/reviews/family1.jpg",
        caption: "Family portrait in the park",
      },
      {
        id: "2",
        url: "/reviews/family2.jpg",
        caption: "Kids playing",
      },
    ],
    likes: 24,
    status: "published",
    response: {
      content: "Thank you so much for the kind words! It was a pleasure working with your beautiful family. I'm so glad you love the photos!",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    },
  },
  {
    id: "2",
    photographerId: "photographer2",
    photographer: {
      name: "Michael Chen",
      avatar: "/photographers/michael.jpg",
      specialties: ["Landscape", "Architecture", "Travel"],
    },
    sessionType: "Engagement Photos",
    rating: 4,
    title: "Beautiful engagement shoot",
    content: "Michael chose a perfect location for our engagement photos. His attention to detail and creative eye resulted in some stunning shots. Would definitely recommend!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    photos: [
      {
        id: "3",
        url: "/reviews/engagement1.jpg",
        caption: "Sunset engagement shot",
      },
    ],
    likes: 15,
    status: "published",
  },
  {
    id: "3",
    photographerId: "photographer3",
    photographer: {
      name: "Emma Davis",
      avatar: "/photographers/emma.jpg",
      specialties: ["Fashion", "Editorial", "Commercial"],
    },
    sessionType: "Professional Headshots",
    rating: 5,
    title: "Professional and efficient",
    content: "Emma made the headshot session so comfortable and efficient. She provided great direction and the final photos are perfect for my professional profiles.",
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    photos: [
      {
        id: "4",
        url: "/reviews/headshot1.jpg",
        caption: "Professional headshot",
      },
    ],
    likes: 3,
    status: "pending",
  },
  {
    id: "4",
    photographerId: "photographer4",
    photographer: {
      name: "David Wilson",
      avatar: "/photographers/david.jpg",
      specialties: ["Nature", "Wildlife", "Macro"],
    },
    sessionType: "Wedding Photography",
    rating: 5,
    title: "Captured our special day perfectly",
    content: "David and his team were incredible throughout our wedding day. They were professional, unobtrusive, and captured all the special moments we wanted. The photos tell the perfect story of our day.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
    photos: [
      {
        id: "5",
        url: "/reviews/wedding1.jpg",
        caption: "First dance",
      },
      {
        id: "6",
        url: "/reviews/wedding2.jpg",
        caption: "Ceremony",
      },
      {
        id: "7",
        url: "/reviews/wedding3.jpg",
        caption: "Family photos",
      },
    ],
    likes: 42,
    status: "published",
    response: {
      content: "It was an honor to be part of your special day! Thank you for choosing us to capture your beautiful wedding.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 29), // 29 days ago
    },
  },
];
