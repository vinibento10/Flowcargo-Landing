import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function ImageWithSkeleton({ className, src, alt, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-white/5", className)}>
      {/* Skeleton Loader */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer z-10",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite linear",
        }}
      />
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
