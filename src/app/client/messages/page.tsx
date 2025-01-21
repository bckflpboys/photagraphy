'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockConversations, mockMessages, type Conversation, type Message } from '@/app/api/mockMessages';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  TextField,
  IconButton,
  Button,
  Badge,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}) {
  const [search, setSearch] = React.useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.participants.some((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4">
        <TextField
          fullWidth
          placeholder="Search conversations..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (p) => p.type === 'photographer'
          )!;
          const isSelected = selectedConversation?.id === conversation.id;

          return (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-primary/10 border-l-4 border-primary'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={otherParticipant.avatar}
                    alt={otherParticipant.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {conversation.unreadCount > 0 && (
                    <Badge
                      badgeContent={conversation.unreadCount}
                      color="primary"
                      className="absolute -top-1 -right-1"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white truncate">
                      {otherParticipant.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(conversation.lastMessage.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MessageBubble({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        <Image
          src={message.sender.avatar}
          alt={message.sender.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div
          className={`max-w-[70%] ${
            isCurrentUser
              ? 'bg-primary text-white rounded-l-xl rounded-tr-xl'
              : 'bg-gray-800 text-white rounded-r-xl rounded-tl-xl'
          } p-3 relative group`}
        >
          {/* Message Content */}
          <p className="text-sm">{message.content}</p>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.name}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Timestamp and Status */}
          <div className={`flex items-center space-x-1 mt-1 text-xs ${
            isCurrentUser ? 'text-blue-200' : 'text-gray-400'
          }`}>
            <span>
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
            {isCurrentUser && (
              <div className="flex items-center">
                {message.status === 'sent' && <CheckIcon className="w-4 h-4" />}
                {message.status === 'delivered' && (
                  <div className="flex">
                    <CheckIcon className="w-4 h-4" />
                    <CheckIcon className="w-4 h-4 -ml-2" />
                  </div>
                )}
                {message.status === 'read' && (
                  <CheckCircleIcon className="w-4 h-4" />
                )}
              </div>
            )}
          </div>

          {/* Context Menu */}
          <IconButton
            size="small"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon className="w-4 h-4 text-gray-400" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => setMenuAnchor(null)}>Copy</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Reply</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)} className="text-red-500">
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

function ChatView({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: Message[];
}) {
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Handle sending message
    setNewMessage('');
  };

  const otherParticipant = conversation.participants.find(
    (p) => p.type === 'photographer'
  )!;

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="font-medium text-white">{otherParticipant.name}</h2>
            <span className="text-sm text-gray-400">Photographer</span>
          </div>
        </div>
        <IconButton>
          <MoreVertIcon className="text-gray-400" />
        </IconButton>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MessageBubble
                message={message}
                isCurrentUser={message.sender.type === 'client'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="bg-gray-800"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div className="flex items-center space-x-1">
                    <Tooltip title="Attach file">
                      <IconButton size="small">
                        <AttachFileIcon className="text-gray-400" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send image">
                      <IconButton size="small">
                        <ImageIcon className="text-gray-400" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary/90"
            onClick={handleSend}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessagesContent() {
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(null);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))]">
      {/* Conversations Sidebar */}
      <div className="w-96 border-r border-gray-700 bg-gray-900">
        <ConversationList
          conversations={mockConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Chat View */}
      <div className="flex-1 bg-gray-900">
        {selectedConversation ? (
          <ChatView
            conversation={selectedConversation}
            messages={mockMessages[selectedConversation.id]}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <SendIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Select a Conversation
              </h3>
              <p className="text-gray-400">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <DashboardLayout userType="client">
      <MessagesContent />
    </DashboardLayout>
  );
}
