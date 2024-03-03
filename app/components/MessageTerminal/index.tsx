"use client";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";

import { User } from "@/lib/enums";
import { api } from "@/convex/_generated/api";
import { Message as MessageType } from "@/lib/types";
import { Message } from "./Message";

interface MessageTerminalProps {
  username: User;
}

export const MessageTerminal: React.FC<MessageTerminalProps> = ({ username }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const MessageContainerRef = useRef<HTMLUListElement>(null);
  const mutateMessage = useMutation(api.messages.createMessage);
  const messages = useQuery(api.messages.getRecentMessages);

  useEffect(() => {
    if (MessageContainerRef.current) {
      MessageContainerRef.current.scrollTop = MessageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const messageId = mutateMessage({ message: newMessage, user: username });
      setNewMessage("");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  const handleChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If pressing enter, submit the message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage(e as unknown as React.FormEvent<HTMLFormElement>); // TODO: Fix this type casting
      return;
    }

    setNewMessage((e.target as HTMLTextAreaElement).value);
  };

  return (
    <div className="p-5">
      <ul className="h-[60vh] flex flex-col gap-6 w-full overflow-scroll" ref={MessageContainerRef}>
        {messages?.map((message, index) => (
          <Message key={index} message={message} username={username} />
        ))}
      </ul>
      <form onSubmit={handleSubmitMessage} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md">
        <textarea
          name="newMessage"
          id="newMessage"
          value={newMessage}
          onChange={(e) => handleChange(e as unknown as React.KeyboardEvent<HTMLTextAreaElement>)}
          cols={30}
          rows={10}
          className="p-4 text-sm text-gray-700 bg-blue-50 border border-blue-400 rounded-lg focus:ring-blue-400 focus:border-blue-500 block w-full transition duration-150 ease-in-out"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          disabled={newMessage.length === 0}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};
