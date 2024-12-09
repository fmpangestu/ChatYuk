/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const ConversationsPage = (props: Props) => {
  return <ConversationFallback />;
};

export default ConversationsPage;
