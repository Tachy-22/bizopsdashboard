import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <Image
        src="/bizops-logo.png"
        alt="BizOps Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}