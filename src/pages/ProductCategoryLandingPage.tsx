import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FixedHeader from '@/components/layout/FixedHeader';
import HeroBanner from '@/components/HeroBanner';
import ProductShowcaseModule from '@/components/ProductShowcaseModule';
import LiquidGlassCard from '@/components/LiquidGlassCard';
import SiteFooter from '@/components/layout/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  specs?: Record<string, string>;
}

const allProducts: Product[] = [
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', description: 'The ultimate iPhone.', imageUrl: 'https://placehold.co/500x500/D1D5DB/374151?text=iPhone+15+Pro', category: 'iphones', specs: { Display: '6.1" Super Retina XDR', Chip: 'A17 Bionic' } },
  { id: 'iphone-15', name: 'iPhone 15', description: 'A total powerhouse.', imageUrl: 'https://placehold.co/500x500/E5E7EB/374151?text=iPhone+15', category: 'iphones', specs: { Display: '6.1" Super Retina XDR', Chip: 'A16 Bionic' } },
  { id: 'macbook-air', name: 'MacBook Air', description: 'Lightness in motion.', imageUrl: 'https://placehold.co/500x500/F3F4F6/374151?text=MacBook+Air', category: 'mac', specs: { Display: '13.6" Liquid Retina', Chip: 'M2 or M3' } },
  { id: 'macbook-pro', name: 'MacBook Pro', description: 'Pro anywhere.', imageUrl: 'https://placehold.co/500x500/9CA3AF/374151?text=MacBook+Pro', category: 'mac', specs: { Display: '14" or 16" Liquid Retina XDR', Chip: 'M3 Pro or M3 Max' } },
  { id: 'apple-watch-s9', name: 'Apple Watch Series 9', description: 'Smarter. Brighter. Mightier.', imageUrl: 'https://placehold.co/500x500/D1D5DB/374151?text=Watch+S9', category: 'watch', specs: { Feature: 'Double Tap Gesture', Chip: 'S9 SiP' } },
  { id: 'new-gadget', name: 'Upcoming Gadget X', description: 'Revolutionary new tech.', imageUrl: 'https://placehold.co/500x500/E5E7EB/374151?text=Gadget+X', category: 'new', specs: { Availability: 'Coming Soon' } },
];

const categoryDetails: Record<string, { title: string; heroSubtitle: string; heroImage: string }> = {
  iphones: { title: 'iPhones', heroSubtitle: 'Explore the latest iPhone models and find the perfect one for you.', heroImage: 'https://placehold.co/1920x600/3B82F6/FFFFFF?text=iPhone+Lineup' },
  mac: { title: 'Mac', heroSubtitle: 'Discover the power and versatility of Mac. Built for all kinds of minds.', heroImage: 'https://placehold.co/1920x600/10B981/FFFFFF?text=Mac+Family' },
  watch: { title: 'Apple Watch', heroSubtitle: 'The future of health is on your wrist.', heroImage: 'https://placehold.co/1920x600/F59E0B/FFFFFF?text=Apple+Watch+Collection' },
  new: { title: 'New Arrivals', heroSubtitle: 'Check out the latest innovations and product releases.', heroImage: 'https://placehold.co/1920x600/8B5CF6/FFFFFF?text=New+Products' },
  default: { title: 'Our Products', heroSubtitle: 'Browse our wide range of innovative products.', heroImage: 'https://placehold.co/1920x600/71717A/FFFFFF?text=All+Products' },
};


const ProductCategoryLandingPage: React.FC = () => {
  console.log('ProductCategoryLandingPage loaded');
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'default';

  const currentCategory = categoryDetails[category] || categoryDetails.default;
  const productsInCategory = allProducts.filter(p => category === 'default' || p.category === category || (category === 'new' && p.id.includes('new'))); // Simple filter

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <FixedHeader />
      <ScrollArea className="flex-grow">
        <main>
          <HeroBanner
            title={currentCategory.title}
            subtitle={currentCategory.heroSubtitle}
            imageUrl={currentCategory.heroImage}
            height="min-h-[400px] md:min-h-[500px]"
            contentAlignment="center"
            textOverlayStyle="glass"
          />

          <section className="py-12 md:py-16 container mx-auto px-4">
            <Tabs defaultValue={productsInCategory[0]?.id || 'all'} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8 bg-transparent p-0">
                {productsInCategory.map((product) => (
                  <TabsTrigger key={product.id} value={product.id} className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md border border-border py-3 px-2">
                    {product.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {productsInCategory.map((product) => (
                <TabsContent key={product.id} value={product.id}>
                  <LiquidGlassCard interactive className="dark:bg-slate-800/50">
                    <div className="grid md:grid-cols-2 gap-8 p-6 items-center">
                      <img src={product.imageUrl} alt={product.name} className="rounded-lg shadow-lg aspect-square object-cover" />
                      <div>
                        <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                        {product.specs && (
                           <Card className="mb-6 bg-white/50 dark:bg-slate-700/50">
                             <CardHeader><CardTitle className="text-lg text-gray-800 dark:text-gray-100">Key Specs</CardTitle></CardHeader>
                             <CardContent>
                               <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                {Object.entries(product.specs).map(([key, value]) => (
                                  <li key={key}><strong>{key}:</strong> {value}</li>
                                ))}
                               </ul>
                             </CardContent>
                           </Card>
                        )}
                        <Button size="lg" className="w-full sm:w-auto">
                          Learn More & Buy
                        </Button>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </TabsContent>
              ))}
            </Tabs>
            {productsInCategory.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 text-xl py-10">No products found in this category yet.</p>
            )}
          </section>

          <section className="py-12 md:py-16 bg-gray-100 dark:bg-slate-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">More to Explore</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Placeholder for related products or categories */}
                    {allProducts.slice(0,3).map(p => (
                        <ProductShowcaseModule 
                            key={`related-${p.id}`}
                            title={p.name}
                            imageUrl={p.imageUrl}
                            ctaText="View Details"
                            ctaLink={`/product-category-landing-page?category=${p.category}`} // Simplified link
                        />
                    ))}
                </div>
            </div>
          </section>
        </main>
      </ScrollArea>
      <SiteFooter />
    </div>
  );
};

export default ProductCategoryLandingPage;