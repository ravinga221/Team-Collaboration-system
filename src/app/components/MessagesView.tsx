import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Hash, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./ui/utils";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isSelf?: boolean;
  isNew?: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: "channel" | "direct";
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  avatar?: string;
  isOnline?: boolean;
  members?: number;
  isPrivate?: boolean;
}

interface MessagesViewProps {
  currentUser: {
    name: string;
    avatar: string;
  };
}

export function MessagesView({ currentUser }: MessagesViewProps) {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = [
    {
      id: "1",
      name: "general",
      type: "channel",
      unread: 3,
      lastMessage: "Alex: Let's sync up this afternoon",
      lastMessageTime: "2m ago",
      members: 12,
      isPrivate: false,
    },
    {
      id: "2",
      name: "project-alpha",
      type: "channel",
      unread: 0,
      lastMessage: "Sarah: Design files are ready",
      lastMessageTime: "1h ago",
      members: 5,
      isPrivate: true,
    },
    {
      id: "3",
      name: "developers",
      type: "channel",
      unread: 7,
      lastMessage: "Mike: PR needs review",
      lastMessageTime: "5m ago",
      members: 8,
      isPrivate: false,
    },
  ];

  const directMessages: Channel[] = [
    {
      id: "dm1",
      name: "Alex Chen",
      type: "direct",
      unread: 2,
      lastMessage: "Can you review my code?",
      lastMessageTime: "3m ago",
      avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
      isOnline: true,
    },
    {
      id: "dm2",
      name: "Sarah Johnson",
      type: "direct",
      unread: 0,
      lastMessage: "Thanks for the feedback!",
      lastMessageTime: "30m ago",
      avatar: "bg-gradient-to-br from-green-500 to-teal-600",
      isOnline: true,
    },
    {
      id: "dm3",
      name: "Mike Torres",
      type: "direct",
      unread: 0,
      lastMessage: "See you tomorrow!",
      lastMessageTime: "2h ago",
      avatar: "bg-gradient-to-br from-orange-500 to-red-600",
      isOnline: false,
    },
    {
      id: "dm4",
      name: "Emily White",
      type: "direct",
      unread: 1,
      lastMessage: "Quick question about the DB",
      lastMessageTime: "1h ago",
      avatar: "bg-gradient-to-br from-pink-500 to-purple-600",
      isOnline: true,
    },
  ];

  // Mock messages for selected channel
  const channelMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        sender: "Sarah Johnson",
        avatar: "bg-gradient-to-br from-green-500 to-teal-600",
        text: "Hey team! Just finished the new design mockups 🎨",
        time: "10:30 AM",
      },
      {
        id: "2",
        sender: "Alex Chen",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
        text: "Awesome! Can you share them in the project channel?",
        time: "10:32 AM",
      },
      {
        id: "3",
        sender: "Mike Torres",
        avatar: "bg-gradient-to-br from-orange-500 to-red-600",
        text: "Looking forward to seeing them. Are they mobile-responsive?",
        time: "10:35 AM",
      },
      {
        id: "4",
        sender: "Sarah Johnson",
        avatar: "bg-gradient-to-br from-green-500 to-teal-600",
        text: "Yes! I've designed for mobile, tablet, and desktop views. Will upload shortly.",
        time: "10:36 AM",
      },
    ],
    "dm1": [
      {
        id: "1",
        sender: "Alex Chen",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
        text: "Hey! I just pushed some changes to the auth module.",
        time: "2:15 PM",
      },
      {
        id: "2",
        sender: "John Doe",
        avatar: currentUser.avatar,
        text: "Great! I'll take a look in a few minutes.",
        time: "2:16 PM",
        isSelf: true,
      },
      {
        id: "3",
        sender: "Alex Chen",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
        text: "Can you review my code? It's in PR #234",
        time: "2:18 PM",
      },
      {
        id: "4",
        sender: "Alex Chen",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
        text: "Thanks in advance! 🙏",
        time: "2:18 PM",
      },
    ],
  };

  useEffect(() => {
    if (activeChannel) {
      setMessages(channelMessages[activeChannel.id] || []);
    }
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && activeChannel) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: currentUser.name,
        avatar: currentUser.avatar,
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSelf: true,
        isNew: true,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
    }
  };

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDirectMessages = directMessages.filter((dm) =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
      {/* Sidebar - Channels and DMs */}
      <div className="col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <Tabs defaultValue="channels" className="h-full flex flex-col">
              <TabsList className="mx-4 grid w-auto grid-cols-2">
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
              </TabsList>
              
              <TabsContent value="channels" className="flex-1 overflow-y-auto mt-0">
                <div className="space-y-1 p-2">
                  {filteredChannels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors",
                        activeChannel?.id === channel.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {channel.isPrivate ? (
                          <Lock className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Hash className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="font-medium text-sm">{channel.name}</span>
                        {channel.unread > 0 && (
                          <Badge variant="destructive" className="ml-auto rounded-full h-5 min-w-5 px-1.5 text-xs">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate pl-6">
                        {channel.lastMessage}
                      </p>
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="direct" className="flex-1 overflow-y-auto mt-0">
                <div className="space-y-1 p-2">
                  {filteredDirectMessages.map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() => setActiveChannel(dm)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors",
                        activeChannel?.id === dm.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${dm.avatar}`}
                          >
                            {dm.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          {dm.isOnline && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">{dm.name}</span>
                            {dm.unread > 0 && (
                              <Badge variant="destructive" className="rounded-full h-5 min-w-5 px-1.5 text-xs">
                                {dm.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {dm.lastMessage}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="col-span-9">
        {activeChannel ? (
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeChannel.type === "channel" ? (
                    <>
                      {activeChannel.isPrivate ? (
                        <Lock className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Hash className="w-5 h-5 text-slate-400" />
                      )}
                      <div>
                        <h3 className="font-semibold">{activeChannel.name}</h3>
                        <p className="text-xs text-slate-500">
                          {activeChannel.members} members
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activeChannel.avatar}`}
                        >
                          {activeChannel.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        {activeChannel.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{activeChannel.name}</h3>
                        <p className="text-xs text-slate-500">
                          {activeChannel.isOnline ? "Active now" : "Offline"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={message.isNew ? { opacity: 0, y: 20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-3",
                      message.isSelf && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 ${message.avatar}`}
                    >
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className={cn("flex-1 max-w-md", message.isSelf && "flex flex-col items-end")}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-slate-500">{message.time}</span>
                      </div>
                      <div
                        className={cn(
                          "inline-block p-3 rounded-lg",
                          message.isSelf
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900"
                        )}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder={`Message ${activeChannel.type === "channel" ? "#" + activeChannel.name : activeChannel.name}...`}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="resize-none"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Hash className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Select a conversation to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
