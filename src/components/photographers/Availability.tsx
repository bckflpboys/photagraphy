"use client"

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Settings as SettingsIcon,
  Event as EventIcon,
  Block as BlockIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

interface SessionType {
  id: string;
  name: string;
  duration: number;
  price: number;
  color: string;
  description: string;
}

interface BookingRule {
  minNotice: number;
  maxAdvance: number;
  depositRequired: boolean;
  depositAmount: number;
  cancellationHours: number;
}

const Availability: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openTimeSlotDialog, setOpenTimeSlotDialog] = useState(false);
  const [openSessionDialog, setOpenSessionDialog] = useState(false);
  const [openRulesDialog, setOpenRulesDialog] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample data
  const [workingHours] = useState<TimeSlot[]>([
    { day: 'Monday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'Tuesday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'Thursday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'Friday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'Saturday', startTime: '10:00', endTime: '15:00', available: true },
    { day: 'Sunday', startTime: '00:00', endTime: '00:00', available: false },
  ]);

  const [sessionTypes] = useState<SessionType[]>([
    {
      id: '1',
      name: 'Wedding Photography',
      duration: 480,
      price: 2000,
      color: '#4CAF50',
      description: 'Full day wedding photography coverage',
    },
    {
      id: '2',
      name: 'Portrait Session',
      duration: 60,
      price: 200,
      color: '#2196F3',
      description: 'Individual or family portrait session',
    },
    {
      id: '3',
      name: 'Event Coverage',
      duration: 240,
      price: 800,
      color: '#9C27B0',
      description: 'Corporate or special event photography',
    },
  ]);

  const [bookingRules] = useState<BookingRule>({
    minNotice: 48,
    maxAdvance: 180,
    depositRequired: true,
    depositAmount: 25,
    cancellationHours: 72,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setOpenTimeSlotDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Typography variant="h4" className="text-secondary font-bold mb-2">
            Availability Manager
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Set your working hours and manage booking preferences
          </Typography>
        </div>
        <Box className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => setOpenRulesDialog(true)}
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'accent',
              }
            }}
          >
            Booking Rules
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Card sx={{ 
        bgcolor: 'light',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'accent',
        mb: 4,
      }}>
        <CardContent>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Current Booking Rules
            </Typography>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => setOpenRulesDialog(true)}
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'accent',
                }
              }}
            >
              Edit Rules
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'white',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'accent',
              }}>
                <CardContent>
                  <Box className="flex items-center gap-2 mb-2">
                    <AccessTimeIcon color="primary" />
                    <Typography 
                      variant="subtitle1" 
                      className="font-semibold"
                      sx={{
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Notice Period
                    </Typography>
                  </Box>
                  <Typography variant="h5" className="text-primary font-bold mb-1">
                    {bookingRules.minNotice}h
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Minimum advance notice
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'white',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'accent',
              }}>
                <CardContent>
                  <Box className="flex items-center gap-2 mb-2">
                    <EventIcon color="primary" />
                    <Typography 
                      variant="subtitle1" 
                      className="font-semibold"
                      sx={{
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Advance Booking
                    </Typography>
                  </Box>
                  <Typography variant="h5" className="text-primary font-bold mb-1">
                    {bookingRules.maxAdvance}d
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Maximum days in advance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'white',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'accent',
              }}>
                <CardContent>
                  <Box className="flex items-center gap-2 mb-2">
                    <SaveIcon color="primary" />
                    <Typography 
                      variant="subtitle1" 
                      className="font-semibold"
                      sx={{
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Deposit
                    </Typography>
                  </Box>
                  <Typography variant="h5" className="text-primary font-bold mb-1">
                    {bookingRules.depositRequired ? `${bookingRules.depositAmount}%` : 'No'}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {bookingRules.depositRequired ? 'Required deposit' : 'No deposit required'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'white',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'accent',
              }}>
                <CardContent>
                  <Box className="flex items-center gap-2 mb-2">
                    <BlockIcon color="primary" />
                    <Typography 
                      variant="subtitle1" 
                      className="font-semibold"
                      sx={{
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Cancellation
                    </Typography>
                  </Box>
                  <Typography variant="h5" className="text-primary font-bold mb-1">
                    {bookingRules.cancellationHours}h
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Notice for cancellation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ 
        bgcolor: 'light',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'accent',
      }}>
        <CardContent>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 3,
            }}
          >
            <Tab 
              label="Calendar" 
              icon={<EventIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Working Hours" 
              icon={<AccessTimeIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Session Types" 
              icon={<LocationOnIcon />} 
              iconPosition="start"
            />
          </Tabs>

          {/* Calendar Tab */}
          {currentTab === 0 && (
            <div className="calendar-container" style={{ height: '700px' }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                dateClick={handleDateClick}
                eventContent={(eventInfo) => {
                  return (
                    <div className="p-1">
                      <div className="font-semibold">{eventInfo.event.title}</div>
                      <div className="text-sm">{eventInfo.timeText}</div>
                    </div>
                  )
                }}
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
              />
            </div>
          )}

          {/* Working Hours Tab */}
          {currentTab === 1 && (
            <Grid container spacing={4}>
              {workingHours.map((slot, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    bgcolor: slot.available ? 'light' : '#f5f5f5',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'accent',
                  }}>
                    <CardContent>
                      <Box className="flex justify-between items-center mb-3">
                        <Typography variant="h6" className="font-semibold">
                          {slot.day}
                        </Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={slot.available}
                              color="primary"
                            />
                          }
                          label="Available"
                        />
                      </Box>
                      {slot.available && (
                        <Box className="space-y-3">
                          <TextField
                            label="Start Time"
                            type="time"
                            value={slot.startTime}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="End Time"
                            type="time"
                            value={slot.endTime}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Session Types Tab */}
          {currentTab === 2 && (
            <div className="space-y-4">
              <Button
                variant="outlined"
                onClick={() => setOpenSessionDialog(true)}
                sx={{
                  borderColor: 'primary',
                  color: 'primary',
                  mb: 3,
                  '&:hover': {
                    borderColor: 'secondary',
                    bgcolor: 'accent',
                  }
                }}
              >
                Add New Session Type
              </Button>
              <Grid container spacing={4}>
                {sessionTypes.map((session) => (
                  <Grid item xs={12} sm={6} md={4} key={session.id}>
                    <Card sx={{ 
                      bgcolor: 'light',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'accent',
                    }}>
                      <CardContent>
                        <Box className="flex justify-between items-start mb-3">
                          <div>
                            <Typography variant="h6" className="font-semibold">
                              {session.name}
                            </Typography>
                            <Chip
                              label={`${session.duration} mins`}
                              size="small"
                              sx={{
                                bgcolor: session.color,
                                color: 'white',
                                mt: 1,
                              }}
                            />
                          </div>
                          <Typography variant="h6" className="font-bold text-primary">
                            ${session.price}
                          </Typography>
                        </Box>
                        <Typography variant="body2" className="text-gray-600 mb-3">
                          {session.description}
                        </Typography>
                        <Box className="flex justify-end gap-2">
                          <IconButton size="small" color="primary">
                            <SettingsIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Slot Dialog */}
      <Dialog
        open={openTimeSlotDialog}
        onClose={() => setOpenTimeSlotDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            bgcolor: 'light',
          }
        }}
      >
        <DialogTitle className="border-b bg-accent">
          <Typography variant="h6" className="font-bold text-secondary">
            Set Availability
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6 px-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className="mb-2">
                {selectedDate?.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'light',
                    px: 1,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'light',
                    px: 1,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability Status</InputLabel>
                <Select defaultValue="available">
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button
            onClick={() => setOpenTimeSlotDialog(false)}
            variant="outlined"
            sx={{
              borderColor: 'secondary',
              color: 'secondary',
              '&:hover': {
                borderColor: 'primary',
                bgcolor: 'accent',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Session Type Dialog */}
      <Dialog
        open={openSessionDialog}
        onClose={() => setOpenSessionDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            bgcolor: 'light',
          }
        }}
      >
        <DialogTitle className="border-b bg-accent">
          <Typography variant="h6" className="font-bold text-secondary">
            Add Session Type
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6 px-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Session Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (minutes)"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button
            onClick={() => setOpenSessionDialog(false)}
            variant="outlined"
            sx={{
              borderColor: 'secondary',
              color: 'secondary',
              '&:hover': {
                borderColor: 'primary',
                bgcolor: 'accent',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Add Session Type
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Rules Dialog */}
      <Dialog
        open={openRulesDialog}
        onClose={() => setOpenRulesDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            bgcolor: 'light',
          }
        }}
      >
        <DialogTitle className="border-b bg-accent">
          <Typography variant="h6" className="font-bold text-secondary">
            Booking Rules
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6 px-6">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Notice Period"
                type="number"
                fullWidth
                defaultValue={bookingRules.minNotice}
                helperText="Minimum hours required before booking"
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'light',
                    px: 1,
                    py: 0.5,
                    lineHeight: 1,
                    position: 'relative',
                    marginTop: '-8px'
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, 12px) scale(0.75)',
                    transformOrigin: 'top left',
                    backgroundColor: 'light',
                    padding: '0 8px',
                  }
                }}
                InputProps={{
                  endAdornment: <Typography color="text.secondary" variant="body2">hours</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Advance Booking"
                type="number"
                fullWidth
                defaultValue={bookingRules.maxAdvance}
                helperText="Maximum days allowed for advance booking"
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'light',
                    px: 1,
                    py: 0.5,
                    lineHeight: 1,
                    position: 'relative',
                    marginTop: '-8px'
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, 12px) scale(0.75)',
                    transformOrigin: 'top left',
                    backgroundColor: 'light',
                    padding: '0 8px',
                  }
                }}
                InputProps={{
                  endAdornment: <Typography color="text.secondary" variant="body2">days</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={bookingRules.depositRequired}
                    color="primary"
                  />
                }
                label="Require Deposit"
                sx={{ ml: 1 }}
              />
            </Grid>
            {bookingRules.depositRequired && (
              <Grid item xs={12}>
                <TextField
                  label="Deposit Amount (%)"
                  type="number"
                  fullWidth
                  defaultValue={bookingRules.depositAmount}
                  sx={{
                    '& .MuiInputLabel-root': {
                      backgroundColor: 'light',
                      px: 1,
                    }
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Cancellation Notice (hours)"
                type="number"
                fullWidth
                defaultValue={bookingRules.cancellationHours}
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'light',
                    px: 1,
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button
            onClick={() => setOpenRulesDialog(false)}
            variant="outlined"
            sx={{
              borderColor: 'secondary',
              color: 'secondary',
              '&:hover': {
                borderColor: 'primary',
                bgcolor: 'accent',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Save Rules
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Availability;
