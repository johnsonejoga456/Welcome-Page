"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Tilt from "react-parallax-tilt"; // ✅ Updated import

export default function SplashScreen() {
  const [typedText, setTypedText] = useState("");
  const [typingPhase, setTypingPhase] = useState<"typing" | "done">("typing");
  const [tagline, setTagline] = useState("");
  const phrases = ["Created just for you!", "Tailored for you!", "Designed uniquely!"];
  const fullText = "Harkardah";

  // Cycle through taglines every 3 seconds
  useEffect(() => {
    let phraseIndex = 0;
    const interval = setInterval(() => {
      setTagline(phrases[phraseIndex]);
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (typingPhase === "typing") {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          setTypingPhase("done"); // Stop typing once the full text is displayed
          clearInterval(interval);
        }
      }
    }, 150);
    return () => clearInterval(interval);
  }, [typingPhase]);

  // Particle Effect with Mouse Movement
  const controls = useAnimation();
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const moveX = (clientX / window.innerWidth - 0.5) * 20;
    const moveY = (clientY / window.innerHeight - 0.5) * 20;
    controls.start({ x: moveX, y: moveY });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden text-center px-6 sm:px-10"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={controls}
          transition={{ type: "spring", stiffness: 50 }}
        />
      ))}

      {/* Animated Title with Consistent Button Format */}
      <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={300}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold text-[#E24E3B] cursor-pointer shadow-lg font-poppins"
        >
          {typedText}
        </motion.h1>
      </Tilt>

      {/* Dynamic Tagline */}
      <motion.p
        key={tagline}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-lg mt-2 text-gray-600 font-bold opacity-80"
      >
        {tagline}
      </motion.p>

      {/* Styled Continue Button with Consistent Font */}
      <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={300}>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#D84332" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-full max-w-xs sm:max-w-sm px-6 py-3 bg-[#E24E3B] text-white text-lg font-extrabold font-poppins rounded-full shadow-md"
          onClick={() => alert("Welcome to Harkardah!")}
        >
          Continue
        </motion.button>
      </Tilt>
    </div>
  );
}
