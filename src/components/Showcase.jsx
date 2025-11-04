import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, zoomIn } from "../utils/motion";

// Import video assets
import vibeFeed from "../assets/SampleContent/vibeFeed.mov";
import sagbFeed from "../assets/SampleContent/sagbFeed.mov";

const VideoCard = ({ videoSrc, title, description, index, badge }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-play video when it loads
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay may be blocked by browser
          });
          setIsPlaying(true);
        }
      };

      if (videoRef.current.readyState >= 2) {
        // Video already loaded
        playVideo();
      } else {
        videoRef.current.addEventListener('loadeddata', playVideo);
        return () => {
          if (videoRef.current) {
            videoRef.current.removeEventListener('loadeddata', playVideo);
          }
        };
      }
    }
  }, [shouldLoad]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, user can click to play
      });
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {/* Glassmorphism Card Container */}
        <div className="relative bg-gradient-to-br from-black-100/80 to-black-200/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-all duration-500">
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0066ff]/20 via-[#0066ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badge */}
          <motion.div
            variants={zoomIn(0.2, 0.5)}
            className="absolute top-4 right-4 z-10"
          >
            <div className="bg-gradient-to-r from-[#0066ff] to-[#00d4ff] px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-white text-xs font-bold tracking-wider">
                {badge}
              </span>
            </div>
          </motion.div>

          {/* Video Container */}
          <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black/50 mb-4">
            {shouldLoad ? (
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                preload="none"
                onClick={togglePlay}
                onLoadedData={() => {
                  // Auto-play when loaded
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {
                      // Autoplay may be blocked by browser
                    });
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0066ff]/20 to-[#00d4ff]/20">
                <div className="w-12 h-12 border-4 border-[#0066ff]/50 border-t-[#0066ff] rounded-full animate-spin" />
              </div>
            )}
            
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                onClick={togglePlay}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30"
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{description}</p>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#0066ff] via-[#00d4ff] to-[#0066ff] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
        </div>
      </div>
    </motion.div>
  );
};

const Showcase = () => {
  const videos = [
    {
      videoSrc: vibeFeed,
      title: "Vibe Feed",
      description: "AI-powered social media content curation showcasing modern digital aesthetics and engagement-driven design.",
      badge: "AI-POWERED",
    },
    {
      videoSrc: sagbFeed,
      title: "SAGB Feed",
      description: "Strategic content generation demonstrating advanced social media strategy and brand storytelling through digital art.",
      badge: "STRATEGIC",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>
          Digital Art & <span className="text-[#0066ff]">Social Media</span>
        </h2>
      </motion.div>

      {/* Description */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 mb-16 flex flex-col gap-4"
      >
        <p className="text-secondary text-[17px] max-w-3xl leading-[30px]">
          AI-driven content creation and social media strategy through curated Instagram feeds.
        </p>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["AI-Powered Content", "Social Media Strategy", "Digital Art Generation", "Content Curation"].map((feature, index) => (
            <motion.div
              key={feature}
              variants={fadeIn("up", "spring", 0.2 + index * 0.1, 0.5)}
              className="px-4 py-2 bg-gradient-to-r from-[#0066ff]/20 to-[#00d4ff]/20 rounded-full border border-[#0066ff]/30 backdrop-blur-sm"
            >
              <span className="text-white text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {videos.map((video, index) => (
          <VideoCard
            key={video.title}
            videoSrc={video.videoSrc}
            title={video.title}
            description={video.description}
            index={index}
            badge={video.badge}
          />
        ))}
      </div>

      {/* Bottom Accent */}
      <motion.div
        variants={fadeIn("up", "tween", 0.8, 1)}
        className="mt-16 flex justify-center"
      >
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0066ff] to-transparent rounded-full" />
      </motion.div>
    </>
  );
};

export default SectionWrapper(Showcase, "showcase");

