"use client"

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  likes: number;
  date: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Summer Wedding',
      description: 'Beautiful beach wedding photography session',
      imageUrl: 'https://source.unsplash.com/800x600/?wedding',
      category: 'Wedding',
      likes: 124,
      date: '2023-12-20'
    },
    {
      id: '2',
      title: 'Family Portrait',
      description: 'Outdoor family photoshoot in the park',
      imageUrl: 'https://source.unsplash.com/800x600/?family',
      category: 'Portrait',
      likes: 89,
      date: '2023-12-15'
    },
    {
      id: '3',
      title: 'Corporate Event',
      description: 'Annual tech conference coverage',
      imageUrl: 'https://source.unsplash.com/800x600/?corporate',
      category: 'Event',
      likes: 56,
      date: '2023-12-10'
    },
  ]);

  const [openUpload, setOpenUpload] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Nature', 'Architecture'];

  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const handleImageClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleMenuClose();
  };

  const filteredItems = portfolioItems.filter(item =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Typography variant="h4" className="text-secondary font-bold mb-2">
            My Portfolio
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Showcase your best work and attract more clients
          </Typography>
        </div>
        <Box className="flex gap-3">
          <Button
            variant="outlined"
            onClick={handleMenuClick}
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'accent',
              }
            }}
          >
            {selectedCategory} ▼
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenUpload}
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Add New Photo
          </Button>
        </Box>
      </Box>

      {/* Category Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: 'light',
            mt: 1,
          }
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            selected={category === selectedCategory}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'accent',
              },
              '&:hover': {
                bgcolor: 'accent',
              }
            }}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>

      {/* Portfolio Grid */}
      <Grid container spacing={4}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'accent',
                bgcolor: 'light',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 20px 25px -5px rgb(139 69 19 / 0.1)',
                  '& img': {
                    transform: 'scale(1.05)',
                  }
                },
              }}
              onClick={() => handleImageClick(item)}
            >
              <div style={{ 
                paddingTop: '75%', 
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </div>
              <CardContent className="flex-1 p-6">
                <Typography variant="h6" className="font-bold text-secondary mb-2">
                  {item.title}
                </Typography>
                <Box className="flex justify-between items-center mb-3">
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      bgcolor: 'primary',
                      color: 'light',
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="body2" className="text-gray-600">
                    ❤️ {item.likes}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  className="text-gray-600 line-clamp-2"
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upload Dialog */}
      <Dialog
        open={openUpload}
        onClose={handleCloseUpload}
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
            Add New Photo
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6">
          <Box className="space-y-4">
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary',
                  },
                },
              }}
            />
            <TextField
              select
              label="Category"
              fullWidth
              variant="outlined"
              defaultValue=""
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary',
                  },
                },
              }}
            >
              {categories.filter(cat => cat !== 'All').map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: '120px',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: 'primary',
                color: 'primary',
                '&:hover': {
                  borderColor: 'secondary',
                  bgcolor: 'accent',
                }
              }}
            >
              <div className="text-center">
                <Typography variant="body1" className="font-semibold mb-1">
                  Drop your image here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to browse
                </Typography>
              </div>
              <input
                type="file"
                hidden
                accept="image/*"
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button 
            onClick={handleCloseUpload} 
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
            onClick={handleCloseUpload}
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Detail Dialog */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={handleCloseDetail}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            bgcolor: 'light',
            overflow: 'hidden',
          }
        }}
      >
        {selectedItem && (
          <>
            <DialogContent className="p-0">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'cover',
                }}
              />
              <Box className="p-6">
                <Typography variant="h5" className="font-bold text-secondary mb-3">
                  {selectedItem.title}
                </Typography>
                <Box className="flex items-center gap-3 mb-4">
                  <Chip
                    label={selectedItem.category}
                    size="small"
                    sx={{
                      bgcolor: 'primary',
                      color: 'light',
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="body2" className="text-gray-600">
                    ❤️ {selectedItem.likes} likes
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    📅 {selectedItem.date}
                  </Typography>
                </Box>
                <Typography variant="body1" className="text-gray-600">
                  {selectedItem.description}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions className="border-t p-4 bg-accent">
              <Button 
                onClick={handleCloseDetail} 
                variant="outlined"
                sx={{
                  borderColor: 'secondary',
                  color: 'secondary',
                  '&:hover': {
                    borderColor: 'primary',
                    bgcolor: 'light',
                  }
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseDetail}
                sx={{
                  bgcolor: '#dc2626',
                  '&:hover': {
                    bgcolor: '#b91c1c',
                  }
                }}
              >
                Delete Photo
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Portfolio;
