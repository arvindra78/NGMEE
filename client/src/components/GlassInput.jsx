import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLink, HiArrowRight, HiOutlineClipboardCopy } from 'react-icons/hi';
import { SiYoutube, SiInstagram, SiTiktok, SiFacebook } from 'react-icons/si';

const GlassInput = ({ onFetch, isLoading }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState(null);

  const detectPlatform = (val) => {
    if (!val) return null;
    if (val.includes('youtube.com') || val.includes('youtu.be')) return 'youtube';
    if (val.includes('instagram.com')) return 'instagram';
    if (val.includes('tiktok.com')) return 'tiktok';
    if (val.includes('facebook.com') || val.includes('fb.watch')) return 'facebook';
    return null;
  };

  useEffect(() => {
    const p = detectPlatform(url);
    setPlatform(p);
  }, [url]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (url && !isLoading) {
      onFetch(url, platform);
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'youtube': return <SiYoutube className="text-red-500 text-2xl" />;
      case 'instagram': return <SiInstagram className="text-pink-500 text-2xl" />;
      case 'tiktok': return <SiTiktok className="text-cyan-400 text-2xl" />;
      case 'facebook': return <SiFacebook className="text-blue-500 text-2xl" />;
      default: return <HiLink className="text-gray-400 text-2xl" />;
    }
  };

  const getGlowColor = () => {
    switch (platform) {
      case 'youtube': return 'shadow-red-500/20 border-red-500/30';
      case 'instagram': return 'shadow-pink-500/20 border-pink-500/30';
      case 'tiktok': return 'shadow-cyan-400/20 border-cyan-400/30';
      case 'facebook': return 'shadow-blue-500/20 border-blue-500/30';
      default: return 'shadow-nova-cyan/20 border-white/10';
    }
  };

  return (
    <div className="w-full max-w-3xl relative group">
      <div className={`absolute -inset-1 bg-gradient-to-r from-nova-cyan to-nova-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
      <form 
        onSubmit={handleSubmit}
        className={`relative flex items-center w-full h-16 md:h-20 glass rounded-2xl px-3 md:px-6 transition-all duration-500 border-2 ${getGlowColor()} overflow-hidden`}
      >
        <div className="flex-shrink-0 mr-2 md:mr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={platform || 'none'}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
              className="p-2"
            >
              {getPlatformIcon()}
            </motion.div>
          </AnimatePresence>
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste link here..."
          className="w-full bg-transparent border-none outline-none text-base md:text-xl text-white placeholder-gray-500 font-medium min-w-0"
          disabled={isLoading}
        />

        <div className="flex items-center gap-1 md:gap-2 ml-2 md:ml-4">
          {!url && (
            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  setUrl(text);
                } catch (err) {}
              }}
              className="p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
              title="Paste from clipboard"
            >
              <HiOutlineClipboardCopy className="text-lg md:text-xl" />
            </button>
          )}

          <button
            type="submit"
            disabled={!url || isLoading}
            className={`p-3 md:p-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
              url && !isLoading 
                ? 'bg-gradient-to-r from-nova-cyan to-nova-purple text-white shadow-lg shadow-nova-cyan/20 scale-100' 
                : 'bg-white/5 text-gray-600 scale-95 opacity-50 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <HiArrowRight className="text-lg md:text-xl" />
            )}
            <span className="hidden sm:inline">Fetch</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GlassInput;
