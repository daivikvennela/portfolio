# Video Optimization Guide

The Instagram feed videos are currently in .mov format and are quite large (68MB + 25MB). For optimal web performance, they should be converted to web-optimized formats.

## Recommended Approach

### Option 1: Using FFmpeg (Recommended)

Install FFmpeg:
```bash
# macOS
brew install ffmpeg

# Then convert videos:
ffmpeg -i src/assets/SampleContent/vibeFeed.mov \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1080:-2" \
  src/assets/SampleContent/vibeFeed.mp4

ffmpeg -i src/assets/SampleContent/sagbFeed.mov \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1080:-2" \
  src/assets/SampleContent/sagbFeed.mp4
```

### Option 2: Online Tools

1. **HandBrake** (Free, GUI tool)
   - Download from https://handbrake.fr/
   - Use "Web Optimized" preset
   - Set quality to 20-23

2. **CloudConvert** (Online)
   - Upload .mov files
   - Convert to MP4 with H.264 codec
   - Download optimized versions

3. **Adobe Media Encoder** (If available)
   - Use H.264 preset
   - Target bitrate: 2-5 Mbps
   - Enable "Fast Start" for web streaming

### Option 3: Quick Compression (macOS)

```bash
# Using built-in tools (lower quality but fast)
ffmpeg -i src/assets/SampleContent/vibeFeed.mov \
  -vcodec libx264 -crf 28 \
  -acodec aac -b:a 128k \
  src/assets/SampleContent/vibeFeed.mp4
```

## After Conversion

1. Update `Showcase.jsx` to import .mp4 files instead of .mov
2. Replace the import paths:
   ```javascript
   import vibeFeed from "../assets/SampleContent/vibeFeed.mp4";
   import sagbFeed from "../assets/SampleContent/sagbFeed.mp4";
   ```

## Target File Sizes

- **vibeFeed**: Target 5-10MB (from 25MB)
- **sagbFeed**: Target 10-15MB (from 68MB)

## Current Implementation

The Showcase component now uses:
- ✅ Intersection Observer for lazy loading
- ✅ Videos only load when 100px from viewport
- ✅ `preload="none"` to prevent upfront loading
- ✅ Loading spinner while video loads

