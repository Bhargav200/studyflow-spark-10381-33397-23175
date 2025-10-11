import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="fixed top-4 left-4 md:top-6 md:left-8 z-50 group">
      <img 
        src={logo} 
        alt="StudyOrbit Logo" 
        className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
};

export default Logo;
