import React from 'react';
import { motion } from 'framer-motion';
import { HiClock, HiUser, HiOutlineTag } from 'react-icons/hi';
import FormatSelector from './FormatSelector';

const ThumbnailCard = ({ data, platform, onDownload, isDownloading }) => {
  if (!data) return null;

  const getAccentColor = () => {
    switch (platform) {
      case 'youtube': return 'from-red-500/20 to-transparent';
      case 'instagram': return 'from-pink-500/20 to-transparent';
      case 'tiktok': return 'from-cyan-400/20 to-transparent';
      case 'facebook': return 'from-blue-500/20 to-transparent';
      default: return 'from-nova-cyan/20 to-transparent';
    }
  };

  const getBorderColor = () => {
    switch (platform) {
      case 'youtube': return 'border-red-500/20';
      case 'instagram': return 'border-pink-500/20';
      case 'tiktok': return 'border-cyan-400/20';
      case 'facebook': return 'border-blue-500/20';
      default: return 'border-white/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`w-full max-w-4xl glass rounded-3xl md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 border ${getBorderColor()} relative overflow-hidden`}
    >
      {/* Background Accent */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${getAccentColor()} pointer-events-none`} />

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
        {/* Thumbnail Section */}
        <div className="w-full md:w-2/5 shrink-0">
          <motion.div 
            initial={{ filter: 'blur(20px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            className="aspect-video md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative group"
          >
            <img 
              src={data.thumbnail} 
              alt={data.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
              <div className="glass px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 backdrop-blur-xl border-white/20 w-fit">
                <HiOutlineTag className="text-nova-cyan" />
                {platform?.toUpperCase()}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="flex-grow flex flex-col">
          <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 line-clamp-2 leading-tight">
            {data.title}
          </h3>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 text-gray-400 glass-dark p-3 md:p-4 rounded-xl md:rounded-2xl">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <HiUser className="text-lg md:text-xl" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-50">Creator</span>
                <span className="text-xs md:text-sm font-semibold text-white truncate">{data.uploader || 'Unknown'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 text-gray-400 glass-dark p-3 md:p-4 rounded-xl md:rounded-2xl">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <HiClock className="text-lg md:text-xl" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-50">Duration</span>
                <span className="text-xs md:text-sm font-semibold text-white truncate">{data.duration_string || 'N/A'}</span>
              </div>
            </div>
          </div>

          <FormatSelector 
            formats={data.formats} 
            onDownload={onDownload} 
            isDownloading={isDownloading}
            platform={platform}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ThumbnailCard;
