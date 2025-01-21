'use client';

import React from 'react';
import ActiveSessionCard from '@/components/ActiveSessionCard';
import { Session } from '@/app/api/models/Session';
import { motion } from 'framer-motion';
import { Search as SearchIcon, FilterList as FilterIcon, Event as EventIcon } from '@mui/icons-material';
import { mockSessions } from '../api/mockData';
import { Tabs, Tab } from '@mui/material';

export default function SharePage() {
  const [sessions, setSessions] = React.useState<Session[]>(mockSessions);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleJoinRequest = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to send join request');
      }
    } catch (error) {
      console.error('Error sending join request:', error);
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.photographerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'nearby' && session.location.includes('NY')) ||
                         (selectedFilter === 'affordable' && session.price < 150);
    
    let matchesTab = true;
    if (activeTab === 0) matchesTab = session.status === 'active';
    else if (activeTab === 1) matchesTab = session.status === 'upcoming';
    else if (activeTab === 2) matchesTab = session.status === 'finished';
    
    return matchesSearch && matchesFilter && matchesTab;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Sessions</h3>
          <p className="text-red-700">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Photography Sessions
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join active sessions, book upcoming shoots, or explore past photography experiences
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by photographer, location, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('nearby')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'nearby'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Nearby
              </button>
              <button
                onClick={() => setSelectedFilter('affordable')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'affordable'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Affordable
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
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
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Active Sessions</span>
                </div>
              }
              className={activeTab === 0 ? 'text-primary' : 'text-gray-400'}
            />
            <Tab 
              label={
                <div className="flex items-center gap-2">
                  <EventIcon className="w-4 h-4" />
                  <span>Upcoming</span>
                </div>
              }
              className={activeTab === 1 ? 'text-primary' : 'text-gray-400'}
            />
            <Tab 
              label="Past Sessions"
              className={activeTab === 2 ? 'text-primary' : 'text-gray-400'}
            />
          </Tabs>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6">
              <svg
                className="w-full h-full text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Sessions Found</h3>
            <p className="text-gray-400">
              {searchQuery
                ? "No sessions match your search criteria. Try adjusting your filters."
                : "Check back later for available photography sessions."}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ActiveSessionCard
                  session={session}
                  onJoinRequest={() => handleJoinRequest(session.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
