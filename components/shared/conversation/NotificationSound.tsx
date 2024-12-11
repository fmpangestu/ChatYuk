/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

interface NotificationSoundProps {
  messages: any[];
}

const NotificationSound: React.FC<NotificationSoundProps> = ({ messages }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevMessagesLength = useRef(messages.length);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const newMessage = messages[messages.length - 1];
      if (newMessage.message._id !== lastMessageId) {
        // Putar suara ketika ada pesan baru
        if (audioRef.current) {
          audioRef.current.play();
        }
        setLastMessageId(newMessage.message._id);
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, lastMessageId]);

  return <audio ref={audioRef} src="/notification.mp3" />;
};

export default NotificationSound;
