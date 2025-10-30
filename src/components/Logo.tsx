import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="fixed top-4 left-4 md:top-6 md:left-8 z-50 group">
      <img 
        src={logo} 
        alt="StudyOrbit Logo" 
        className="h-16 w-auto md:h-24 md:w-auto lg:h-32 lg:w-auto object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
