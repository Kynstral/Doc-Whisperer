"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  MdEdit,
  MdContentCopy,
  MdDelete,
  MdCompare,
  MdFileDownload,
  MdHistory,
  MdMenu,
} from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import Notification from "@/components/Notification";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Tooltip from "@/components/Tooltip";

const customCodeBlockSyntaxStyle = {
  ...nord,
  'pre[class*="language-"]': {
    ...nord['pre[class*="language-"]'],
    background: "transparent",
  },
  comment: { color: "#838383" },
  keyword: { color: "#e10505" },
  string: { color: "#7CFC00" },
  function: { color: "#126ade" },
  number: { color: "#7CFC00" },
};

const CodeBlock = ({ language, code }) => {
  const [showNotification, setShowNotification] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={customCodeBlockSyntaxStyle}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 text-white hover:bg-[#d2d4d5]/10 rounded p-2"
        aria-label="Copy code"
      >
        <MdContentCopy size={20} className="text-[#1fff67]" />
      </button>
      {showNotification && (
        <div className="hidden lg:block">
          <Notification message="Successfully copied" />
        </div>
      )}
    </div>
  );
};

const documentations = [
  { name: "Inline Comments" },
  { name: "Block Comments" },
  { name: "Docstrings" },
  { name: "API Reference Documentation" },
  { name: "API User Guides Documentation" },
  { name: "README Documentation" },
];

