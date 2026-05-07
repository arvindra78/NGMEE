import React, { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import GlassInput from './components/GlassInput';
import ThumbnailCard from './components/ThumbnailCard';
import { getMediaInfo, downloadMedia } from './services/api';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async (url, platform) => {
    setLoading(true);
    setError(null);
    setMediaData(null);
    setCurrentPlatform(platform);

    try {
      const data = await getMediaInfo(url);
      setMediaData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch media information. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    setDownloading(true);
    setError(null);

    try {
      await downloadMedia(mediaData.webpage_url, format.format_id, mediaData.title);
    } catch (err) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-cyan to-nova-purple flex items-center justify-center shadow-lg shadow-nova-cyan/20">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              NGMEE
            </h1>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium hidden sm:block">
            Next Gen Media Extraction Engine
          </div>
        </nav>

        <section className="flex flex-col items-center justify-center pt-6 md:pt-10 pb-12 md:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight px-2">
              NGMEE <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-nova-cyan via-white to-nova-purple">
                Extraction Engine
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-xl leading-relaxed px-4">
              Unlock the power of the Next Gen Media Extraction Engine. Download from YouTube, Instagram, TikTok, and Facebook with unmatched speed.
            </p>
          </motion.div>
          
          <div className="w-full max-w-3xl px-2 sm:px-0">
            <GlassInput onFetch={handleFetch} isLoading={loading} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-3xl mt-6"
              >
                <div className="glass border-red-500/30 bg-red-500/10 p-4 rounded-2xl text-red-400 font-medium">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex justify-center mt-16">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-4xl glass rounded-[2.5rem] p-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 border-4 border-nova-cyan/30 border-t-nova-cyan rounded-full animate-spin mb-6"></div>
                  <p className="text-nova-cyan font-bold tracking-widest uppercase text-sm">Analyzing Media Source...</p>
                </motion.div>
              ) : mediaData ? (
                <ThumbnailCard 
                  key="card"
                  data={mediaData} 
                  platform={currentPlatform} 
                  onDownload={handleDownload}
                  isDownloading={downloading}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} NGMEE - Next Gen Media Extraction Engine. Use responsibly and respect copyright laws.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
