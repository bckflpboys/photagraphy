'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockReviews, type Review } from '@/app/api/mockReviews';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ThumbUp as ThumbUpIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Chip,
  TextField,
  Tab,
  Tabs,
} from '@mui/material';

interface ReviewCardProps {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (review: Review) => void;
}

function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(review);
  };

  const handleDelete = () => {
    handleMenuClose();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete(review);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
    >
      {/* Photographer Info */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={review.photographer.avatar}
            alt={review.photographer.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-white">{review.photographer.name}</h3>
            <span className="text-sm text-gray-400">{review.sessionType}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Chip
            label={review.status}
            size="small"
            className={`${
              review.status === 'published'
                ? 'bg-green-500'
                : review.status === 'pending'
                ? 'bg-yellow-500'
                : 'bg-gray-500'
            } text-white`}
          />
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVertIcon className="text-gray-400" />
          </IconButton>
        </div>
      </div>

      {/* Review Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Rating value={review.rating} readOnly />
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(review.date, { addSuffix: true })}
          </span>
        </div>

        <h4 className="text-lg font-medium text-white mb-2">{review.title}</h4>
        
        <p className={`text-gray-300 ${!expanded && 'line-clamp-3'}`}>
          {review.content}
        </p>
        {review.content.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary text-sm mt-1"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Review Photos */}
        {review.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {review.photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Photographer's Response */}
        {review.response && (
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Image
                src={review.photographer.avatar}
                alt={review.photographer.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-white">
                Response from {review.photographer.name}
              </span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(review.response.date, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-300">{review.response.content}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <Button
            startIcon={<ThumbUpIcon />}
            variant="text"
            className="text-gray-400 hover:text-primary"
          >
            {review.likes} Likes
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              startIcon={<EditIcon />}
              variant="text"
              className="text-gray-400 hover:text-primary"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="text"
              className="text-gray-400 hover:text-red-500"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon className="mr-2" /> Edit Review
        </MenuItem>
        <MenuItem onClick={handleDelete} className="text-red-500">
          <DeleteIcon className="mr-2" /> Delete Review
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        PaperProps={{
          className: 'bg-gray-800 text-white',
        }}
      >
        <DialogTitle>Delete Review?</DialogTitle>
        <DialogContent>
          <p className="text-gray-300">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            className="text-gray-400"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            className="text-red-500"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

function ReviewsContent() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [reviews, setReviews] = React.useState(mockReviews);

  const filteredReviews = React.useMemo(() => {
    switch (activeTab) {
      case 0: // All
        return reviews;
      case 1: // Published
        return reviews.filter((review) => review.status === 'published');
      case 2: // Pending
        return reviews.filter((review) => review.status === 'pending');
      case 3: // Draft
        return reviews.filter((review) => review.status === 'draft');
      default:
        return reviews;
    }
  }, [activeTab, reviews]);

  const handleEdit = (review: Review) => {
    // Handle edit
    console.log('Edit review:', review);
  };

  const handleDelete = (review: Review) => {
    setReviews(reviews.filter((r) => r.id !== review.id));
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">My Reviews</h1>
        <p className="text-lg text-gray-300">
          Manage your photography session reviews
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className="mb-6"
        TabIndicatorProps={{
          className: 'bg-primary',
        }}
      >
        <Tab
          label={`All (${reviews.length})`}
          className={activeTab === 0 ? 'text-primary' : 'text-gray-400'}
        />
        <Tab
          label={`Published (${
            reviews.filter((r) => r.status === 'published').length
          })`}
          className={activeTab === 1 ? 'text-primary' : 'text-gray-400'}
        />
        <Tab
          label={`Pending (${
            reviews.filter((r) => r.status === 'pending').length
          })`}
          className={activeTab === 2 ? 'text-primary' : 'text-gray-400'}
        />
        <Tab
          label={`Draft (${reviews.filter((r) => r.status === 'draft').length})`}
          className={activeTab === 3 ? 'text-primary' : 'text-gray-400'}
        />
      </Tabs>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6">
            <StarIcon className="w-full h-full text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Reviews Yet</h3>
          <p className="text-gray-400">
            You haven't written any reviews for your photography sessions yet.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <DashboardLayout userType="client">
      <ReviewsContent />
    </DashboardLayout>
  );
}
