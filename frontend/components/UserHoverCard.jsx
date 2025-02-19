import { useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function UserHoverCard({ trigger, content, userId }) {

useEffect(()=>{

})

  return (
    <HoverCard>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent className="w-80 border-none rounded-xl ">
        <div className="w-full">
          <div className="h-14 w-14 rounded-full bg-red-400"></div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserHoverCard;
