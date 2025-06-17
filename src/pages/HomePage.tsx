import React from 'react';
import FixedHeader from '@/components/layout/FixedHeader';
import HeroBanner from '@/components/HeroBanner';
import ProductShowcaseModule from '@/components/ProductShowcaseModule';
import LiquidGlassCard from '@/components/LiquidGlassCard';
import SiteFooter from '@/components/layout/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  const mainProducts = [
    {
      id: 'iphone',
      title: 'iPhone Series',
      description: 'Experience the latest in mobile technology. Powerful, intuitive, and beautifully designed.',
      imageUrl: 'https://placehold.co/600x400/A1A1A1/FFFFFF?text=iPhone+Showcase',
      ctaText: 'Explore iPhones',
      ctaLink: '/product-category-landing-page?category=iphones', // Example link
    },
    {
      id: 'mac',
      title: 'Mac Collection',
      description: 'Unleash your creativity with the power and versatility of Mac. For pros and students alike.',
      imageUrl: 'https://placehold.co/600x400/C1C1C1/FFFFFF?text=Mac+Showcase',
      ctaText: 'Discover Macs',
      ctaLink: '/product-category-landing-page?category=mac', // Example link
    },
    {
      id: 'watch',
      title: 'Apple Watch',
      description: 'The ultimate device for a healthy life. Stay connected, active, and informed.',
      imageUrl: 'https://placehold.co/600x400/B1B1B1/FFFFFF?text=Watch+Showcase',
      ctaText: 'See Apple Watch',
      ctaLink: '/product-category-landing-page?category=watch', // Example link
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FixedHeader />
      <ScrollArea className="flex-grow">
        <main>
          <HeroBanner
            title="Innovation Unleashed."
            subtitle="Discover the future, today. Welcome to our world of cutting-edge technology."
            imageUrl="https://placehold.co/1920x800/2D2D2D/FFFFFF?text=Future+Tech"
            ctaText="Explore New Arrivals"
            ctaLink="/product-category-landing-page?category=new"
            height="min-h-[calc(100vh-4rem)] md:min-h-[600px]"
            contentAlignment="center"
            textOverlayStyle="glass"
          />

          <section className="py-16 md:py-24 container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Dive into Our Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainProducts.map((product) => (
                <ProductShowcaseModule
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  imageAlt={product.title}
                  ctaText={product.ctaText}
                  ctaLink={product.ctaLink}
                />
              ))}
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white/5 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <LiquidGlassCard
                title="Experience the 'Liquid Glass' Magic"
                description="Our design philosophy brings clarity and depth to your digital interaction. Explore features seamlessly."
                interactive
                className="text-center"
              >
                <div className="mt-6">
                  <p className="text-lg text-gray-300 mb-6">
                    Built with precision, designed for delight. Our interfaces are intuitive, responsive, and beautiful.
                  </p>
                  <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 border-white/50 text-white">
                    Learn More About Our Design <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </LiquidGlassCard>
            </div>
          </section>
        </main>
      </ScrollArea>
      <SiteFooter />
    </div>
  );
};

export default HomePage;