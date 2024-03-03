import { Message as MessageType } from "@/lib/types";

interface MessageProps {
  message: MessageType;
  username: string;
}

export const Message: React.FC<MessageProps> = ({ message, username }) => {
  const isCurrentUser = message.user === username;
  const displayedName = isCurrentUser ? "You" : message.user;
  const borderRadiusClassBasedOnUser = isCurrentUser ? "rounded-tr-sm" : "rounded-tl-sm";
  const justifyContentClassBasedOnUser = isCurrentUser ? "justify-end" : "justify-start";
  const backgroundColorClassBasedOnUser = isCurrentUser ? "bg-blue-100" : "bg-gray-100";

  return (
    <div className={`flex w-full ${justifyContentClassBasedOnUser}`}>
      <div className={`flex items-start gap-2.5 ${isCurrentUser ? "float-right" : "float-left"}`}>
        <div
          className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${backgroundColorClassBasedOnUser} rounded-xl  ${borderRadiusClassBasedOnUser}`}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">{displayedName}</span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">{message.message}</p>
          <span className="text-sm font-normal text-gray-500">Delivered</span>
        </div>
      </div>
    </div>
  );
};
