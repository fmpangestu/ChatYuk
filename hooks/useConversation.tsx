import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const params = useParams();
  console.log(params);

  const conversationId = useMemo(
    () => params?.conversationId || ("" as string),
    [params?.conversationId]
  );

  const isActive = useMemo(() => !!conversationId, [conversationId]);
  console.log(isActive);
  return {
    isActive,
    conversationId,
  };
};
