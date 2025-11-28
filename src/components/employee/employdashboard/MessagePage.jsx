import { useState, useRef } from 'react';
import { FaPaperPlane, FaEllipsisV, FaArrowLeft } from 'react-icons/fa';

const initialChatData = [
  {
    id: 1,
    name: 'TechPrint Hub',
    time: '17 min',
    preview: 'Goo, its been good news all day.',
    avatar: 'bg-gradient-to-br from-slate-400 to-slate-600',
    initial: 'T',
    messages: [
      {
        id: 1,
        text: 'Hi team, the new printer is ready.',
        sent: false,
        time: '6:21 PM',
        sender: 'T. Admin',
      },
      {
        id: 2,
        text: 'Goo, its been good news all day.',
        sent: false,
        time: '6:21 PM',
        sender: 'T. Admin',
      },
      {
        id: 3,
        text: 'Great! I will update the inventory.',
        sent: true,
        time: '6:22 PM',
        sender: 'You',
      },
    ],
    senderInitial: 'T',
  },
  {
    id: 2,
    name: '3D Maker Store',
    time: '1 hr',
    preview: 'Are you coming to class tomorrow?',
    avatar: 'bg-gradient-to-br from-green-600 to-green-800',
    initial: '3',
    messages: [
      {
        id: 1,
        text: 'Are you coming to class tomorrow?',
        sent: false,
        time: '5:00 PM',
        sender: 'Alex',
      },
      {
        id: 2,
        text: 'Yes, around 10 AM. See you there.',
        sent: true,
        time: '5:05 PM',
        sender: 'You',
      },
    ],
    senderInitial: 'A',
  },
  {
    id: 3,
    name: 'Printify Zone',
    time: '2 hrs',
    preview: 'I miss you dude, when are you coming?',
    avatar: 'bg-gradient-to-br from-orange-400 to-orange-600',
    initial: 'P',
    messages: [
      {
        id: 1,
        text: 'I miss you dude, when are you coming?',
        sent: false,
        time: '4:00 PM',
        sender: 'PZ Admin',
      },
      {
        id: 2,
        text: 'Next week, for sure!',
        sent: true,
        time: '4:15 PM',
        sender: 'You',
      },
    ],
    senderInitial: 'P',
  },
  {
    id: 4,
    name: 'GadgetForge',
    time: '3 hrs',
    preview: 'Baba what sup na, you still de Lagos?',
    avatar: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    initial: 'G',
    messages: [
      {
        id: 1,
        text: 'Baba what sup na, you still de Lagos?',
        sent: false,
        time: '3:00 PM',
        sender: 'GF Buddy',
      },
      {
        id: 2,
        text: 'Just landed yesterday!',
        sent: true,
        time: '3:10 PM',
        sender: 'You',
      },
    ],
    senderInitial: 'B',
  },
];

const defaultChat = {
  id: 99,
  name: 'Ope',
  time: '6:23 PM',
  preview: 'You dey hung dier you kai say house dey',
  avatar: 'bg-gradient-to-br from-blue-400 to-blue-600',
  initial: 'O',
  messages: [
    { id: 1, text: 'Yo mandem', sent: false, time: '6:21 PM', sender: 'Ope' },
    {
      id: 2,
      text: 'Cho dey house?',
      sent: false,
      time: '6:21 PM',
      sender: 'Ope',
    },
    { id: 3, text: 'Kwasia 😂😂', sent: true, time: '6:22 PM', sender: 'You' },
    {
      id: 4,
      text: 'You dey hung dier you kai say house dey',
      sent: true,
      time: '6:23 PM',
      sender: 'You',
    },
  ],
  senderInitial: 'O',
};

