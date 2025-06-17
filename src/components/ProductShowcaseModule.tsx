import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductShowcaseModuleProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
}

const ProductShowcaseModule: React.FC<ProductShowcaseModuleProps> = ({
  imageUrl,
  imageAlt = "Product image",
  title,
  description,
  ctaText,
  ctaLink,
  onCtaClick,
}) => {
  console.log("Rendering ProductShowcaseModule for:", title);

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="p-6 space-y-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription className="line-clamp-3">{description}</CardDescription>}
      </CardContent>
      {(ctaText && (ctaLink || onCtaClick)) && (
        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full sm:w-auto"
            onClick={onCtaClick}
            asChild={!!ctaLink}
          >
            {ctaLink ? <a href={ctaLink}>{ctaText}</a> : <>{ctaText}</>}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductShowcaseModule;