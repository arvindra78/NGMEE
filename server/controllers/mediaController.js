const youtubedl = require('yt-dlp-exec');
const path = require('path');

const getInfo = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      ]
    });

    // Sanitize and simplify the response for the frontend
    const simplified = {
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      duration_string: info.duration_string,
      uploader: info.uploader,
      webpage_url: info.webpage_url,
      formats: info.formats.map(f => ({
        format_id: f.format_id,
        ext: f.ext,
        height: f.height,
        vcodec: f.vcodec,
        acodec: f.acodec,
        filesize: f.filesize,
        abr: f.abr,
      })),
    };

    res.json(simplified);
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ 
      error: 'Extraction failed', 
      message: 'Could not fetch media information. The URL might be private or invalid.' 
    });
  }
};

const download = async (req, res) => {
  const { url, formatId } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // If a specific formatId is provided (e.g. "22" for 720p), use it.
    // Otherwise, use 'bestvideo+bestaudio/best' to ensure audio is included.
    // For YouTube, specific heights usually need merging, but yt-dlp-exec
    // handles the stream better if we let it pick the best combined format 
    // when a specific one isn't requested, or if we append +bestaudio.
    
    let formatSelection = formatId || 'bestvideo+bestaudio/best';
    
    // If the user selected a specific video height, we need to make sure 
    // we attach audio to it.
    if (formatId && !formatId.includes('+')) {
      formatSelection = `${formatId}+bestaudio/best`;
    }

    const options = {
      format: formatSelection,
      output: '-',
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      ]
    };

    const stream = youtubedl.exec(url, options, { stdio: ['ignore', 'pipe', 'ignore'] });

    res.setHeader('Content-Type', 'video/mp4');
    // Note: In a production app, we would dynamically set the filename
    res.setHeader('Content-Disposition', 'attachment; filename="nova_download.mp4"');

    stream.stdout.pipe(res);

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Download failed during streaming' });
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
};

module.exports = {
  getInfo,
  download
};
