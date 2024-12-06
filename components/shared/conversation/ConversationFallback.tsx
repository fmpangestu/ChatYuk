import { Card } from "@/components/ui/card";
import React from "react";

const ConversationFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 bg-secondary items-center justify-center text-secondary-foreground">
      Select/start a conversation to get started!
    </Card>
  );
};

export default ConversationFallback;
