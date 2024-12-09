import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
// import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: Id<"conversations">;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  className?: string;
  onClick?: () => void;
  unseenCount?: number;
};

const GroupConversationItem = ({
  id,
  name,
  lastMessageContent,
  lastMessageSender,
  className,
  onClick,
  unseenCount,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card
        onClick={onClick}
        className={`${className} p-2 flex flex-row items-center gap-4 truncate`}
      >
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            {/* <AvatarImage src={imageUrl} /> */}
            <AvatarFallback>
              {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">{lastMessageSender}:</p>
                <p className="truncate overflow-elipsis">
                  &nbsp;{lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Start the conversation!
              </p>
            )}
          </div>
        </div>
        {unseenCount ? (
          <Badge className="w-5 h-5 flex items-center justify-center">
            {unseenCount}
          </Badge>
        ) : null}
      </Card>
    </Link>
  );
};

export default GroupConversationItem;
