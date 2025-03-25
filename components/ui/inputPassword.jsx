import { Eye, EyeOff } from 'lucide-react';
import * as React from "react";
import { cn } from "@/lib/utils";

function InputPassword({
    className,
    type: _type,
    ...props
}) {
    const [type, setType] = React.useState('password');

    const toggleVisibility = () => {
        if (type === 'password') {
            setType('text');
        }
        else {
            setType('password');
        }
    };

    return (
        <div className="relative flex w-full">
            <input
                spellCheck="false"
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "pr-10", // Add padding for the eye icon
                    className
                )}
                {...props}
            />
            <div
                onClick={toggleVisibility}
                className="absolute right-3 bottom-0 flex items-center justify-center h-[36px] text-gray-500 hover:text-gray-700 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={type === 'password' ? "Show password" : "Hide password"}
                onKeyDown={(e) => {
                    // if (e.key === "Enter" || e.key === " ") {
                    //     e.preventDefault();
                    //     toggleVisibility();
                    // }
                }}
            >
                {type === 'password' ? (
                    <Eye className="h-4 w-4 text-sidebar-ring" />
                ) : (
                    <EyeOff className="h-4 w-4 text-sidebar-ring" />
                )}
            </div>
        </div>
    );
}

export { InputPassword };