/* eslint-disable @typescript-eslint/no-explicit-any */
// import NotificationSound from "@/components/shared/conversation/NotificationSound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  className?: string;
  onClick?: () => void;
  unseenCount?: number;
  // messages: any;
};

const DMConversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  className,
  onClick,
  unseenCount,
  // messages,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card
        onClick={onClick}
        className={`${className} p-2 flex flex-row items-center justify-between truncate`}
      >
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
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
        {/* <NotificationSound messages={messages} /> */}
      </Card>
    </Link>
  );
};

export default DMConversationItem;
