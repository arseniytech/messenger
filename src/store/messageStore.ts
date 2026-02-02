import { create } from 'zustand';



export type Message = {
    text: string;
    sent: boolean;
};

export type User = {
  userName: string;
  userMessage: string;
  userAvatar?: string;
  userOnline: boolean;
  messageTime?: string;
  lastMessage?: string;
};


type MessageStore = {
  contacts: User[];
  activeUser: User | null;
  messages: Record<string, Message[]>;
  setContacts: (contacts: User[]) => void;
  setActiveUser: (user: User) => void;
  addMessage: (userName: string, text: string, sent?: boolean) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  // start with empty contacts; we'll load them from the API
  contacts: [],

  activeUser: null,

  messages: {},

  setContacts: (contacts) => set({ contacts }),

  setActiveUser: (user) => {
    console.log('setActiveUser', user);
    set({ activeUser: user });
  },

  addMessage: (userName, text, sent = true) => {
    const { messages } = get();
    const userMessages = messages[userName] || [];
    const updatedMessages = {
      ...messages,
      [userName]: [...userMessages, { text, sent }],
    };
    set({ messages: updatedMessages });
  },
}));

