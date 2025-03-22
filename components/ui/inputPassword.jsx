import { Eye, EyeOff } from 'lucide-react';
import * as React from "react";
import { cn } from "@/lib/utils";

function InputPassword({
    className,
    ...props
}) {
    // Start with false (password hidden, Eye icon showing)
    const [visible, setVisible] = React.useState(false);
    const inputRef = React.useRef(null);

    // Enhanced toggle for immediate response
    const toggleVisibility = () => {
        if (inputRef.current) {
            // Set the new state first
            const newVisibleState = !visible;
            setVisible(newVisibleState);

            // Then immediately update the input type
            inputRef.current.type = newVisibleState ? "text" : "password";
        }
    };

    React.useEffect(() => {
        // Ensure the input type matches the visible state on component mount
        if (inputRef.current) {
            inputRef.current.type = visible ? "text" : "password";
        }
    }, [visible]);

    return (
        <div className="relative flex w-full">
            <input
                ref={inputRef}
                spellCheck="false"
                type="password"
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-primary",
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
                aria-label={visible ? "Hide password" : "Show password"}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleVisibility();
                    }
                }}
            >
                {visible ? (
                    <EyeOff className="h-4 w-4 text-sidebar-ring" />
                ) : (
                    <Eye className="h-4 w-4 text-sidebar-ring" />
                )}
            </div>
        </div>
    );
}

export { InputPassword };