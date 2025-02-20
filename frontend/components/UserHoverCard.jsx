import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function UserHoverCard({ trigger, content, userId }) {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent className="border-none   h-full w-full shadow-2xl shadow-[#c0c0c0] dark:shadow-[#000] translate-x-28  rounded-xl">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserHoverCard;
