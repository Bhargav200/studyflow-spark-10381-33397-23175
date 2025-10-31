'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, Wrench, Info, HelpCircle, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { auth, signOut } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
  onClick?: () => void;
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

function HoverGradientNavBar(): React.JSX.Element {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    }
  };

  const publicMenuItems: HoverGradientMenuItem[] = [
    { 
      icon: <Home className="h-5 w-5" />, 
      label: "Home", 
      href: "/", 
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)", 
      iconColor: "group-hover:text-emerald-500" 
    },
    { 
      icon: <Wrench className="h-5 w-5" />, 
      label: "AI Tools", 
      href: "/tools", 
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)", 
      iconColor: "group-hover:text-emerald-500" 
    },
    { 
      icon: <Info className="h-5 w-5" />, 
      label: "About", 
      href: "/about", 
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)", 
      iconColor: "group-hover:text-emerald-500" 
    },
  ];

  const authMenuItems: HoverGradientMenuItem[] = currentUser ? [
    { 
      icon: <User className="h-5 w-5" />, 
      label: "Dashboard", 
      href: "/dashboard", 
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)", 
      iconColor: "group-hover:text-emerald-500" 
    },
    { 
      icon: <LogOut className="h-5 w-5" />, 
      label: "Logout", 
      href: "#", 
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", 
      iconColor: "group-hover:text-red-500",
      onClick: handleLogout
    },
  ] : [
    { 
      icon: <HelpCircle className="h-5 w-5" />, 
      label: "How it works", 
      href: "/faqs", 
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)", 
      iconColor: "group-hover:text-emerald-500" 
    },
  ];

  const menuItems = [...publicMenuItems, ...authMenuItems];

  return (
    <div className="fixed top-0 left-0 w-full md:top-6 md:left-1/2 md:-translate-x-1/2 z-50">
      <motion.nav
        className="w-full md:w-fit mx-auto px-3 md:px-6 py-2 md:py-3 rounded-none md:rounded-3xl 
        bg-background/70 backdrop-blur-lg 
        border-b md:border border-border/60
        shadow-lg md:shadow-xl relative"
        initial="initial"
        whileHover="hover"
      >
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-4">
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src={logo} 
              alt="StudyOrbit Logo" 
              className="h-10 w-auto md:h-12 lg:h-14 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
              loading="eager"
            />
          </Link>
          <ul className="flex items-center justify-center gap-1 md:gap-3 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem) => (
            <motion.li key={item.label} className="relative flex-1 md:flex-none">
              <motion.div
                className="block rounded-xl md:rounded-2xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                <motion.div
                  onClick={item.onClick}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                  px-2 py-1.5 md:px-4 md:py-2 relative z-10 cursor-pointer
                  bg-transparent text-muted-foreground
                  group-hover:text-foreground
                  transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  {item.href !== "#" ? (
                    <Link to={item.href} className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span className="hidden md:inline">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span className="hidden md:inline">{item.label}</span>
                    </>
                  )}
                </motion.div>
                <motion.div
                  onClick={item.onClick}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                  px-2 py-1.5 md:px-4 md:py-2 absolute inset-0 z-10 cursor-pointer
                  bg-transparent text-muted-foreground
                  group-hover:text-foreground
                  transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  {item.href !== "#" ? (
                    <Link to={item.href} className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span className="hidden md:inline">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span className="hidden md:inline">{item.label}</span>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.li>
          ))}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
