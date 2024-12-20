import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex justify-center whitespace-nowrap focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full border-none",
  {
    variants: {
      variant: {
        outline:
          "border border-input",
        ghost: "hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto",
        sm: "h-8 rounded-md text-xs",
        lg: "h-10 rounded-md",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const ThemeButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
ThemeButton.displayName = "Button"

export { ThemeButton, buttonVariants }
