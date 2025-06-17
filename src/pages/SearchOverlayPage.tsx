import React, { useState, useEffect } from 'react';
import FixedHeader from '@/components/layout/FixedHeader'; // Included as per component list
import LiquidGlassCard from '@/components/LiquidGlassCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'Product' | 'Article' | 'Support';
  title: string;
  summary: string;
  link: string;
}

const mockResults: SearchResult[] = [
  { id: '1', type: 'Product', title: 'iPhone 15 Pro', summary: 'The latest iPhone with A17 Bionic chip.', link: '/products/iphone-15-pro' },
  { id: '2', type: 'Article', title: 'How to use iOS 17 features', summary: 'A guide to the new StandBy mode and more.', link: '/articles/ios-17-features' },
  { id: '3', type: 'Support', title: 'Fixing Wi-Fi connection issues', summary: 'Troubleshooting steps for your Apple devices.', link: '/support/wifi-issues' },
  { id: '4', type: 'Product', title: 'MacBook Air M3', summary: 'The new lightweight powerhouse.', link: '/products/macbook-air-m3' },
];

const SearchOverlayPage: React.FC = () => {
  console.log('SearchOverlayPage loaded (conceptually, this is the overlay content)');
  const [isOpen, setIsOpen] = useState(true); // Dialog is open by default for this "page"
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Simulate search
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(mockResults.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.summary.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm]);

  // This page will render FixedHeader, then the Dialog which takes over.
  // The Dialog's open state is controlled here.
  // In a real app, this Dialog's trigger would be in FixedHeader itself.
  // Navigating to this "/search-overlay" route effectively shows the search modal.

  return (
    <>
      <FixedHeader /> {/* Rendered as per component list for this page */}
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          // Optional: navigate away or handle close if this page is only for the dialog
          // For now, just allows closing. A real app might navigate back.
          window.history.back(); // Simple way to go back
        }
      }}>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogContent className="fixed inset-0 sm:inset-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] p-0 flex flex-col bg-transparent border-none shadow-none">
          <LiquidGlassCard className="w-full h-full flex flex-col overflow-hidden !rounded-none sm:!rounded-lg !border-0 sm:!border">
            <DialogHeader className="p-6 border-b border-white/20 flex-row justify-between items-center">
              <DialogTitle className="text-2xl font-semibold text-white">Search</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
                <X className="h-6 w-6" />
              </Button>
            </DialogHeader>
            
            <div className="p-6 flex-shrink-0">
              <Label htmlFor="search-input" className="sr-only">Search</Label>
              <div className="relative">
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search products, articles, support..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-lg bg-white/10 border-white/20 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <ScrollArea className="flex-grow p-6 pt-0">
              {searchResults.length > 0 ? (
                <ul className="space-y-4">
                  {searchResults.map(result => (
                    <li key={result.id}>
                      <LiquidGlassCard interactive className="p-4 hover:scale-[1.01]">
                        <a href={result.link} className="block">
                          <div className="flex items-center mb-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${result.type === 'Product' ? 'bg-blue-500/70 text-white' : result.type === 'Article' ? 'bg-green-500/70 text-white' : 'bg-yellow-500/70 text-black'}`}>
                              {result.type}
                            </span>
                            <h3 className="text-lg font-medium text-white">{result.title}</h3>
                          </div>
                          <p className="text-sm text-gray-300">{result.summary}</p>
                        </a>
                      </LiquidGlassCard>
                    </li>
                  ))}
                </ul>
              ) : (
                searchTerm.trim() !== '' && (
                  <div className="text-center py-10">
                    <p className="text-gray-400 text-lg">No results found for "{searchTerm}".</p>
                  </div>
                )
              )}
              {searchTerm.trim() === '' && (
                 <div className="text-center py-10">
                    <p className="text-gray-400 text-lg">Start typing to see search results.</p>
                  </div>
              )}
            </ScrollArea>
            <div className="p-4 border-t border-white/20 text-xs text-gray-400 text-center">
              Powered by Ascendion Search
            </div>
          </LiquidGlassCard>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchOverlayPage;