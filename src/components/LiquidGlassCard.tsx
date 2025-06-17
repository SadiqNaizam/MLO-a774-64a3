import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
  interactive?: boolean; // Add hover effect if true
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className,
  title,
  description,
  footerContent,
  interactive = false,
}) => {
  console.log("Rendering LiquidGlassCard with title:", title);

  return (
    <Card
      className={cn(
        "bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg shadow-lg border border-white/20 dark:border-slate-700/40",
        "transition-all duration-300",
        interactive ? "hover:shadow-2xl hover:scale-[1.02] hover:border-white/40 dark:hover:border-slate-600/60" : "",
        className
      )}
    >
      {title && (
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">{title}</CardTitle>
          {description && <CardDescription className="text-gray-700 dark:text-gray-300">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(title ? "" : "pt-6", "text-gray-800 dark:text-gray-200")}>
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default LiquidGlassCard;