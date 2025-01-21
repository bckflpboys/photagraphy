// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import DashboardLayout from '@/components/dashboard/DashboardLayout';
// import { Photographer, mockPhotographers } from '@/app/api/mockPhotographers';
// import Image from 'next/image';
// import { 
//   Star as StarIcon,
//   LocationOn,
//   PhotoCamera,
//   Message as MessageIcon,
//   Favorite as FavoriteIcon,
//   VerifiedUser as VerifiedIcon,
//   EmojiEvents as AwardIcon,
//   WorkspacePremium as PremiumIcon
// } from '@mui/icons-material';
// import { Button, IconButton, Chip, Rating } from '@mui/material';

// function FavoritePhotographerCard({ photographer }: { photographer: Photographer }) {
//   const getBadgeIcon = (type: string) => {
//     switch (type) {
//       case 'verified':
//         return <VerifiedIcon className="w-4 h-4" />;
//       case 'featured':
//         return <AwardIcon className="w-4 h-4" />;
//       case 'pro':
//         return <PremiumIcon className="w-4 h-4" />;
//       case 'top-rated':
//         return <StarIcon className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const getAvailabilityColor = (status: string) => {
//     switch (status) {
//       case 'available':
//         return 'bg-green-500';
//       case 'busy':
//         return 'bg-yellow-500';
//       case 'away':
//         return 'bg-gray-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all duration-300"
//     >
//       {/* Photographer Header */}
//       <div className="relative h-48">
//         <Image
//           src={photographer.profileImage}
//           alt={photographer.name}
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
//         {/* Availability Badge */}
//         <div className="absolute top-4 right-4">
//           <div className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full">
//             <div className="flex items-center space-x-2">
//               <span className={`w-2 h-2 rounded-full ${getAvailabilityColor(photographer.availability)} animate-pulse`} />
//               <span className="text-xs font-medium text-white capitalize">
//                 {photographer.availability}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Photographer Info */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <h3 className="text-xl font-bold text-white mb-1">{photographer.name}</h3>
//           <div className="flex items-center space-x-2 text-gray-300 text-sm">
//             <LocationOn className="w-4 h-4" />
//             <span>{photographer.location}</span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6 space-y-4">
//         {/* Badges */}
//         <div className="flex flex-wrap gap-2">
//           {photographer.badges.map((badge) => (
//             <Chip
//               key={badge.type}
//               icon={getBadgeIcon(badge.type)}
//               label={badge.label}
//               size="small"
//               className="bg-gray-700 text-white"
//             />
//           ))}
//         </div>

//         {/* Specialties */}
//         <div className="flex flex-wrap gap-2">
//           {photographer.specialties.map((specialty) => (
//             <span
//               key={specialty}
//               className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
//             >
//               {specialty}
//             </span>
//           ))}
//         </div>

//         {/* Rating and Price */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Rating value={photographer.rating} precision={0.1} readOnly size="small" />
//             <span className="text-gray-400 text-sm">
//               ({photographer.reviewCount} reviews)
//             </span>
//           </div>
//           <span className="text-primary font-medium">{photographer.priceRange}</span>
//         </div>

//         {/* Bio */}
//         <p className="text-gray-400 text-sm line-clamp-2">{photographer.bio}</p>

//         {/* Portfolio Preview */}
//         <div className="grid grid-cols-3 gap-2">
//           {photographer.portfolio.map((item) => (
//             <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.caption}
//                 fill
//                 className="object-cover hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="flex justify-between items-center pt-4">
//           <Button
//             variant="contained"
//             startIcon={<MessageIcon />}
//             className="bg-primary hover:bg-primary/90 flex-1 mr-2"
//           >
//             Message
//           </Button>
//           <IconButton
//             className="text-red-500 hover:bg-red-500/10"
//             onClick={() => {/* Handle unfavorite */}}
//           >
//             <FavoriteIcon />
//           </IconButton>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function FavoritesContent() {
//   const [favorites, setFavorites] = React.useState<Photographer[]>(mockPhotographers);
//   const [view, setView] = React.useState<'grid' | 'list'>('grid');

//   return (
//     <>
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-white mb-4">Favorite Photographers</h1>
//         <p className="text-lg text-gray-300">
//           Your collection of talented photographers
//         </p>
//       </motion.div>

//       {/* Photographers Grid */}
//       {favorites.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-16"
//         >
//           <div className="bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6">
//             <FavoriteIcon className="w-full h-full text-gray-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h3>
//           <p className="text-gray-400">
//             Start exploring photographers and add them to your favorites!
//           </p>
//           <Button
//             variant="contained"
//             className="mt-6 bg-primary hover:bg-primary/90"
//             href="/share"
//           >
//             Browse Photographers
//           </Button>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {favorites.map((photographer, index) => (
//             <FavoritePhotographerCard
//               key={photographer.id}
//               photographer={photographer}
//             />
//           ))}
//         </motion.div>
//       )}
//     </>
//   );
// }

// export default function FavoritesPage() {
//   return (
//     <DashboardLayout userType="client">
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <FavoritesContent />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
