"use client"

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Download as DownloadIcon } from '@mui/icons-material';

interface Transaction {
  id: string;
  date: string;
  client: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'booking' | 'tip' | 'refund';
  description: string;
}

interface EarningsData {
  month: string;
  earnings: number;
  bookings: number;
}

const monthlyData: EarningsData[] = [
  { month: 'Jan', earnings: 2500, bookings: 5 },
  { month: 'Feb', earnings: 3200, bookings: 7 },
  { month: 'Mar', earnings: 2800, bookings: 6 },
  { month: 'Apr', earnings: 3800, bookings: 8 },
  { month: 'May', earnings: 4200, bookings: 9 },
  { month: 'Jun', earnings: 3600, bookings: 7 },
  { month: 'Jul', earnings: 4800, bookings: 10 },
  { month: 'Aug', earnings: 5200, bookings: 11 },
  { month: 'Sep', earnings: 4600, bookings: 9 },
  { month: 'Oct', earnings: 5000, bookings: 10 },
  { month: 'Nov', earnings: 5500, bookings: 12 },
  { month: 'Dec', earnings: 6000, bookings: 13 },
];

const Earnings: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2023-12-20',
      client: 'Sarah Johnson',
      amount: 1200,
      status: 'completed',
      type: 'booking',
      description: 'Wedding Photography Package',
    },
    {
      id: '2',
      date: '2023-12-15',
      client: 'Michael Chen',
      amount: 300,
      status: 'completed',
      type: 'tip',
      description: 'Additional tip for great service',
    },
    {
      id: '3',
      date: '2023-12-10',
      client: 'Emma Davis',
      amount: 500,
      status: 'pending',
      type: 'booking',
      description: 'Family Portrait Session',
    },
  ]);

  const [periodAnchorEl, setPeriodAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('This Month');
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const handlePeriodClick = (event: React.MouseEvent<HTMLElement>) => {
    setPeriodAnchorEl(event.currentTarget);
  };

  const handlePeriodClose = () => {
    setPeriodAnchorEl(null);
  };

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    handlePeriodClose();
  };

  const getStatusColor = (status: string): { color: string; bgColor: string } => {
    switch(status) {
      case 'completed':
        return { color: '#1a8754', bgColor: '#d1e7dd' };
      case 'pending':
        return { color: '#997404', bgColor: '#fff3cd' };
      case 'failed':
        return { color: '#dc3545', bgColor: '#f8d7da' };
      default:
        return { color: '#6c757d', bgColor: '#e9ecef' };
    }
  };

  const getTypeColor = (type: string): { color: string; bgColor: string } => {
    switch(type) {
      case 'booking':
        return { color: '#8B4513', bgColor: '#D7CCC8' };
      case 'tip':
        return { color: '#1a8754', bgColor: '#d1e7dd' };
      case 'refund':
        return { color: '#dc3545', bgColor: '#f8d7da' };
      default:
        return { color: '#6c757d', bgColor: '#e9ecef' };
    }
  };

  const calculateStats = () => {
    const totalEarnings = transactions
      .filter(t => t.status === 'completed')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const pendingAmount = transactions
      .filter(t => t.status === 'pending')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const completedBookings = transactions
      .filter(t => t.status === 'completed' && t.type === 'booking')
      .length;

    return { totalEarnings, pendingAmount, completedBookings };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Typography variant="h4" className="text-secondary font-bold mb-2">
            Earnings & Analytics
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Track your earnings and financial performance
          </Typography>
        </div>
        <Box className="flex gap-3">
          <Button
            variant="outlined"
            onClick={handlePeriodClick}
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'accent',
              }
            }}
          >
            {selectedPeriod} ▼
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenExportDialog(true)}
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: 'primary',
              color: 'light',
              '&:hover': {
                bgcolor: 'secondary',
              }
            }}
          >
            Export
          </Button>
        </Box>
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
                ${stats.totalEarnings}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total Earnings
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
                ${stats.pendingAmount}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Pending Amount
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
                {stats.completedBookings}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Completed Bookings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            bgcolor: 'light',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'accent',
            p: 3,
          }}>
            <Typography variant="h6" className="font-semibold mb-4">
              Monthly Earnings
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F5F5F5',
                      border: '1px solid #D7CCC8',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="earnings" fill="#8B4513" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'light',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'accent',
            p: 3,
          }}>
            <Typography variant="h6" className="font-semibold mb-4">
              Bookings Trend
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F5F5F5',
                      border: '1px solid #D7CCC8',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="#8B4513" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <Card sx={{ 
        bgcolor: 'light',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'accent',
      }}>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Recent Transactions
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.client}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        size="small"
                        sx={{
                          bgcolor: getTypeColor(transaction.type).bgColor,
                          color: getTypeColor(transaction.type).color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        className={transaction.type === 'refund' ? 'text-red-500' : 'text-green-600'}
                      >
                        {transaction.type === 'refund' ? '-' : '+'}${transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(transaction.status).bgColor,
                          color: getStatusColor(transaction.status).color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Period Menu */}
      <Menu
        anchorEl={periodAnchorEl}
        open={Boolean(periodAnchorEl)}
        onClose={handlePeriodClose}
        PaperProps={{
          sx: {
            bgcolor: 'light',
            mt: 1,
          }
        }}
      >
        {['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year'].map((period) => (
          <MenuItem
            key={period}
            onClick={() => handlePeriodSelect(period)}
            selected={period === selectedPeriod}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'accent',
              },
              '&:hover': {
                bgcolor: 'accent',
              }
            }}
          >
            {period}
          </MenuItem>
        ))}
      </Menu>

      {/* Export Dialog */}
      <Dialog
        open={openExportDialog}
        onClose={() => setOpenExportDialog(false)}
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
            Export Earnings Report
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-6">
          <Typography variant="body1" className="mb-4">
            Choose the format for your earnings report:
          </Typography>
          <Grid container spacing={2}>
            {['PDF', 'Excel', 'CSV'].map((format) => (
              <Grid item xs={12} key={format}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderColor: 'primary',
                    color: 'primary',
                    '&:hover': {
                      borderColor: 'secondary',
                      bgcolor: 'accent',
                    }
                  }}
                >
                  Export as {format}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button
            onClick={() => setOpenExportDialog(false)}
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Earnings;
