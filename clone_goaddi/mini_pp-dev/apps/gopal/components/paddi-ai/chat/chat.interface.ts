import { useSendMessage } from "./chat.hook";

export interface QueryResult {
  queryResult: {
    responseMessages: Array<{
      responseType: string;
      text?: {
        text: string[];
      };
      payload?: {
        botcopy: Array<{
          suggestions: Array<{
            action: {
              message: {
                command: string;
                type: string;
              };
            };
            title: string;
          }>;
        }>;
      };
    }>;
  };
}

export interface QuestionAnswerPair {
  type?: string;
  question: string;
  answer: string;
}

export interface TextCommandPair {
  text: string;
  command: string;
  type?: string;
}

export interface ChatScreenProps {
  onSubmitSuccess(resp: string): void;
  c_question: string;
  chat: QuestionAnswerPair[];
  suggestion: TextCommandPair[];
  setChat: (arr: QuestionAnswerPair[]) => void;
  sendMessageHook: ReturnType<typeof useSendMessage>;
}

export interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitSuccess: (resp: string) => void;
  sendMessageHook: ReturnType<typeof useSendMessage>;
}
