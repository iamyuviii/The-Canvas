import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full h-[80px] flex flex-col items-center justify-center rounded-xl bg-white/60 backdrop-blur-md shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-100/60 hover:shadow-lg",
        isActive && "bg-blue-200/80 text-primary scale-105 shadow-xl border-2 border-blue-400"
      )}
    >
      <Icon className="size-8 mb-1" />
      <span className="font-semibold text-sm tracking-wide">
        {label}
      </span>
    </Button>
  );
};
