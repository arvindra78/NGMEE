import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiMusicNote, HiVideoCamera } from 'react-icons/hi';

const FormatSelector = ({ formats, onDownload, isDownloading, platform }) => {
  const [selectedFormat, setSelectedFormat] = useState(null);

  // Group and filter formats for a cleaner UI
  // IMPORTANT: Filter for formats that include BOTH video and audio to avoid missing audio without FFmpeg
  const videoFormats = formats?.filter(f => 
    f.ext === 'mp4' && 
    f.vcodec !== 'none' && 
    f.acodec !== 'none'
  )
    .sort((a, b) => (b.height || 0) - (a.height || 0))
    .slice(0, 4) || [];
    
  const audioFormats = formats?.filter(f => f.ext === 'm4a' || f.ext === 'mp3')
    .sort((a, b) => (b.abr || 0) - (a.abr || 0))
    .slice(0, 1) || [];

  const getGlowStyle = () => {
    switch (platform) {
      case 'youtube': return 'hover:shadow-red-500/40 bg-red-500';
      case 'instagram': return 'hover:shadow-pink-500/40 bg-pink-500';
      case 'tiktok': return 'hover:shadow-cyan-400/40 bg-cyan-400';
      case 'facebook': return 'hover:shadow-blue-500/40 bg-blue-500';
      default: return 'hover:shadow-nova-cyan/40 bg-nova-cyan';
    }
  };

  return (
    <div className="mt-auto">
      <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
        {videoFormats.map((format, idx) => (
          <motion.button
            key={format.format_id || idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFormat(format)}
            className={`px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-1.5 md:gap-2 transition-all border text-xs md:text-base ${
              selectedFormat?.format_id === format.format_id 
                ? 'glass border-nova-cyan text-nova-cyan shadow-lg shadow-nova-cyan/20' 
                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
            }`}
          >
            <HiVideoCamera className="text-sm md:text-base" />
            <span className="font-bold">{format.height}p</span>
          </motion.button>
        ))}

        {audioFormats.map((format, idx) => (
          <motion.button
            key={format.format_id || idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFormat(format)}
            className={`px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-1.5 md:gap-2 transition-all border text-xs md:text-base ${
              selectedFormat?.format_id === format.format_id 
                ? 'glass border-nova-purple text-nova-purple shadow-lg shadow-nova-purple/20' 
                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
            }`}
          >
            <HiMusicNote className="text-sm md:text-base" />
            <span className="font-bold">MP3</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        disabled={!selectedFormat || isDownloading}
        whileHover={selectedFormat && !isDownloading ? { scale: 1.02 } : {}}
        whileTap={selectedFormat && !isDownloading ? { scale: 0.98 } : {}}
        onClick={() => onDownload(selectedFormat)}
        className={`w-full py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-bold text-lg md:text-xl flex items-center justify-center gap-2 md:gap-3 transition-all ${
          selectedFormat && !isDownloading
            ? `${getGlowStyle()} text-white shadow-2xl`
            : 'bg-white/5 text-gray-600 cursor-not-allowed'
        }`}
      >
        {isDownloading ? (
          <>
            <div className="w-5 h-5 md:w-6 md:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <HiDownload className="text-xl md:text-2xl" />
            <span>Download Now</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FormatSelector;
