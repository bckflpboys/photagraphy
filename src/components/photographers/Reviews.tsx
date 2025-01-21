"use client"

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Avatar,
  Chip,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: string;
  response?: string;
  status: 'published' | 'hidden' | 'reported';
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://source.unsplash.com/100x100/?portrait,woman',
      rating: 5,
      comment: 'Amazing photographer! Captured our wedding beautifully. Every shot was perfect and the attention to detail was incredible. Would highly recommend!',
      date: '2023-12-20',
      sessionType: 'Wedding',
      status: 'published'
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      clientAvatar: 'https://source.unsplash.com/100x100/?portrait,man',
      rating: 4,
      comment: 'Great family photoshoot experience. Professional and patient with the kids. The photos turned out wonderful.',
      date: '2023-12-15',
      sessionType: 'Family',
      response: 'Thank you for the kind words! It was a pleasure working with your family.',
      status: 'published'
    },
    {
      id: '3',
      clientName: 'Emma Davis',
      clientAvatar: 'https://source.unsplash.com/100x100/?portrait,girl',
      rating: 5,
      comment: 'Exceeded my expectations! The graduation photos were stunning and delivered on time.',
      date: '2023-12-10',
      sessionType: 'Portrait',
      status: 'published'
    }
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const handleOpenResponseDialog = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setOpenResponseDialog(true);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
    setSelectedReview(null);
    setResponseText('');
  };

  const handleSubmitResponse = () => {
    if (selectedReview) {
      setReviews(reviews.map(review =>
        review.id === selectedReview.id
          ? { ...review, response: responseText }
          : review
      ));
      handleCloseResponseDialog();
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    handleFilterClose();
  };

  const getStatusColor = (status: string): { color: string; bgColor: string } => {
    switch(status) {
      case 'published':
        return { color: '#1a8754', bgColor: '#d1e7dd' };
      case 'hidden':
        return { color: '#997404', bgColor: '#fff3cd' };
      case 'reported':
        return { color: '#dc3545', bgColor: '#f8d7da' };
      default:
        return { color: '#6c757d', bgColor: '#e9ecef' };
    }
  };

  const calculateStats = () => {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
    const ratingCounts = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return { totalReviews, averageRating, ratingCounts };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Typography variant="h4" className="text-secondary font-bold mb-2">
            Reviews & Ratings
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage your client reviews and maintain your reputation
          </Typography>
        </div>
        <Button
          variant="outlined"
          onClick={handleFilterClick}
          sx={{
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'accent',
            }
          }}
        >
          Filter: {selectedFilter} ▼
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'light',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'accent',
          }}>
            <CardContent className="text-center p-6">
              <Typography variant="h3" className="text-primary font-bold mb-2">
                {stats.averageRating.toFixed(1)}
              </Typography>
              <Rating value={stats.averageRating} readOnly precision={0.5} />
              <Typography variant="body2" className="text-gray-600 mt-2">
                Average Rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'light',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'accent',
          }}>
            <CardContent className="text-center p-6">
              <Typography variant="h3" className="text-primary font-bold mb-2">
                {stats.totalReviews}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total Reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'light',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'accent',
          }}>
            <CardContent className="text-center p-6">
              <Typography variant="h3" className="text-primary font-bold mb-2">
                {Object.entries(stats.ratingCounts)[0]?.[1] || 0}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                5-Star Reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            sx={{
              bgcolor: 'light',
              borderRadius: '16px',
              border: '1px solid',
              borderColor: 'accent',
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgb(139 69 19 / 0.1)',
              }
            }}
          >
            <CardContent className="p-6">
              <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                  <Box className="flex items-start gap-4">
                    <Avatar
                      src={review.clientAvatar}
                      sx={{ width: 48, height: 48 }}
                    />
                    <div className="flex-1">
                      <Box className="flex items-center gap-2 mb-1">
                        <Typography variant="h6" className="font-semibold">
                          {review.clientName}
                        </Typography>
                        <Chip
                          label={review.sessionType}
                          size="small"
                          sx={{
                            bgcolor: 'primary',
                            color: 'light',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="body1" className="mt-2 text-gray-800">
                        {review.comment}
                      </Typography>
                      {review.response && (
                        <Box className="mt-3 pl-4 border-l-4 border-accent">
                          <Typography variant="body2" className="text-gray-600 italic">
                            Your response: {review.response}
                          </Typography>
                        </Box>
                      )}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="flex flex-col gap-2 h-full justify-between">
                    <Box className="flex justify-end">
                      <Chip
                        label={review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(review.status).bgColor,
                          color: getStatusColor(review.status).color,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Box className="flex flex-col gap-2">
                      <Typography variant="body2" className="text-gray-600 text-right">
                        {review.date}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenResponseDialog(review)}
                        sx={{
                          borderColor: 'primary',
                          color: 'primary',
                          '&:hover': {
                            borderColor: 'secondary',
                            bgcolor: 'accent',
                          }
                        }}
                      >
                        {review.response ? 'Edit Response' : 'Respond'}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            bgcolor: 'light',
            mt: 1,
          }
        }}
      >
        {['All', 'Highest Rated', 'Lowest Rated', 'Recent', 'Pending Response'].map((filter) => (
          <MenuItem
            key={filter}
            onClick={() => handleFilterSelect(filter)}
            selected={filter === selectedFilter}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'accent',
              },
              '&:hover': {
                bgcolor: 'accent',
              }
            }}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>

      {/* Response Dialog */}
      <Dialog
        open={openResponseDialog}
        onClose={handleCloseResponseDialog}
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
            Respond to Review
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6">
          <Box className="space-y-4">
            {selectedReview && (
              <>
                <Box className="mb-4">
                  <Typography variant="body2" className="text-gray-600 mb-2">
                    Original Review:
                  </Typography>
                  <Typography variant="body1">
                    {selectedReview.comment}
                  </Typography>
                </Box>
                <TextField
                  label="Your Response"
                  multiline
                  rows={4}
                  fullWidth
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary',
                      },
                    },
                  }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button
            onClick={handleCloseResponseDialog}
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
            onClick={handleSubmitResponse}
            variant="contained"
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Reviews;
