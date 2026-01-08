import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MoreVertical, Search, Shield, AlertCircle, X, Trash2, LogOut, BellOff, Info, Volume2 } from 'lucide-react';
import { Screen } from '../App';
import { useUser } from '../contexts/UserContext';

interface ChatProps {
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: number;
}

const chatRooms: ChatRoom[] = [
  {
    id: 1,
    name: 'Bandra West Safety Group',
    lastMessage: 'Anyone available near Linking Road?',
    time: '2 min ago',
    unread: 3,
    online: 24,
  },
  {
    id: 2,
    name: 'Night Travel Support',
    lastMessage: 'Taking the 10 PM train, anyone traveling?',
    time: '15 min ago',
    unread: 0,
    online: 18,
  },
  {
    id: 3,
    name: 'Emergency Alerts - Mumbai',
    lastMessage: 'Heavy traffic on Western Express Highway',
    time: '1 hour ago',
    unread: 5,
    online: 156,
  },
];

const sampleMessages: Message[] = [
  {
    id: 1,
    user: 'Priya S.',
    text: 'Hi everyone! Is anyone near Linking Road right now?',
    time: '10:30 AM',
    isMe: false,
  },
  {
    id: 2,
    user: 'Anjali M.',
    text: 'Yes, I\'m at Hill Road. What do you need?',
    time: '10:32 AM',
    isMe: false,
  },
  {
    id: 3,
    user: 'You',
    text: 'I can help too! I\'m nearby at Carter Road.',
    time: '10:33 AM',
    isMe: true,
  },
  {
    id: 4,
    user: 'Priya S.',
    text: 'Thank you both! I need someone to walk with me to the station.',
    time: '10:34 AM',
    isMe: false,
  },
  {
    id: 5,
    user: 'Anjali M.',
    text: 'I can meet you in 5 minutes! Where exactly are you?',
    time: '10:35 AM',
    isMe: false,
  },
];

export function Chat({ onNavigate }: ChatProps) {
  const { userData } = useUser();
  const [chatRoomsList, setChatRoomsList] = useState<ChatRoom[]>(chatRooms);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [showChatMenu, setShowChatMenu] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupDescription.trim()) {
      alert('Please fill all fields');
      return;
    }
    
    // Create new chat room
    const newRoom: ChatRoom = {
      id: Date.now(),
      name: groupName,
      lastMessage: groupDescription,
      time: 'Just now',
      unread: 0,
      online: 1,
    };
    
    // Add to the beginning of the list
    setChatRoomsList([newRoom, ...chatRoomsList]);
    
    alert(`Safety Group "${groupName}" created successfully! 🎉\n\nYour group is now visible in the chat list. You can start inviting members and begin conversations.`);
    setShowCreateGroup(false);
    setGroupName('');
    setGroupDescription('');
  };

  const handleDeleteGroup = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`)) {
      setChatRoomsList(chatRoomsList.filter(room => room.id !== id));
      alert('Group deleted successfully');
    }
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear all messages?\n\nThis action cannot be undone.')) {
      setMessages([]);
      setShowChatMenu(false);
      alert('Chat cleared successfully');
    }
  };

  const handleExitGroup = () => {
    if (confirm(`Are you sure you want to exit "${selectedRoom?.name}"?\n\nYou will need to be re-added to see messages.`)) {
      setShowChatMenu(false);
      setSelectedRoom(null);
      alert('You have left the group');
    }
  };

  const handleMuteNotifications = () => {
    setShowChatMenu(false);
    alert('Notifications muted for this group');
  };

  const handleViewGroupInfo = () => {
    setShowChatMenu(false);
    alert(`Group: ${selectedRoom?.name}\nMembers: ${selectedRoom?.online} online\n\nGroup info feature coming soon!`);
  };

  // Filter chat rooms based on search query
  const filteredChatRooms = chatRoomsList.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Highlight matching text in search results
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-gray-900">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const renderChatRooms = () => (
    <div>
      {/* Search */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chat rooms..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Safety Notice */}
      <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-purple-900 text-sm mb-1">Safe Space Guidelines</h3>
            <p className="text-purple-700 text-xs">
              This is a safe space for women. Be respectful, supportive, and never share personal information publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Rooms List */}
      <div className="px-6 py-4 space-y-3">
        {filteredChatRooms.length > 0 ? (
          filteredChatRooms.map((room) => (
            <div
              key={room.id}
              className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all relative group"
            >
              <button
                onClick={() => setSelectedRoom(room)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 pr-8">
                    <h3 className="text-gray-900 mb-1">
                      {highlightText(room.name, searchQuery)}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{room.time}</span>
                    {room.unread > 0 && (
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full min-w-[24px] text-center">
                        {room.unread}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{room.online} online</span>
                </div>
              </button>
              
              {/* Delete Button - Shows on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGroup(room.id, room.name);
                }}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                title="Delete group"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 text-sm mb-4">
              No chat rooms match "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Create Group Button */}
      <div className="px-6 py-4">
        <button 
          onClick={() => setShowCreateGroup(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Create Safety Group</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderChatRoom = () => (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedRoom(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-gray-900">{selectedRoom?.name}</h2>
            <p className="text-sm text-gray-500">{selectedRoom?.online} online</p>
          </div>
        </div>
        <button
          onClick={() => setShowChatMenu(!showChatMenu)}
          className="text-gray-600 hover:text-gray-900"
        >
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Menu */}
      {showChatMenu && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowChatMenu(false)}
          />
          <div className="absolute right-4 top-16 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 min-w-[220px] overflow-hidden">
            <button
              onClick={handleViewGroupInfo}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <Info className="w-5 h-5 text-gray-600" />
              <span>Group Info</span>
            </button>
            <button
              onClick={handleMuteNotifications}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <BellOff className="w-5 h-5 text-gray-600" />
              <span>Mute Notifications</span>
            </button>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <Trash2 className="w-5 h-5 text-gray-600" />
              <span>Clear Chat</span>
            </button>
            <div className="border-t border-gray-200" />
            <button
              onClick={handleExitGroup}
              className="flex items-center gap-3 w-full px-4 py-3 text-orange-600 hover:bg-orange-50 transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Exit Group</span>
            </button>
            <button
              onClick={() => {
                handleDeleteGroup(selectedRoom?.id || 0, selectedRoom?.name || '');
                setShowChatMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Group</span>
            </button>
          </div>
        </>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.isMe
                    ? 'bg-purple-600 text-white'
                    : 'bg-white shadow-md text-gray-900'
                }`}
              >
                {!message.isMe && (
                  <div className="text-xs text-purple-600 mb-1">{message.user}</div>
                )}
                <p className="text-sm">{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.isMe ? 'text-purple-200' : 'text-gray-500'
                  }`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {!selectedRoom ? (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('profile')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-gray-900">SafeSpace Chat</h1>
                <p className="text-sm text-gray-600">Connect with the community</p>
              </div>
            </div>
          </div>

          {renderChatRooms()}
        </>
      ) : (
        renderChatRoom()
      )}

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Create Safety Group</h2>
              <button onClick={() => setShowCreateGroup(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Andheri West Safety Group"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Description</label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="Describe the purpose of this safety group..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="text-sm text-purple-900 mb-2">Group Guidelines</h3>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Keep conversations respectful and supportive</li>
                  <li>• Never share personal information publicly</li>
                  <li>• Report any inappropriate behavior</li>
                  <li>• Use for safety coordination only</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleCreateGroup}
              className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700"
            >
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
}