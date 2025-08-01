import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/class-merge"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant = "default", size = "default", asChild = false, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // Base classes for all buttons
        const baseClasses =
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

        // Variant-specific classes
        const variantClasses = {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            outline:
                "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        };

        // Size-specific classes
        const sizeClasses = {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        };

        return (
            <Comp
                className={cn(
                    baseClasses,
                    variantClasses[variant], // Apply selected variant styles
                    sizeClasses[size], // Apply selected size styles
                    className // Merge with custom className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };