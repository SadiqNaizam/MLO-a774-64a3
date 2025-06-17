import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string; // Optional background image
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  height?: string; // e.g., 'min-h-[400px]', 'min-h-screen/2'
  contentAlignment?: 'left' | 'center' | 'right';
  textOverlayStyle?: 'dark' | 'light' | 'glass'; // For text contrast over image
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
  onCtaClick,
  height = 'min-h-[300px] md:min-h-[400px]',
  contentAlignment = 'center',
  textOverlayStyle = 'dark',
}) => {
  console.log("Rendering HeroBanner with title:", title);

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const overlayStyles = {
    dark: 'bg-black/50 text-white',
    light: 'bg-white/70 text-gray-800',
    glass: 'bg-white/20 backdrop-blur-md text-white p-6 rounded-lg shadow-lg', // Basic glass effect
  };

  const content = (
    <div className={cn("relative z-10 flex flex-col justify-center p-8 max-w-3xl w-full", alignmentClasses[contentAlignment])}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-lg md:text-xl mb-8">{subtitle}</p>}
      {ctaText && (ctaLink || onCtaClick) && (
        <Button
          size="lg"
          onClick={onCtaClick}
          asChild={!!ctaLink}
          className={cn(textOverlayStyle === 'glass' ? 'border-white/50 hover:bg-white/30' : '')}
        >
          {ctaLink ? <a href={ctaLink}>{ctaText}</a> : <>{ctaText}</>}
        </Button>
      )}
    </div>
  );

  return (
    <section
      className={cn("relative flex w-full overflow-hidden", height, alignmentClasses[contentAlignment])}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {backgroundColor: '#f0f0f0'}}
    >
      {imageUrl ? (
        <div className={cn("absolute inset-0 flex justify-center", alignmentClasses[contentAlignment], overlayStyles[textOverlayStyle])}>
            {content}
        </div>
      ) : (
        content
      )}
    </section>
  );
};

export default HeroBanner;