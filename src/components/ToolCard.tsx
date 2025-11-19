import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  badge?: string;
  image?: string;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({
  id,
  icon,
  title,
  description,
  path,
  badge,
  image,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tool-card tech-card overflow-hidden"
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: isHovered ? 0.15 : 0,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            filter: 'brightness(0.8) saturate(1.2)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            {icon}
          </div>
          {badge && (
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm"
            >
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/70 mb-6 flex-grow leading-relaxed">{description}</p>

        <Link to={path} className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-between group hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all duration-300"
          >
            <span>Try it now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
