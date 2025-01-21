export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar: string;
    type: 'client' | 'photographer';
  };
  receiver: {
    id: string;
    name: string;
    avatar: string;
    type: 'client' | 'photographer';
  };
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    type: 'client' | 'photographer';
  }[];
  lastMessage: Message;
  unreadCount: number;
  status: 'active' | 'archived';
}

const currentUser = {
  id: 'client1',
  name: 'John Doe',
  avatar: '/avatars/john.jpg',
  type: 'client' as const,
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [
      currentUser,
      {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
    ],
    lastMessage: {
      id: 'msg1',
      content: "Perfect! I'll see you at Central Park tomorrow at 2 PM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      sender: {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'read',
    },
    unreadCount: 0,
    status: 'active',
  },
  {
    id: 'conv2',
    participants: [
      currentUser,
      {
        id: 'photographer2',
        name: 'Michael Chen',
        avatar: '/photographers/michael.jpg',
        type: 'photographer',
      },
    ],
    lastMessage: {
      id: 'msg2',
      content: "Hi John! I'd love to discuss your wedding photography needs. When would be a good time to chat?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      sender: {
        id: 'photographer2',
        name: 'Michael Chen',
        avatar: '/photographers/michael.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'delivered',
    },
    unreadCount: 1,
    status: 'active',
  },
  {
    id: 'conv3',
    participants: [
      currentUser,
      {
        id: 'photographer3',
        name: 'Emma Davis',
        avatar: '/photographers/emma.jpg',
        type: 'photographer',
      },
    ],
    lastMessage: {
      id: 'msg3',
      content: 'Here are the edited photos from our session!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      sender: {
        id: 'photographer3',
        name: 'Emma Davis',
        avatar: '/photographers/emma.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'read',
      attachments: [
        {
          type: 'image',
          url: '/photos/session1.jpg',
          name: 'Family_Photo_1.jpg',
        },
        {
          type: 'image',
          url: '/photos/session2.jpg',
          name: 'Family_Photo_2.jpg',
        },
      ],
    },
    unreadCount: 0,
    status: 'active',
  },
];

export const mockMessages: { [key: string]: Message[] } = {
  conv1: [
    {
      id: 'msg1_1',
      content: "Hi Sarah! I'm interested in booking a portrait session.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      sender: currentUser,
      receiver: {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
      status: 'read',
    },
    {
      id: 'msg1_2',
      content: "Hello John! That's great to hear. I have availability this weekend. Would you prefer indoor or outdoor shots?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      sender: {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'read',
    },
    {
      id: 'msg1_3',
      content: "I'd love to do an outdoor session if the weather permits!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      sender: currentUser,
      receiver: {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
      status: 'read',
    },
    {
      id: 'msg1_4',
      content: "Perfect! I'll see you at Central Park tomorrow at 2 PM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      sender: {
        id: 'photographer1',
        name: 'Sarah Johnson',
        avatar: '/photographers/sarah.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'read',
    },
  ],
  conv2: [
    {
      id: 'msg2_1',
      content: "Hi Michael! I saw your wedding portfolio and it's exactly what we're looking for.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      sender: currentUser,
      receiver: {
        id: 'photographer2',
        name: 'Michael Chen',
        avatar: '/photographers/michael.jpg',
        type: 'photographer',
      },
      status: 'read',
    },
    {
      id: 'msg2_2',
      content: "Hi John! I'd love to discuss your wedding photography needs. When would be a good time to chat?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      sender: {
        id: 'photographer2',
        name: 'Michael Chen',
        avatar: '/photographers/michael.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'delivered',
    },
  ],
  conv3: [
    {
      id: 'msg3_1',
      content: 'Here are the edited photos from our session!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      sender: {
        id: 'photographer3',
        name: 'Emma Davis',
        avatar: '/photographers/emma.jpg',
        type: 'photographer',
      },
      receiver: currentUser,
      status: 'read',
      attachments: [
        {
          type: 'image',
          url: '/photos/session1.jpg',
          name: 'Family_Photo_1.jpg',
        },
        {
          type: 'image',
          url: '/photos/session2.jpg',
          name: 'Family_Photo_2.jpg',
        },
      ],
    },
  ],
};
