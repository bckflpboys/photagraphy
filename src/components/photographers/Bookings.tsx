"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Box } from '@mui/material';

interface Booking {
  id: string;
  clientName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  location?: string;
  packageType?: string;
  price?: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'John Doe',
      date: '2024-01-15',
      time: '14:00',
      status: 'confirmed',
      location: 'Central Park, New York',
      packageType: 'Wedding Photography',
      price: '$500'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      date: '2024-01-22',
      time: '16:30',
      status: 'pending',
      location: 'Beach Resort, Miami',
      packageType: 'Family Portrait',
      price: '$200'
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string): { color: string; bgColor: string } => {
    switch(status) {
      case 'confirmed':
        return { color: '#1a8754', bgColor: '#d1e7dd' };
      case 'pending':
        return { color: '#997404', bgColor: '#fff3cd' };
      case 'cancelled':
        return { color: '#dc3545', bgColor: '#f8d7da' };
      default:
        return { color: '#6c757d', bgColor: '#e9ecef' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold">
          My Bookings
        </Typography>
        <Box className="space-x-2">
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            View Calendar
          </Button>
        </Box>
      </div>

      <Grid container spacing={3}>
        {bookings.map((booking) => {
          const statusStyle = getStatusColor(booking.status);
          return (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card 
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }
                }}
                onClick={() => handleBookingDetails(booking)}
              >
                <CardHeader 
                  title={
                    <Typography variant="h6" className="font-semibold">
                      {booking.clientName}
                    </Typography>
                  }
                  subheader={
                    <Box className="space-y-1 mt-1">
                      <Typography variant="body2" color="text.secondary">
                        📅 {booking.date} at {booking.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📍 {booking.location}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Box className="space-y-3">
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2" color="text.secondary">
                        {booking.packageType}
                      </Typography>
                      <Typography variant="h6" color="primary" className="font-semibold">
                        {booking.price}
                      </Typography>
                    </Box>
                    <Chip
                      label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      sx={{
                        bgcolor: statusStyle.bgColor,
                        color: statusStyle.color,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
          }
        }}
      >
        <DialogTitle className="border-b">
          <Typography variant="h6" className="font-bold">
            Booking Details
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-4">
          {selectedBooking && (
            <div className="space-y-4">
              <Box className="space-y-2">
                <Typography variant="subtitle2" color="text.secondary">
                  Client Information
                </Typography>
                <Typography variant="body1" className="font-semibold">
                  {selectedBooking.clientName}
                </Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="subtitle2" color="text.secondary">
                  Session Details
                </Typography>
                <Box className="space-y-1">
                  <Typography variant="body1">
                    📅 {selectedBooking.date} at {selectedBooking.time}
                  </Typography>
                  <Typography variant="body1">
                    📍 {selectedBooking.location}
                  </Typography>
                  <Typography variant="body1">
                    📸 {selectedBooking.packageType}
                  </Typography>
                </Box>
              </Box>

              <Box className="space-y-2">
                <Typography variant="subtitle2" color="text.secondary">
                  Payment
                </Typography>
                <Typography variant="h6" color="primary" className="font-semibold">
                  {selectedBooking.price}
                </Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  sx={{
                    bgcolor: getStatusColor(selectedBooking.status).bgColor,
                    color: getStatusColor(selectedBooking.status).color,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </div>
          )}
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button onClick={handleCloseDialog} variant="outlined" color="primary">
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleCloseDialog}
          >
            Contact Client
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bookings;
