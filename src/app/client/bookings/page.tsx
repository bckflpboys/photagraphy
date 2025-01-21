'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AccessTime, 
  LocationOn, 
  PhotoCamera, 
  AttachMoney,
  Message as MessageIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { Session } from '@/app/api/models/Session';
import { mockSessions } from '@/app/api/mockData';
import { Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

function BookingsContent() {
  const [bookings, setBookings] = React.useState<Session[]>(
    mockSessions.filter(session => session.currentClients.includes('John D.'))
  );
  const [activeTab, setActiveTab] = React.useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<Session | null>(null);
  const [cancellationReason, setCancellationReason] = React.useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCancelClick = (booking: Session) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    if (selectedBooking && cancellationReason) {
      // TODO: Implement actual cancellation API call
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== selectedBooking.id)
      );
      setCancelDialogOpen(false);
      setCancellationReason('');
      setSelectedBooking(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'finished':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 0) return booking.status === 'upcoming';
    if (activeTab === 1) return booking.status === 'active';
    return booking.status === 'finished';
  });

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">My Bookings</h1>
        <p className="text-lg text-gray-300">
          Manage your photography session bookings and appointments
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          className="bg-gray-800 rounded-lg p-1"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'var(--color-primary)',
            }
          }}
        >
          <Tab 
            label={
              <div className="flex items-center gap-2">
                <AccessTime className="w-4 h-4" />
                <span>Upcoming</span>
              </div>
            }
            className={activeTab === 0 ? 'text-primary' : 'text-gray-400'}
          />
          <Tab 
            label={
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Active</span>
              </div>
            }
            className={activeTab === 1 ? 'text-primary' : 'text-gray-400'}
          />
          <Tab 
            label={
              <div className="flex items-center gap-2">
                <PhotoCamera className="w-4 h-4" />
                <span>Past Sessions</span>
              </div>
            }
            className={activeTab === 2 ? 'text-primary' : 'text-gray-400'}
          />
        </Tabs>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6">
            <PhotoCamera className="w-full h-full text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Bookings Found</h3>
          <p className="text-gray-400">
            {activeTab === 0 
              ? "You don't have any upcoming photography sessions scheduled."
              : activeTab === 1
              ? "You don't have any active sessions at the moment."
              : "You haven't completed any photography sessions yet."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Booking Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {booking.type}
                      </h3>
                      <p className="text-gray-400">with {booking.photographerName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getStatusColor(booking.status)} bg-opacity-20 text-white`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <AccessTime className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(booking.startTime)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <LocationOn className="w-4 h-4 mr-2" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <AttachMoney className="w-4 h-4 mr-2" />
                        <span className="text-sm">${booking.price}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <PhotoCamera className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {booking.currentClients.length} client{booking.currentClients.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row md:flex-col justify-end gap-3">
                  {booking.status === 'upcoming' && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => handleCancelClick(booking)}
                      className="text-red-500 border-red-500 hover:bg-red-500/10"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    startIcon={<MessageIcon />}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Message
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Cancellation Dialog */}
      <Dialog 
        open={cancelDialogOpen} 
        onClose={() => setCancelDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <p className="mb-4">Are you sure you want to cancel this booking?</p>
          <TextField
            autoFocus
            label="Reason for cancellation"
            multiline
            rows={4}
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Keep Booking
          </Button>
          <Button 
            onClick={handleCancelConfirm}
            color="error"
            disabled={!cancellationReason}
          >
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function BookingsPage() {
  return (
    <DashboardLayout userType="client">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <BookingsContent />
        </div>
      </div>
    </DashboardLayout>
  );
}
