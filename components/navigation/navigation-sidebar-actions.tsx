"use client"

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationSidebarActions = () => {

    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip label="Add a server" align="center" side="right">

                <button className="group flex items-center"
                onClick={()=>{onOpen("createServer")}}
                >
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] transition-all group-hover:rounded-[16px] overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
}