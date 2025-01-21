import React from 'react';
import { Session } from '@/app/api/models/Session';
import { motion } from 'framer-motion';
import { AccessTime, LocationOn, Group, AttachMoney } from '@mui/icons-material';

interface ActiveSessionCardProps {
  session: Session;
  onJoinRequest: () => void;
}

export default function ActiveSessionCard({ session, onJoinRequest }: ActiveSessionCardProps) {
  const calculateTimeLeft = (endTime: Date): string => {
    const now = new Date();
    const end = new Date(endTime);
    const diffMs = end.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) return 'Session ended';
    if (diffMins < 60) return `${diffMins} minutes left`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m left`;
  };

  const calculateSharePrice = (session: Session): number => {
    const now = new Date();
    const end = new Date(session.endTime);
    const total = new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
    const remaining = end.getTime() - now.getTime();
    const remainingRatio = remaining / total;
    return Math.round(session.price * remainingRatio * 0.5); // 50% of the prorated amount
  };

  const timeLeft = calculateTimeLeft(session.endTime);
  const sharePrice = calculateSharePrice(session);
  const urgencyColor = timeLeft.includes('minutes') ? 'text-amber-500' : 'text-emerald-500';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all duration-300"
    >
      <div className="relative">
        {/* Session Image or Gradient Placeholder */}
        <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {session.photographerName}
            </h3>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <LocationOn className="w-4 h-4" />
              <span className="text-sm">{session.location}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full">
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Live Session</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Session Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <AccessTime className="w-4 h-4 mr-2" />
              <span className={`text-sm font-medium ${urgencyColor}`}>{timeLeft}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Group className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {session.currentClients.length} client{session.currentClients.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <AttachMoney className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium text-primary">${sharePrice}</span>
            </div>
            <div className="text-xs text-gray-500">
              50% of prorated session
            </div>
          </div>
        </div>

        {/* Join Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onJoinRequest}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium 
                   hover:bg-primary/90 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Join Session Now
        </motion.button>
      </div>
    </motion.div>
  );
}
