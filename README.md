# CaptureConnect - Photography Booking Platform

CaptureConnect is a modern web platform that connects photographers with clients, making it easy to discover, book, and manage photography services.

## 🌟 Features

### For Clients
- **Find Photographers**: Search and filter photographers based on location, specialty, price range, and availability
- **Real-time Availability**: See which photographers are currently active and available
- **Booking Management**: Easily schedule, manage, and track photography sessions
- **Reviews & Ratings**: Access and manage your reviews for photography sessions
- **Messaging System**: Direct communication with photographers
- **Favorites**: Save and manage your favorite photographers
- **Dashboard**: Comprehensive dashboard to manage all your photography needs

### For Photographers
- **Professional Profile**: Showcase your work and services with a customized profile
- **Booking Management**: Handle client bookings and manage your schedule
- **Real-time Status**: Show your availability status to potential clients
- **Analytics Dashboard**: Track earnings, reviews, and profile views
- **Message Center**: Communicate with clients directly through the platform
- **Review Management**: Respond to client reviews and maintain your reputation

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- A Clerk account for authentication
- Google Maps API key (for location features)

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/captureconnect.git
cd captureconnect
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with Material-UI components
- **Authentication**: Clerk
- **Maps**: Google Maps API
- **State Management**: React Context
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Type Safety**: TypeScript

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes and mock data
│   ├── client/            # Client-specific pages
│   │   ├── bookings/     # Booking management
│   │   ├── favorites/    # Favorite photographers
│   │   ├── messages/     # Messaging center
│   │   └── reviews/      # Review management
│   ├── photographer/      # Photographer-specific pages
│   ├── photographers/     # Photographer search & listing
│   └── share/            # Public sharing pages
├── components/            # Reusable components
│   ├── dashboard/        # Dashboard components
│   ├── photographers/    # Photographer-related components
│   └── ui/              # Common UI components
├── contexts/             # React contexts
├── hooks/               # Custom hooks
└── lib/                # Utility functions and configurations
```

## 🔒 Authentication Flow

1. Users can sign up as either a client or photographer
2. User type is stored in Clerk's public metadata
3. Protected routes ensure users can only access their respective dashboards
4. Session management and user data are handled by Clerk

## 🎯 Key Features Implementation

### Client Dashboard
- **Bookings Management**
  - View and manage upcoming, active, and past sessions
  - Cancel bookings with reason tracking
  - Session details with photographer info
  
- **Messaging System**
  - Real-time chat with photographers
  - File and image sharing
  - Message status tracking (sent, delivered, read)
  - Conversation management
  
- **Reviews System**
  - Create and manage reviews for sessions
  - Rate photographers and share experiences
  - Upload photos with reviews
  - View photographer responses
  
- **Favorites**
  - Save favorite photographers
  - Quick access to photographer profiles
  - Filter and sort favorites

### Search System
- Real-time search with debouncing
- Multiple filter options (price, specialty, availability)
- Sort functionality
- Responsive design

### Session Sharing
- Public session links
- Session status tracking
- Real-time updates

## 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Optimized images and assets

## 🔄 State Management
- React Context for global state
- Local state for component-specific data
- Optimized re-renders
- Type-safe state management

## 🎨 Styling Architecture
- Tailwind CSS for utility-first styling
- Material-UI components for complex UI elements
- Custom theme configuration
- Dark mode support
- Consistent color scheme and typography

## 🚀 Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized bundle size
- Caching strategies
- SEO optimization

## 🧪 Testing
- Jest for unit tests
- React Testing Library for component tests
- E2E testing with Cypress
- API testing

## 📈 Future Enhancements
- Real-time notifications
- Payment integration
- Calendar synchronization
- Advanced analytics
- Mobile app development

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details
