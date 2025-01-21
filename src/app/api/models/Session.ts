export interface Session {
  id: string;
  photographerName: string;
  location: string;
  startTime: Date;
  endTime: Date;
  price: number;
  currentClients: string[];
  status: 'active' | 'upcoming' | 'finished';
  type: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  sharePreference: boolean; // whether they're willing to share their session
  priceShare: number; // their portion of the total price
  bookingTime: Date;
}
