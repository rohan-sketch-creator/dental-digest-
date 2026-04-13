import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mediaWidth = useTransform(scrollYProgress, [0, 0.7], ["300px", "95vw"]);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.7], ["400px", "85vh"]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.7], ["0vw", "-100vw"]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.7], ["0vw", "100vw"]);
  
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.7, 0.1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="relative w-full overflow-x-hidden bg-slate-950 font-sans">
      {/* Scroll container controls the duration of the pinning */}
      <div ref={containerRef} className="relative h-[250vh]">
        {/* Sticky viewport content */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
          
          {/* Background image fades out to reveal dark background underneath */}
          <motion.div
            className="absolute inset-0 z-0 h-full w-full pointer-events-none"
            style={{ opacity: bgOpacity }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
            
            {/* The expanding media */}
            <motion.div
              className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
              style={{
                width: mediaWidth,
                height: mediaHeight,
                x: "-50%",
                y: "-50%"
              }}
            >
              {mediaType === 'video' ? (
                 <video
                   src={mediaSrc}
                   poster={posterSrc}
                   autoPlay
                   muted
                   loop
                   playsInline
                   className="w-full h-full object-cover"
                   controls={false}
                 />
              ) : (
                 <img
                   src={mediaSrc}
                   alt="Media content"
                   className="w-full h-full object-cover"
                 />
              )}
              
              <motion.div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
              
              {/* Hints disappear quickly on scroll */}
              <motion.div 
                className="absolute inset-x-0 inset-y-8 flex flex-col items-center justify-between text-center pointer-events-none"
                style={{ opacity: hintOpacity }}
              >
                {date && <p className="text-xl md:text-2xl text-white drop-shadow-md">{date}</p>}
                {scrollToExpand && <p className="text-white font-medium drop-shadow-md animate-pulse">{scrollToExpand}</p>}
              </motion.div>
            </motion.div>

            {/* Split Title */}
            <div
              className={`flex items-center justify-center text-center gap-4 w-full relative z-10 ${
                textBlend ? 'mix-blend-difference text-white' : 'text-white'
              }`}
            >
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight"
                style={{ x: leftTextX }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight"
                style={{ x: rightTextX }}
              >
                {restOfTitle}
              </motion.h2>
            </div>
            
          </div>
        </div>
      </div>

      {/* Content flows naturally below once sticky div finishes */}
      <div className="relative z-20 w-full px-6 py-16 md:px-16 lg:py-24 bg-slate-950 text-white min-h-[50vh]">
        {children}
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
