/* eslint-disable react-hooks/rules-of-hooks */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
};

const ConversationPage = ({ params }: Props) => {
  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "Video" | null>(null);

  useEffect(() => {
    params
      .then((resolvedParams) => {
        setConversationId(resolvedParams.conversationId);
      })
      .catch((error) => {
        console.error("Failed to load params:", error);
        setConversationId(null); // Set null explicitly if params fail
      });
  }, [params]);

  const conversation = useQuery(
    api.conversation.get,
    conversationId ? { id: conversationId } : "skip" // Only query when id is available
  );

  if (conversationId === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8" />
      </div>
    );
  }

  if (conversation === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8" />
      </div>
    );
  }

  if (conversation === null) {
    return (
      <p className="w-full h-full flex items-center justify-center">
        Conversation not found
      </p>
    );
  }

  return (
    <ConversationContainer>
      {conversationId && (
        <RemoveFriendDialog
          conversationId={conversationId}
          open={removeFriendDialogOpen}
          setOpen={setRemoveFriendDialogOpen}
        />
      )}
      {conversationId && (
        <DeleteGroupDialog
          conversationId={conversationId}
          open={deleteGroupDialogOpen}
          setOpen={setDeleteGroupDialogOpen}
        />
      )}
      {conversationId && (
        <LeaveGroupDialog
          conversationId={conversationId}
          open={leaveGroupDialogOpen}
          setOpen={setLeaveGroupDialogOpen}
        />
      )}
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remove friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
        isGroup={conversation.isGroup}
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
