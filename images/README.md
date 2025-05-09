
# Franco Loncarica Portfolio Images & Videos

This folder contains all the media files used in the Franco Loncarica portfolio website.

## Folder Structure

The media is organized in categories:

- `/images/panoramicas/` - For panoramic images (wide landscape photos)
- `/images/verticales/` - For vertical images (tall portrait photos)
- `/images/inmobiliarias/` - For real estate images
- `/images/fotos/` - For square format photos
- `/images/hyperlapses/` - For hyperlapse videos and thumbnails
- `/images/videos/` - For video content and thumbnails
- `/images/background-video.mp4` - Main background video

## How to Add Your Media

### For Images

1. Place your images in the appropriate folders according to their category.
2. Use the following naming convention:
   - Panorámicas: `panoramica-1.jpg`, `panoramica-2.jpg`, etc.
   - Verticales: `vertical-1.jpg`, `vertical-2.jpg`, etc.
   - Inmobiliarias: `inmobiliaria-1.jpg`, `inmobiliaria-2.jpg`, etc.
   - Fotos: `foto-1.jpg`, `foto-2.jpg`, etc.

3. For the best quality, use high-resolution images optimized for web:
   - Use JPG/JPEG format for photographs
   - Consider WebP format for better compression while maintaining quality
   - Aim for 4K resolution where possible (3840×2160 pixels or higher)

### For Videos

1. Place your videos in the appropriate folders:
   - Hyperlapses: `/images/hyperlapses/hyperlapse-1.mp4`, etc.
   - Videos: `/images/videos/video-1.mp4`, etc.

2. Create thumbnail images for each video (these will load first before the video):
   - Hyperlapses: `/images/hyperlapses/hyperlapse-1-thumb.jpg`, etc.
   - Videos: `/images/videos/video-1-thumb.jpg`, etc.

3. For optimal web performance:
   - Use MP4 format with H.264 codec
   - Aim for 1080p (1920×1080) or 4K (3840×2160) resolution
   - Keep video file sizes under 10MB for faster loading
   - Consider a moderate bitrate (5-8 Mbps for 1080p, 15-20 Mbps for 4K)
   - Video lengths ideally under 30 seconds for hyperlapses

4. For the background video:
   - Replace `/images/background-video.mp4` with your own video
   - Use a dark, subtle video that works well with text overlays
   - Keep it under 15MB and approximately 30 seconds long
   - A resolution of 1920×1080 is sufficient

## Media Recommendations

- **Panorámicas**: Wide aspect ratio images (recommended: 8192×3262 pixels or similar)
- **Verticales**: Tall vertical images (recommended: 3328×7936 pixels or similar)
- **Inmobiliarias**: Video aspect ratio images (16:9) of properties
- **Fotos**: Square format images (1:1 ratio)
- **Hyperlapses**: Video files (MP4) with 16:9 aspect ratio + thumbnail images
- **Videos**: Video files (MP4) with 16:9 aspect ratio + thumbnail images

## Optimization Tips

- Use image compression tools like ImageOptim, TinyPNG, or Squoosh
- Convert videos to H.264 MP4 using Handbrake or similar tools
- Create thumbnail images from a key frame of each video
- For faster loading, consider multiple resolutions for different devices

## Best Practices

- Name files consistently following the conventions above
- Use descriptive alt text for all media in the data file
- For best user experience, balance quality and file size
- When replacing the default media, maintain the same file names to avoid code changes

