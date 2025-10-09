import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from '../utils/deviceDetection';
interface Tool {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
}
interface RobotAnimationProps {
  tools: Tool[];
}
const RobotAnimation: React.FC<RobotAnimationProps> = ({
  tools
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [activeBubble, setActiveBubble] = useState<number | null>(null);
  const mobile = isMobile();

  // Voice command phrases
  const voiceCommands = ["Generate a professional email", "Analyze my resume for ATS", "Create project documentation", "Practice interview questions"];

  // Hide prompt after user interaction or 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through voice bubbles every 3 seconds
  useEffect(() => {
    if (isActive) {
      const bubbleTimer = setInterval(() => {
        setActiveBubble(prev => {
          if (prev === null) return 0;
          return (prev + 1) % voiceCommands.length;
        });
      }, 3000);
      return () => clearInterval(bubbleTimer);
    } else {
      setActiveBubble(null);
    }
  }, [isActive, voiceCommands.length]);
  const handleRobotInteraction = () => {
    if (mobile) {
      setIsActive(!isActive);
    }
  };
  const handleMouseEnter = () => {
    if (!mobile) {
      setIsActive(true);
    }
  };
  const handleMouseLeave = () => {
    if (!mobile) {
      setIsActive(false);
    }
  };

  // Ensure we only show tools that exist
  const visibleTools = tools.slice(0, 4);
  return null;
};
export default RobotAnimation;