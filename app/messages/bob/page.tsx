import { User } from "@/lib/enums";
import { MessageTerminal } from "@/app/components/MessageTerminal";

export default function Page() {
  const userSubmittingMessage = User.Bob;

  return (
    <div>
      <MessageTerminal username={userSubmittingMessage} />
    </div>
  );
}
