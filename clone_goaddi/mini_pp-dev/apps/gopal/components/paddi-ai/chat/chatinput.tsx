import {
  Microphone,
  Paperclip,
  SmileySticker,
  Spinner,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { clearSuggestionsInLocalStorage, useSendMessage } from "./chat.hook";
import { ChatInputProps } from "./chat.interface";

function ChatInput(props: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const sendMessageHook = useSendMessage();

  console.log("this is chat page");

  function chat() {
    console.log("paddi ai is charting");
  }

  function handleSubmit() {
    clearSuggestionsInLocalStorage();
    console.log("we clear suggestions");
    props.sendMessageHook.mutate(props.value, "chat", (resp) =>
      props.onSubmitSuccess(resp),
    );
  }

  return (
    <div className="flex px-3 py-3 ">
      <input
        type="text"
        className="flex-grow px-1 py-1 border-0 outline-none"
        placeholder="Ask me anything"
        value={props.sendMessageHook.isLoading ? "" : props.value}
        onChange={props.onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="flex items-center gap-2 justify-end">
        {isFocused || props.value !== "" ? (
          <div className="flex items-center gap-2">
            <SmileySticker size={24} color="#0D6EFD" />
            {props.sendMessageHook.isLoading ? (
              <div className="flex items-center gap-1 ">
                <Paperclip size={24} color="#0D6EFD" />
                <Microphone size={24} color="#0D6EFD" />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center"
              >
                <Image
                  src="/assets/gopaddi/Frame 31316.svg"
                  alt="submit-icon"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 ">
            <SmileySticker size={24} color="#0D6EFD" />
            <Paperclip size={24} color="#0D6EFD" />
            <Microphone size={24} color="#0D6EFD" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInput;
