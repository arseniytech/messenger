import { useEffect } from 'react';
import { useMessageStore, type User } from '../store/messageStore';

const ChatItem = ({
  userName,
  userAvatar,
  userOnline,
  messageTime,
  userMessage,
}: User) => {
  const setActiveUser = useMessageStore((s) => s.setActiveUser);

  return (
    <div
      className="chatList"
      onClick={() =>
        setActiveUser({
          userName,
          userAvatar,
          userOnline,
          messageTime,
          userMessage,
        })
      }
    >
      <div className="chatItem">
        <img src={userAvatar} className="avatar" />
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{userName}</span>
            <span className="chatTime">{messageTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatList = () => {
  const contacts = useMessageStore((s) => s.contacts);
  const setContacts = useMessageStore((s) => s.setContacts);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await fetch('http://localhost:4000/contacts');
        const data = await response.json();

        // Map API data into your `User` shape
        const users: User[] = data.map((row: any) => ({
          userName: row.username,
          userMessage: '', // we don't store this in DB yet
          userAvatar: row.avatar_url,
          userOnline: row.is_online,
          messageTime: '', // could come from last message later
          lastMessage: '',
        }));

        setContacts(users);
      } catch (error) {
        console.error('Failed to load contacts', error);
      }
    };

    loadContacts();
  }, [setContacts]);

  return (
    <div className="chatContainer">
      {contacts.map((c) => (
        <ChatItem key={c.userName} {...c} />
      ))}
    </div>
  );
};