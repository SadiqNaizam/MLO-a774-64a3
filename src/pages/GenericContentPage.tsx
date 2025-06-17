import React from 'react';
import FixedHeader from '@/components/layout/FixedHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // As per component list
import { Button } from '@/components/ui/button'; // For potential form submission
import { Label } from '@/components/ui/label'; // For form

const GenericContentPage: React.FC = () => {
  console.log('GenericContentPage loaded');

  // Example content, could be fetched or passed as props
  const pageData = {
    title: 'Privacy Policy',
    lastUpdated: 'October 26, 2023',
    sections: [
      {
        heading: 'Introduction',
        content: 'Welcome to our Privacy Policy. Your privacy is critically important to us. This policy outlines how we collect, use, and protect your personal information. We are committed to safeguarding your data while providing you with a seamless experience.'
      },
      {
        heading: 'Information We Collect',
        content: 'We may collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, and any other information you choose to provide. We also collect information automatically as you navigate through the site. This may include usage details, IP addresses, and information collected through cookies and other tracking technologies.'
      },
      {
        heading: 'How We Use Your Information',
        content: 'We use the information we collect to operate and maintain our services, to communicate with you, to process your transactions, to customize your experience, and to improve our offerings. We may also use your information for security purposes, to prevent fraud, and to comply with legal obligations.'
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900">
      <FixedHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-12 md:py-16">
          <Card className="bg-white dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
            <CardHeader className="border-b dark:border-slate-700">
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{pageData.title}</CardTitle>
              {pageData.lastUpdated && <CardDescription className="text-gray-500 dark:text-gray-400">Last Updated: {pageData.lastUpdated}</CardDescription>}
            </CardHeader>
            <CardContent className="py-6 md:py-8 space-y-6">
              {pageData.sections.map((section, index) => (
                <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
                  {section.heading && <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">{section.heading}</h2>}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              ))}

              {/* As Textarea is listed, including a small feedback section */}
              <div className="mt-10 pt-6 border-t dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Feedback or Questions?</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="feedback-message" className="text-gray-700 dark:text-gray-300">Your Message</Label>
                    <Textarea
                      id="feedback-message"
                      placeholder="Enter your feedback or question regarding this policy..."
                      className="min-h-[100px] bg-white/50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600"
                    />
                  </div>
                  <Button type="submit" variant="default">Submit Feedback</Button>
                </form>
              </div>

            </CardContent>
          </Card>
        </main>
      </ScrollArea>
      <SiteFooter />
    </div>
  );
};

export default GenericContentPage;