export default function Component() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedMessageText, setEditedMessageText] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("Inline Comments");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const textareaRef = useRef(null);
  const editTextareaRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
    const savedCurrentChatId = localStorage.getItem("currentChatId");
    if (savedCurrentChatId) {
      setCurrentChatId(JSON.parse(savedCurrentChatId));
    }

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );
    setModel(genAI.getGenerativeModel({ model: "gemini-1.5-pro" }));
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("currentChatId", JSON.stringify(currentChatId));
  }, [currentChatId]);

  const getPrompt = (docType, input) => {
    const basePrompt = `Add ${docType.toLowerCase()} to the following code. Do not use markdown formatting in your response. Maintain the same functionality as the original code. Here's the code: ${input}`;

    switch (docType) {
      case "Inline Comments":
        return `${basePrompt} Add inline comments that explain the purpose and functionality of each line or block.`;
      case "Block Comments":
        return `${basePrompt} Add block comments that explain the purpose and functionality of each section.`;
      case "Docstrings":
        return `${basePrompt} Add docstrings that explain the purpose, parameters, and return values of functions and classes.`;
      case "API Reference Documentation":
        return `${basePrompt} Create API reference documentation, including details on classes, methods, and their parameters.`;
      case "API User Guides Documentation":
        return `${basePrompt} Create user guide documentation for the API, including examples of how to use the main features.`;
      case "README Documentation":
        return `${basePrompt} Create a README documentation, including an overview, installation instructions, and basic usage examples.`;
      default:
        return basePrompt;
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setIsLoading(true);
      setError(null);

      if (!model) {
        setError("Model not initialized. Please try again.");
        setIsLoading(false);
        return;
      }

      const userMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
      };

      let updatedChats;
      if (currentChat) {
        updatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat,
        );
      } else {
        const newChatId = Date.now();
        const newChat = {
          id: newChatId,
          name: `New Chat ${chats.length + 1}`,
          messages: [userMessage],
        };
        updatedChats = [...chats, newChat];
        setCurrentChatId(newChatId);
      }
      setChats(updatedChats);

      setInput("");
      setPreviewText("");

      try {
        const prompt = getPrompt(selectedDocType, input);
        const result = await model.generateContentStream(prompt);
        let fullResponse = "";
        for await (const chunk of result.stream) {
          fullResponse += chunk.text();
          setPreviewText(fullResponse);
        }
        const botMessage = {
          id: Date.now(),
          text: fullResponse,
          sender: "bot",
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, botMessage],
                  name:
                    chat.messages.length === 1
                      ? input.split("\n")[0].slice(0, 30)
                      : chat.name,
                }
              : chat,
          ),
        );
      } catch (error) {
        console.error("Error generating content:", error);
        setError(`Error generating content: ${error.message}`);
        const errorMessage = {
          id: Date.now(),
          text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
          sender: "bot",
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, errorMessage] }
              : chat,
          ),
        );
      } finally {
        setIsLoading(false);
        setPreviewText("");
      }
    }
  };

  const createNewChat = () => {
    const newChatId = Date.now();
    setChats([
      ...chats,
      { id: newChatId, name: `New Chat ${chats.length + 1}`, messages: [] },
    ]);
    setCurrentChatId(newChatId);
    setShowHistory(false);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
    setShowHistory(false);
  };

  const removeChat = (chatId) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const editMessage = (messageId, text) => {
    setEditingMessageId(messageId);
    setEditedMessageText(text);
    if (currentChat?.messages[0].id === messageId) {
      const newName = text.split("\n")[0].slice(0, 30);
      setChats(
        chats.map((chat) =>
          chat.id === currentChatId ? { ...chat, name: newName } : chat,
        ),
      );
    }
  };

  const saveEditedMessage = async (messageId) => {
    const updatedChats = chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((msg) =>
        msg.id === messageId ? { ...msg, text: editedMessageText } : msg,
      ),
    }));
    setChats(updatedChats);
    setEditingMessageId(null);
    setEditedMessageText("");

    const currentMessages = updatedChats.find(
      (chat) => chat.id === currentChatId,
    ).messages;
    const editedMessageIndex = currentMessages.findIndex(
      (msg) => msg.id === messageId,
    );

    if (currentMessages[editedMessageIndex].sender === "user") {
      await regenerateMessage(editedMessageIndex + 1);
    }
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditedMessageText("");
  };

  const regenerateMessage = async (messageIndex) => {
    if (currentChat) {
      const previousMessages = currentChat.messages.slice(0, messageIndex);
      const lastUserMessage = previousMessages
        .reverse()
        .find((msg) => msg.sender === "user");

      if (lastUserMessage) {
        setIsLoading(true);
        setPreviewText("");
        try {
          if (!model) {
            throw new Error("Model not initialized");
          }
          const prompt = getPrompt(selectedDocType, lastUserMessage.text);
          const result = await model.generateContentStream(prompt);
          let fullResponse = "";
          for await (const chunk of result.stream) {
            fullResponse += chunk.text();
            setPreviewText(fullResponse);
          }
          const newBotMessage = {
            id: Date.now(),
            text: fullResponse,
            sender: "bot",
          };

          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [
                      ...chat.messages.slice(0, messageIndex),
                      newBotMessage,
                    ],
                  }
                : chat,
            ),
          );
        } catch (error) {
          console.error("Error regenerating content:", error);
          setError(`Error regenerating content: ${error.message}`);
        } finally {
          setIsLoading(false);
          setPreviewText("");
        }
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200,
      )}px`;
    }
  }, [input]);

  useEffect(() => {
    if (editTextareaRef.current) {
      editTextareaRef.current.style.height = "auto";
      editTextareaRef.current.style.height = `${Math.min(
        editTextareaRef.current.scrollHeight,
        200,
      )}px`;
    }
  }, [editedMessageText]);

  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [currentChat?.messages, previewText]);

  const renderMessage = (message) => {
    return (
      <div
        className={`p-3 rounded-lg ${
          message.sender === "user"
            ? "bg-[#d2d4d5]/20 text-[#d2d4d5]"
            : "bg-[#1fff67]/10 text-[#1fff67]"
        }`}
      >
        <div className="max-w-2xl">
          <CodeBlock
            language="javascript"
            code={message.text}
            showLineNumbers={false}
          />
        </div>
      </div>
    );
  };

  const exportChatHistory = () => {
    const chatHistory = JSON.stringify(chats, null, 2);
    const blob = new Blob([chatHistory], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (currentChat) {
      const chatContent = currentChat.messages
        .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
        .join("\n\n");
      navigator.clipboard.writeText(chatContent);
    }
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-transparent text-[#1fff67] custom-scrollbar">
      {/* Header */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d2d4d5] to-[#d2d4d5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4 pl-4">
          <Popover className="relative">
            {({ open }) => (
              <>
                <PopoverButton
                  className="inline-flex items-center gap-x-1 text-md font-semibold leading-6 text-[#1fff67] bg-[#1fff67]/10 hover:bg-[#d2d4d5]/10 p-2 px-4 rounded-lg ring-1 ring-[#1fff67]/30"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedDocType}</span>
                  {isDropdownOpen ? (
                    <FaChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <FaChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                </PopoverButton>

                <Transition
                  show={open}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="absolute left-0 z-10 mt-5 w-56 rounded-md bg-[#1fff67]/10 p-2 text-sm font-semibold leading-6 text-[#1fff67] shadow-lg ring-1 ring-[#1fff67]/30">
                    {documentations.map((item) => (
                      <div
                        key={item.name}
                        className="block p-2 rounded-md hover:bg-[#d2d4d5]/10 cursor-pointer"
                        onClick={() => {
                          setSelectedDocType(item.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-center">
            {currentChat ? currentChat.name : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-4 pr-5">
          <a
            href="/"
            className="font-semibold text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
            aria-label="Home"
          >
            Home
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <Tooltip message="Download Chat" placement="bottom">
              <button
                onClick={exportChatHistory}
                className="text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
                aria-label="Export chat history"
              >
                <MdFileDownload size={24} />
              </button>
            </Tooltip>
            <Tooltip message="Copy All" placement="bottom">
              <button
                onClick={copyToClipboard}
                className="text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
                aria-label="Copy chat content"
              >
                <MdContentCopy size={24} />
              </button>
            </Tooltip>
            <Tooltip message="Compare" placement="bottom">
              <button
                onClick={toggleComparison}
                className="text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
                aria-label="Compare original and generated code"
              >
                <MdCompare size={24} />
              </button>
            </Tooltip>
            <Tooltip message="Chat History" placement="bottom">
              <button
                onClick={toggleHistory}
                className="text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
                aria-label="View chat history"
              >
                <MdHistory size={24} />
              </button>
            </Tooltip>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <MdMenu size={24} />
            </button>
          </div>
          <button
            type="button"
            onClick={createNewChat}
            className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#1fff67]/10 p-4 space-y-4 rounded-b-lg ring-1 ring-[#1fff67]/30">
          <button
            onClick={exportChatHistory}
            className="w-full text-left text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg flex items-center"
          >
            <MdFileDownload size={24} className="mr-2" />
            Download Chat
          </button>
          <button
            onClick={copyToClipboard}
            className="w-full text-left text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg flex items-center"
          >
            <MdContentCopy size={24} className="mr-2" />
            Copy All
          </button>
          <button
            onClick={toggleComparison}
            className="w-full text-left text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg flex items-center"
          >
            <MdCompare size={24} className="mr-2" />
            Compare
          </button>
          <button
            onClick={toggleHistory}
            className="w-full text-left text-[#1fff67] hover:text-[#1fff67]/80 hover:bg-[#d2d4d5]/10 p-2 rounded-lg flex items-center"
          >
            <MdHistory size={24} className="mr-2" />
            Chat History
          </button>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 message-container">
        {!currentChat || currentChat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2">
              Welcome to Doc Whisperer!
            </h1>
            <p className="text-center text-[#1fff67]/60 mb-8">
              Your AI-powered documentation assistant. Add inline comments,
              block documentation, API usage, or even generate a full
              README—automatically!
            </p>
            <div className="flex space-x-4 w-full justify-center">
              <div className="border-2 border-[#1fff67] p-4 text-center rounded">
                Get started by submitting a code snippet
              </div>
              <div className="border-2 border-[#1fff67] p-4 text-center rounded">
                {"Need API usage details? We've got you covered."}
              </div>
              <div className="border-2 border-[#1fff67] p-4 text-center rounded">
                {"Let's generate your project's README file."}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {currentChat?.messages.map((message) => (
              <div
                key={message.id}
                className="flex mb-4 w-full max-w-3xl relative"
              >
                <div
                  className="w-8 h-8 rounded-full bg-[#1fff67] mr-3 flex-shrink-0"
                  aria-hidden="true"
                ></div>
                <div className="w-0.5 h-full bg-[#1fff67]/20 absolute left-4"></div>
                <div className="flex flex-col flex-grow">
                  <span
                    className={`font-semibold mb-1 ${
                      message.sender === "user"
                        ? "text-[#1fff67]"
                        : "text-[#1fff67]"
                    }`}
                  >
                    {message.sender === "bot" ? "Doc Whisperer" : "You"}
                  </span>
                  {editingMessageId === message.id ? (
                    <div className="w-full">
                      <textarea
                        ref={editTextareaRef}
                        value={editedMessageText}
                        onChange={(e) => setEditedMessageText(e.target.value)}
                        className="w-full p-4 bg-[#323233] text-white border border-[#1fff67]/20 rounded-lg resize-none"
                        style={{ minHeight: "150px", maxHeight: "250px" }}
                      />
                      <div className="flex mt-2">
                        <button
                          onClick={() => saveEditedMessage(message.id)}
                          className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 mr-3 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
                        >
                          Update
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    renderMessage(message)
                  )}
                  <div className="flex mt-2 space-x-2">
                    {editingMessageId !== message.id && (
                      <>
                        <Tooltip message="Edit" placement="bottom">
                          <button
                            onClick={() =>
                              editMessage(message.id, message.text)
                            }
                            className={`${
                              message.sender === "user"
                                ? "text-[#d2d4d5]"
                                : "text-[#1fff67]"
                            } hover:bg-[#1fff67]/10 p-2 rounded-lg`}
                            aria-label="Edit message"
                          >
                            <MdEdit size={20} className="text-[#1fff67]" />
                          </button>
                        </Tooltip>
                        <Tooltip message="Copy" placement="bottom">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(message.text)
                            }
                            className={`${
                              message.sender === "user"
                                ? "text-[#d2d4d5]"
                                : "text-[#1fff67]"
                            } hover:bg-[#1fff67]/10 p-2 rounded-lg`}
                            aria-label="Copy message"
                          >
                            <MdContentCopy
                              size={20}
                              className="text-[#1fff67]"
                            />
                          </button>
                        </Tooltip>
                        {message.sender === "bot" && (
                          <Tooltip message="Regenerate" placement="bottom">
                            <button
                              onClick={() =>
                                regenerateMessage(
                                  currentChat.messages.indexOf(message),
                                )
                              }
                              className="text-[#1fff67] hover:bg-[#1fff67]/10 p-2 rounded-lg"
                              aria-label="Regenerate response"
                            >
                              <TbReload size={20} />
                            </button>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex items-center mb-4 justify-center">
            <div className="flex max-w-3xl w-full">
              <div
                className="w-8 h-8 rounded-full bg-[#1fff67] mr-3 flex-shrink-0"
                aria-hidden="true"
              ></div>
              <div className="flex flex-col flex-grow">
                <span className="font-semibold mb-1 text-[#1fff67]">
                  Doc Whisperer
                </span>
                <div className="bg-[#1fff67]/10 text-[#1fff67] p-3 rounded-lg">
                  Generating response...
                </div>
              </div>
            </div>
          </div>
        )}
        {previewText && (
          <div className="flex mb-4 justify-center">
            <div className="flex max-w-3xl w-full">
              <div className="flex flex-col flex-grow ml-11">
                {renderMessage(
                  { text: previewText, sender: "bot" },
                  currentChat?.messages.length,
                )}
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-center mb-4 justify-center">
            <div className="flex max-w-3xl w-full">
              <div
                className="w-8 h-8 rounded-full bg-[#1fff67] mr-3 flex-shrink-0"
                aria-hidden="true"
              ></div>
              <div className="flex flex-col flex-grow">
                <span className="font-semibold mb-1 text-[#1fff67]">
                  Doc Whisperer
                </span>
                <div className="bg-red-500/10 text-red-500 p-3 rounded-lg">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-[#020201] border border-[#1fff67]/20 rounded-md">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Add documentation to your code..."
              className="flex-1 p-3 bg-transparent focus:outline-none placeholder-[#1fff67] resize-none overflow-y-auto text-[#1fff67]"
              style={{ minHeight: "60px", maxHeight: "200px" }}
              maxLength={12000}
            />
            <div className="flex flex-col items-end pr-2">
              <span className="text-xs text-[#1fff67]/60 mb-1">
                {input.length}/12000
              </span>
              <button
                onClick={handleSend}
                className="p-3 text-[#1fff67] hover:text-[#1fff67]/80"
                aria-label="Send message"
                disabled={isLoading}
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-2 text-[#1fff67]/60">
          Doc Whisperer may make mistakes. Please use with discretion.
        </p>
      </div>

      {/* Chat History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-[#020201] bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#020201] ring-1 ring-[#1fff67] p-6 rounded-lg w-full max-w-md h-[80vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Chat History</h2>
            <hr className="border border-[#1fff67]/20 mb-2" />
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex justify-between items-center mb-2"
                >
                  <button
                    onClick={() => selectChat(chat.id)}
                    className="flex-grow p-2 text-left bg-[#d2d4d5]/5 hover:bg-[#d2d4d5]/10 rounded truncate"
                  >
                    {chat.name}
                  </button>
                  <button
                    onClick={() => removeChat(chat.id)}
                    className="text-red-500 hover:text-red-700 ml-2 p-2 hover:bg-[#d2d4d5]/10 rounded-md"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={toggleHistory}
              className="mt-4 w-full p-2 bg-[#1fff67]/40 text-white rounded hover:bg-[#d2d4d5]/10 hove"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && currentChat && (
        <div className="fixed inset-0 bg-[#020201] bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#020201]/70 p-6 rounded-lg w-full max-w-6xl h-[80vh] flex flex-col ring-1 ring-[#1fff67]/40">
            <h2 className="text-2xl font-bold mb-4">Code Comparison</h2>
            <hr className="border border-[#1fff67]/20 mb-4" />
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1fff67]/10 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Original Code</h3>
                  <div className="bg-black rounded-md">
                    <CodeBlock
                      language="javascript"
                      code={
                        currentChat.messages.find((m) => m.sender === "user")
                          ?.text || ""
                      }
                      showLineNumbers={true}
                    />
                  </div>
                </div>
                <div className="bg-[#1fff67]/10 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    Generated Documentation
                  </h3>
                  <div className="bg-black rounded-md">
                    <CodeBlock
                      language="javascript"
                      code={
                        currentChat.messages.find((m) => m.sender === "bot")
                          ?.text || ""
                      }
                      showLineNumbers={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={toggleComparison}
              className="mt-4 w-full p-2 bg-[#1fff67]/70 text-black rounded hover:bg-[#1fff67]/50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
