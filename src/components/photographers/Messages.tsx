import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Divider,
  Paper,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isRead: boolean;
  avatar: string;
}

interface Conversation {
  id: number;
  contact: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar: string;
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    // Format date consistently for both server and client
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();
    return `${month}/${day}/${year}`;
  }
};

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample data
  const conversations: Conversation[] = [
    {
      id: 1,
      contact: 'John Smith',
      lastMessage: 'Looking forward to the wedding shoot!',
      timestamp: new Date(2024, 0, 27, 10, 30),
      unread: 2,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      lastMessage: 'Can we reschedule the family photo session?',
      timestamp: new Date(2024, 0, 27, 9, 15),
      unread: 1,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      contact: 'Mike Wilson',
      lastMessage: 'The engagement photos look amazing!',
      timestamp: new Date(2024, 0, 26, 15, 45),
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  const messages: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        text: 'Hi, I wanted to discuss the wedding photography package',
        sender: 'John Smith',
        timestamp: new Date(2024, 0, 27, 10, 0),
        isRead: true,
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: 2,
        text: "Of course! I'm happy to go through the details with you",
        sender: 'me',
        timestamp: new Date(2024, 0, 27, 10, 15),
        isRead: true,
        avatar: '/path/to/your/avatar.jpg',
      },
      {
        id: 3,
        text: 'Looking forward to the wedding shoot!',
        sender: 'John Smith',
        timestamp: new Date(2024, 0, 27, 10, 30),
        isRead: false,
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    ],
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Add message handling logic here
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)', 
      display: 'flex', 
      gap: 2,
      p: 0, 
      backgroundColor: '#121212',
      flexDirection: { xs: 'column', sm: 'row' }
    }}>
      {/* Conversations List */}
      <Card sx={{ 
        width: { xs: '100%', sm: 360 },
        display: { 
          xs: selectedConversation ? 'none' : 'flex', 
          sm: 'flex' 
        },
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        flex: { xs: 1, sm: 'none' }
      }}>
        <CardContent sx={{ flex: '0 0 auto', pb: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
            Messages
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />,
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                '& input': {
                  color: '#fff'
                }
              }
            }}
            sx={{ mb: 2 }}
          />
        </CardContent>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List sx={{ flex: 1, overflow: 'auto' }}>
          {filteredConversations.map((conv) => (
            <React.Fragment key={conv.id}>
              <ListItemButton
                onClick={() => setSelectedConversation(conv.id)}
                sx={{
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.15)'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
                selected={selectedConversation === conv.id}
              >
                <ListItemAvatar>
                  <Badge
                    badgeContent={conv.unread}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                      }
                    }}
                  >
                    <Avatar 
                      src={conv.avatar} 
                      sx={{ 
                        width: 45, 
                        height: 45,
                        border: '2px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={conv.contact}
                  secondary={conv.lastMessage}
                  primaryTypographyProps={{
                    sx: { 
                      color: '#fff',
                      fontWeight: conv.unread ? 600 : 400
                    }
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    sx: { 
                      color: conv.unread ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                      fontWeight: conv.unread ? 500 : 400
                    }
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem',
                    ml: 1
                  }}
                >
                  {formatTimeAgo(conv.timestamp)}
                </Typography>
              </ListItemButton>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* Chat Window */}
      <Card sx={{ 
        flex: 1,
        display: { 
          xs: !selectedConversation ? 'none' : 'flex', 
          sm: 'flex' 
        },
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <CardContent sx={{ 
              flex: '0 0 auto', 
              borderBottom: 1, 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2
            }}>
              {isMobile && (
                <IconButton 
                  onClick={() => setSelectedConversation(null)}
                  sx={{ color: 'white' }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Avatar
                src={conversations.find(c => c.id === selectedConversation)?.avatar}
                sx={{ 
                  width: 45, 
                  height: 45,
                  border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                  {conversations.find(c => c.id === selectedConversation)?.contact}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4caf50' }}>
                  Online
                </Typography>
              </Box>
            </CardContent>

            {/* Messages */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto', 
              p: { xs: 1, sm: 3 },
              backgroundColor: '#121212'
            }}>
              {messages[selectedConversation]?.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        backgroundColor: message.sender === 'me' ? '#1976d2' : 'rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        borderRadius: 2,
                        maxWidth: '100%',
                        wordWrap: 'break-word'
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        ml: 1,
                        mt: 0.5,
                        alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start',
                        fontSize: '0.75rem'
                      }}
                    >
                      {formatTimeAgo(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <CardContent sx={{ 
              flex: '0 0 auto', 
              borderTop: 1, 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              p: { xs: 1, sm: 2 }
            }}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    multiline
                    maxRows={4}
                    InputProps={{
                      sx: {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        '& textarea': {
                          color: '#fff'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    sx={{ 
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(255, 255, 255, 0.12)'
                      }
                    }}
                  >
                    <SendIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: '#121212'
            }}
          >
            <Typography variant="h6">Select a conversation to start messaging</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Messages;
