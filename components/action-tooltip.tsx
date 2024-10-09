"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { Label } from "@radix-ui/react-label";


interface ActionTooltipProps {
    label : string;
    children : React.ReactNode;
    side? : "top" | "right" | "bottom" | "left";
    align? : "start" | "center" | "end"
}

export const ActionTooltip = ({label, children, side, align} : ActionTooltipProps) =>{
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}