export default function MessagePage() {
  const [chats, setChats] = useState([defaultChat, ...initialChatData]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  const currentChat = chats[selectedChatIndex];
  const currentMessages = currentChat.messages;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessage = {
      id: currentMessages.length + 1,
      text: inputValue,
      sent: true,
      time: timeStr,
      sender: 'You',
    };

    const updatedChats = chats.map((chat, index) => {
      if (index === selectedChatIndex) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          preview: inputValue,
          time: timeStr,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInputValue('');

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectChat = (index) => {
    setSelectedChatIndex(index);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  return (
    <div className='flex h-screen bg-[#fafffd] overflow-hidden p-4 md:px-12'>
      {/* Left Panel */}
      <div
        className={`${showChat ? 'hidden' : 'flex'
          } md:flex w-full md:w-80 flex-col bg-white border-r border-gray-200 shadow-sm flex-shrink-0`}
      >
        <div className='p-3 sm:p-4 border-b border-gray-200 bg-[#EEEEEE] flex items-center justify-between'>
          <h2 className='text-base sm:text-lg font-bold text-gray-900'>
            Recent Messages
          </h2>
          <button className='text-gray-500 hover:text-gray-700 p-1 rounded-full transition'>
            <FaEllipsisV size={18} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto bg-[#EEEEEE]'>
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(index)}
              className={`px-3 sm:px-4 py-3 cursor-pointer transition-all duration-200 ${selectedChatIndex === index ? 'bg-white' : 'hover:bg-gray-100'
                }`}
            >
              <div className='flex gap-3'>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 ${chat.avatar} shadow-md flex items-center justify-center text-white font-bold text-xs sm:text-sm border-2 border-white`}
                >
                  {chat.initial}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-start gap-2'>
                    <h3 className='font-semibold text-xs sm:text-sm text-gray-900'>
                      {chat.name}
                    </h3>
                    <span className='text-xs text-gray-400 whitespace-nowrap'>
                      {chat.time}
                    </span>
                  </div>
                  <p className='text-xs text-gray-600 line-clamp-1 mt-1'>
                    {chat.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`${showChat ? 'flex' : 'hidden'
          } md:flex flex-1 flex-col bg-[#F8F8F8] min-h-0 w-full`}
      >
        <div className='px-3 sm:px-4 md:px-6 py-[10px] border-b border-gray-200 bg-[#EEEEEE] flex items-center justify-between shadow-sm'>
          <div className='flex items-center gap-3 flex-1'>
            <button
              onClick={handleBack}
              className='md:hidden text-gray-600 hover:text-gray-900 p-1 rounded-full transition'
            >
              <FaArrowLeft size={20} />
            </button>
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${currentChat.avatar} border-2 border-blue-300 shadow-md flex items-center justify-center text-white font-bold text-xs sm:text-base`}
            >
              {currentChat.initial}
            </div>
            <div>
              <h2 className='font-semibold text-gray-900 text-xs sm:text-base'>
                {currentChat.name}
              </h2>
              <p className='text-xs text-green-600 font-medium'>Active</p>
            </div>
          </div>
          <button className='text-gray-400 hover:text-gray-600 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition'>
            <FaEllipsisV size={20} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 bg-gradient-to-b from-white to-gray-50 min-h-0'>
          <div className='text-center py-2'>
            <p className='text-gray-400 text-xs sm:text-sm font-medium'>
              Thursday, Jan 4 • 6:21 PM
            </p>
          </div>
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'
                } gap-2 sm:gap-3`}
            >
              {!msg.sent && (
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${currentChat.avatar} flex-shrink-0 shadow-md flex items-center justify-center text-white text-xs font-bold`}
                >
                  {currentChat.senderInitial}
                </div>
              )}
              <div
                className={`max-w-[70%] sm:max-w-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-sm ${msg.sent
                    ? 'bg-[#D4E4FC] text-gray-900 rounded-br-none'
                    : 'bg-[#E4E7EC] text-gray-800 rounded-bl-none'
                  }`}
              >
                <p className='text-xs sm:text-sm break-words'>{msg.text}</p>
                <span className='block text-[10px] sm:text-xs text-gray-500 mt-1 text-right'>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='px-3 sm:px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 bg-[#F8F8F8]'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='flex-1 flex gap-2 sm:gap-3 items-center bg-[#FFFFFF] rounded-full px-3 sm:px-4 py-2 border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-200 transition'>
              <input
                type='text'
                placeholder='Text message...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className='flex-1 h-8 bg-transparent focus:outline-none text-xs sm:text-sm text-gray-900 placeholder-[#98A2B3]'
              />
            </div>

            <button
              onClick={handleSend}
              className='bg-white hover:bg-[#F0F2F5] h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex justify-center items-center rounded-full text-blue-500 hover:text-blue-600 shadow-md transition flex-shrink-0'
            >
              <FaPaperPlane size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
