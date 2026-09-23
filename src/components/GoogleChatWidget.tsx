/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, Send, Plus, ChevronLeft, LogOut, Loader2, 
  AlertCircle, X, HelpCircle, Check, Terminal, ExternalLink, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { googleSignIn, googleSignOut, initAuth, getAccessToken } from "../lib/auth";
import { User } from "firebase/auth";

interface ChatSpace {
  name: string; // resource name 'spaces/{space}'
  displayName?: string;
  spaceType?: "SPACE" | "DIRECT_MESSAGE";
}

interface ChatMessage {
  name: string;
  text?: string;
  sender?: {
    displayName?: string;
    name?: string;
  };
  createTime?: string;
}

export default function GoogleChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(true);

  // Spaces and messages state
  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ChatSpace | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Form Inputs
  const [newMessageText, setNewMessageText] = useState("");
  const [newSpaceName, setNewSpaceName] = useState("");
  const [showCreateSpace, setShowCreateSpace] = useState(false);

  // Logs & API tracing
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Log helper
  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setApiLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 49)]);
  };

  // Initialize auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
        addLog(`Authenticated as ${currentUser.displayName}`);
        fetchSpaces(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        addLog("Not authenticated with Google scopes.");
      }
    );
    return () => unsubscribe();
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Login
  const handleLogin = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      addLog("Initializing Google OAuth dialog...");
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        addLog(`Successfully signed in: ${result.user.displayName}`);
        fetchSpaces(result.accessToken);
      }
    } catch (err: any) {
      console.error("Login failure:", err);
      setApiError(err.message || "Failed to sign in with Google provider.");
      addLog(`OAuth error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    try {
      await googleSignOut();
      setUser(null);
      setToken(null);
      setSpaces([]);
      setSelectedSpace(null);
      setMessages([]);
      setNeedsAuth(true);
      addLog("Successfully logged out.");
    } catch (err: any) {
      addLog(`Sign out error: ${err.message}`);
    }
  };

  // 1. Fetch Google Chat Spaces
  const fetchSpaces = async (accessToken: string) => {
    setIsLoading(true);
    setApiError(null);
    addLog("GET https://chat.googleapis.com/v1/spaces");
    try {
      const res = await fetch("https://chat.googleapis.com/v1/spaces", {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const loadedSpaces = data.spaces || [];
      setSpaces(loadedSpaces);
      addLog(`Retrieved ${loadedSpaces.length} Google Chat Spaces.`);
    } catch (err: any) {
      console.error("Fetch spaces error:", err);
      setApiError(err.message || "Error fetching Google Chat Spaces.");
      addLog(`API Space Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch Messages inside a specific space
  const fetchMessages = async (spaceName: string) => {
    if (!token) return;
    setIsLoadingMessages(true);
    setApiError(null);
    addLog(`GET https://chat.googleapis.com/v1/${spaceName}/messages`);
    try {
      const res = await fetch(`https://chat.googleapis.com/v1/${spaceName}/messages?pageSize=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages(data.messages || []);
      addLog(`Retrieved ${(data.messages || []).length} messages from space.`);
    } catch (err: any) {
      console.error("Fetch messages error:", err);
      addLog(`API Messages Error: ${err.name} - ${err.message}`);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // 3. Create a New Google Chat Space (Requires Explicit Confirmation)
  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newSpaceName.trim()) return;

    // MANDATORY Confirmation for Mutating / Creating external assets
    const userConfirmed = window.confirm(
      `Do you confirm creating a new Google Chat Space named "${newSpaceName}"?`
    );
    if (!userConfirmed) return;

    setIsLoading(true);
    setApiError(null);
    addLog(`POST https://chat.googleapis.com/v1/spaces`);
    try {
      const res = await fetch("https://chat.googleapis.com/v1/spaces", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spaceType: "SPACE",
          displayName: newSpaceName.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP ${res.status}`);
      }

      const newSpaceObj: ChatSpace = await res.json();
      addLog(`Space created successfully! Resource ID: ${newSpaceObj.name}`);
      setNewSpaceName("");
      setShowCreateSpace(false);
      
      // Refresh list
      await fetchSpaces(token);
      
      // Select the new space
      setSelectedSpace(newSpaceObj);
      fetchMessages(newSpaceObj.name);
    } catch (err: any) {
      console.error("Create space error:", err);
      setApiError(err.message || "Failed to create space.");
      addLog(`API Create Space Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Send Message to the current active space
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedSpace || !newMessageText.trim()) return;

    const messageToSend = newMessageText.trim();
    setNewMessageText("");

    addLog(`POST https://chat.googleapis.com/v1/${selectedSpace.name}/messages`);
    try {
      const res = await fetch(`https://chat.googleapis.com/v1/${selectedSpace.name}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: messageToSend,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP ${res.status}`);
      }

      const sentMsg: ChatMessage = await res.json();
      addLog("Message sent successfully!");
      
      // Append or reload
      setMessages(prev => [...prev, sentMsg]);
    } catch (err: any) {
      console.error("Send message error:", err);
      // Put text back inside input if failed
      setNewMessageText(messageToSend);
      setApiError(err.message || "Failed to transmit message.");
      addLog(`API Send Error: ${err.message}`);
    }
  };

  // Select a space to view discussion
  const handleSelectSpace = (space: ChatSpace) => {
    setSelectedSpace(space);
    setMessages([]);
    fetchMessages(space.name);
  };

  // Close discussion and return to list
  const handleBackToList = () => {
    setSelectedSpace(null);
    setMessages([]);
  };

  return (
    <>
      {/* 1. Floating Action Toggle Button in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="google-chat-launcher-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition duration-300 font-mono text-xs font-semibold select-none cursor-pointer ${
            isOpen 
            ? "bg-zinc-805 hover:bg-zinc-800 text-white border border-zinc-700" 
            : "bg-amber-500 hover:bg-amber-400 text-black hover:scale-105"
          }`}
          title="Open Google Chat Synchronizer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>

      {/* 2. Interactive Popup Dialogue Console Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            id="google-chat-popup-container"
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[540px] bg-zinc-950 border border-zinc-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 font-sans text-zinc-300"
          >
            {/* Header branding block */}
            <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-amber-500/10 rounded-lg text-amber-500">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-150 font-mono">
                    Google Chat Link
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    STATUS: {needsAuth ? "AUTH REQUIRED" : "ACTIVE ROUTE"}
                  </p>
                </div>
              </div>
              
              {!needsAuth && user && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400 font-medium max-w-[100px] truncate" title={user.displayName || ""}>
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 rounded transition cursor-pointer"
                    title="Sign Out Google Session"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Error notifications container */}
            {apiError && (
              <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 text-xs flex items-start gap-2 text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="flex-1 leading-relaxed">
                  <p className="font-semibold text-[11px] font-mono">API OPERATION ERROR:</p>
                  <p className="text-[11px] font-mono opacity-90">{apiError}</p>
                  {apiError.includes("not enabled") || apiError.includes("403") ? (
                    <div className="mt-1.5 text-[10px] bg-zinc-950/40 p-1.5 rounded border border-rose-500/10 font-mono text-zinc-400">
                      Enable the **Google Chat API** in your Google Cloud Project console (`handy-craft-xcf5x`) and ensure your user is added to the OAuth Consent test users list.
                    </div>
                  ) : null}
                </div>
                <button onClick={() => setApiError(null)} className="text-rose-400 hover:text-white cursor-pointer select-none">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Main Interactive Screen Segment */}
            <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
              
              {/* SCREEN 1: Client is unauthenticated, require credentials */}
              {needsAuth ? (
                <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-5">
                  <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                    <MessageSquare className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-200">Connect to Google Chat API</h4>
                    <p className="text-[11px] text-zinc-500 max-w-[280px] leading-relaxed font-sans">
                      Authorize access to list workspace rooms, create group channels, and post telemetry data on behalf of your Google Account.
                    </p>
                  </div>

                  {/* Mandated Official Looking Sign In with Google Button */}
                  <button 
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="gsi-material-button relative inline-flex items-center justify-center overflow-hidden transition-all duration-150 cursor-pointer text-sm font-medium w-full max-w-xs bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg p-2.5 text-zinc-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                        <span className="font-mono text-xs">COMMUNICATING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 block shrink-0">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        <span className="font-sans text-xs tracking-wide">Sign in with Google Account</span>
                      </div>
                    )}
                  </button>

                  <div className="pt-2 text-[10px] text-zinc-600 font-mono">
                    Scopes: chat.spaces | chat.messages
                  </div>
                </div>
              ) : (
                <>
                  {/* SCREEN 2: Space Discussion Panel */}
                  {selectedSpace ? (
                    <div className="flex-1 flex flex-col overflow-hidden">
                      {/* Space sub-header */}
                      <div className="bg-zinc-900/60 px-3 py-2 border-b border-zinc-900 flex items-center gap-1.5">
                        <button 
                          onClick={handleBackToList}
                          className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded cursor-pointer"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="flex-1 truncate">
                          <span className="text-zinc-550 block text-[9px] uppercase font-bold font-mono">Active Space Channel</span>
                          <span className="text-zinc-200 text-xs font-semibold truncate block">
                            {selectedSpace.displayName || "Unnamed Space (" + selectedSpace.name.split("/")[1] + ")"}
                          </span>
                        </div>
                        <button 
                          onClick={() => fetchMessages(selectedSpace.name)}
                          disabled={isLoadingMessages}
                          className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded cursor-pointer disabled:opacity-55"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${isLoadingMessages ? "animate-spin" : ""}`} />
                        </button>
                      </div>

                      {/* Discussion log frame */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {isLoadingMessages ? (
                          <div className="h-full flex flex-col justify-center items-center space-y-2">
                            <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                            <span className="text-[10px] font-mono text-zinc-650 uppercase">Loading Message Registry...</span>
                          </div>
                        ) : messages.length === 0 ? (
                          <div className="h-full flex flex-col justify-center items-center text-center p-4">
                            <HelpCircle className="h-8 w-8 text-zinc-800 mb-2" />
                            <p className="text-xs font-bold text-zinc-400">No Messages Found</p>
                            <p className="text-[10px] text-zinc-600 mt-1 max-w-[200px]">
                              Send the first coordinate ping or telemetry feedback update!
                            </p>
                          </div>
                        ) : (
                          messages.map((msg, idx) => {
                            const isMe = msg.sender?.name === user?.providerData[0]?.uid || msg.sender?.displayName === user?.displayName;
                            return (
                              <div 
                                key={msg.name || idx} 
                                className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
                              >
                                <span className="text-[9px] text-zinc-500 font-mono mb-0.5 px-1 truncate max-w-full">
                                  {msg.sender?.displayName || "System Agent"}
                                </span>
                                <div 
                                  className={`px-3 py-2 rounded-xl text-xs leading-relaxed break-words font-sans ${
                                    isMe 
                                      ? "bg-amber-500 text-zinc-950 font-medium rounded-tr-none" 
                                      : "bg-zinc-900 text-zinc-200 border border-zinc-850 rounded-tl-none"
                                  }`}
                                >
                                  {msg.text}
                                </div>
                              </div>
                            );
                          })
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Transmit message input controls */}
                      <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/40 border-t border-zinc-900 flex gap-2">
                        <input
                          type="text"
                          required
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-sans"
                        />
                        <button
                          type="submit"
                          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black px-3.5 py-1.5 rounded text-xs font-bold flex items-center justify-center cursor-pointer font-mono"
                          disabled={!newMessageText.trim()}
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    /* SCREEN 3: Active Space List / Main Menu */
                    <div className="flex-1 flex flex-col overflow-hidden">
                      
                      {/* Top Action Header bar */}
                      <div className="px-4 py-3 bg-zinc-900/20 border-b border-zinc-900/60 flex items-center justify-between">
                        <span className="text-zinc-450 block text-[10px] uppercase font-bold font-mono">YOUR CHAT SPACES</span>
                        <button
                          onClick={() => setShowCreateSpace(!showCreateSpace)}
                          className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 rounded font-mono text-[10px] text-amber-500 flex items-center gap-1 cursor-pointer transition select-none"
                        >
                          {showCreateSpace ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                          {showCreateSpace ? "CANCEL" : "NEW SPACE"}
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        
                        {/* Interactive Create Space form drawer */}
                        {showCreateSpace && (
                          <motion.form 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleCreateSpace}
                            className="bg-zinc-900/70 p-3 rounded-xl border border-zinc-800/80 space-y-2.5"
                          >
                            <div>
                              <label className="text-[10px] uppercase tracking-wider font-bold font-mono text-zinc-500 block mb-1">
                                Space / Channel Name:
                              </label>
                              <input
                                type="text"
                                required
                                value={newSpaceName}
                                onChange={(e) => setNewSpaceName(e.target.value)}
                                placeholder="e.g. Flight Coordination Center"
                                className="w-full px-3 py-2 bg-zinc-950 text-zinc-200 border border-zinc-850 rounded text-xs focus:outline-none focus:border-amber-500 font-sans"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={isLoading || !newSpaceName.trim()}
                              className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded text-xs text-center flex items-center justify-center gap-1 cursor-pointer font-mono disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" />
                              CONFIRM & EXPLORE
                            </button>
                          </motion.form>
                        )}

                        {isLoading && spaces.length === 0 ? (
                          <div className="h-32 flex flex-col justify-center items-center space-y-2">
                            <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                            <span className="text-[10px] font-mono text-zinc-650 uppercase">Syncing Workspace Repository...</span>
                          </div>
                        ) : spaces.length === 0 ? (
                          <div className="text-center py-8 px-4 bg-zinc-900/20 border border-dashed border-zinc-900 rounded-xl space-y-3">
                            <AlertCircle className="h-8 w-8 text-zinc-800 mx-auto" />
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-zinc-400">No Chat Rooms Connected</p>
                              <p className="text-[10px] text-zinc-600 max-w-[200px] mx-auto leading-relaxed">
                                Create a standard workspace Space utilizing the button above, or check API rules.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {spaces.map((space) => (
                              <div
                                key={space.name}
                                onClick={() => handleSelectSpace(space)}
                                className="p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded-xl cursor-pointer transition flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="p-1.5 bg-zinc-950 rounded border border-zinc-850 text-zinc-500 group-hover:text-amber-500 group-hover:border-amber-500/20 transition shrink-0">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="truncate min-w-0">
                                    <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition block truncate">
                                      {space.displayName || "Unnamed Space"}
                                    </span>
                                    <span className="text-[9px] text-zinc-600 block font-mono">
                                      {space.name}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[8px] bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 font-mono text-zinc-500 uppercase group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400/20 transition">
                                  OPEN
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Direct Refresh Control */}
                        {!isLoading && (
                          <button
                            onClick={() => fetchSpaces(token || "")}
                            className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900/80 rounded-xl text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <RefreshCw className="h-3 w-3" />
                            REFRESH SPACE DIRECTORY
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Terminal Telemetry Logging Box */}
            <div className="bg-zinc-950 border-t border-zinc-900 h-20 overflow-y-auto p-2 font-mono text-[9px] leading-relaxed text-zinc-650 flex flex-col">
              <div className="flex items-center gap-1.5 border-b border-zinc-900/50 pb-1 mb-1 font-bold text-zinc-550 select-none">
                <Terminal className="h-3 w-3" />
                <span>API TELEMETRY ENGINE LOGGER:</span>
              </div>
              {apiLogs.length === 0 ? (
                <div className="text-zinc-700 italic">Listening for requests...</div>
              ) : (
                apiLogs.map((log, idx) => (
                  <div key={idx} className="truncate">
                    {log}
                  </div>
                ))
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
