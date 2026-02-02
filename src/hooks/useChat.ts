import { useCallback, useMemo } from 'react';
import { useMessageStore } from '../store/messageStore';

export const useChat = () => {
  const activeUser = useMessageStore(s => s.activeUser);
  const addMessage = useMessageStore(s => s.addMessage);

  const sendMessage = useCallback((text: string) => {
    if (!activeUser) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(activeUser.userName, trimmed, true);
  }, [activeUser, addMessage]);

  return useMemo(() => ({ activeUser, sendMessage }), [activeUser, sendMessage]);
};

  
