import { useState } from "react";

import {
  sendPaddiMessage,
  getLocationDetails,
} from "@/axios/endpoints/paddiai.endpoint";

import {
  QueryResult,
  QuestionAnswerPair,
  TextCommandPair,
} from "./chat.interface";

import axios from "axios";

function extractResponseText(response: QueryResult): string | null {
  const responseMessages = response.queryResult.responseMessages;

  for (const message of responseMessages) {
    if (message.responseType === "HANDLER_PROMPT" && message.text?.text) {
      return message.text.text[0];
    }
  }

  return null;
}

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);

  function getSessionId() {
    try {
      const ss_id = JSON.parse(localStorage.getItem("sessionId") ?? "");
      return ss_id;
    } catch (error) {
      return localStorage.setItem(
        "sessionId",
        JSON.stringify(Date.now().toString()),
      );
    }
  }

  async function sendAiMessage(
    inputValue: string,
    chatType: string,
    onSuccess: (resp: string) => void,
  ) {
    console.log("paddi is coming live");
    setIsLoading(true);

    if (chatType === "paddi") {
      const newSessionId = JSON.stringify(Date.now().toString());
      localStorage.setItem("sessionId", newSessionId);
    }

    const response = await sendPaddiMessage({
      text: [inputValue],
      session_id: getSessionId(),
      language_code: "en-us",
      show_full_response: true,
    });

    setIsLoading(false);

    console.log("got user location oo");

    const responses = response;

    let reply = "";
    let text = "";
    let command = "";

    localStorage.setItem("suggestions", JSON.stringify([]));

    for (let message of responses) {
      if (message.text && message.text.text) {
        reply += message.text.text[0] + "\n\n";

        if (reply !== "") {
          if (chatType == "paddi") {
            storeQuestionsAndAnswers("", message.text.text[0]);
          } else {
            storeQuestionsAndAnswers(inputValue, message.text.text[0]);
          }
        }
      } else if (message.payload && message.payload.botcopy) {
        for (let botcopy of message.payload.botcopy) {
          if (botcopy.suggestions) {
            for (let suggestion of botcopy.suggestions) {
              if (suggestion.title) {
                text = suggestion.title;
              }

              if (suggestion.message && suggestion.message.command) {
                command = suggestion.message.command;
              } else {
                command = suggestion.title;
              }

              storeTextAndCommand(text, command, "text");
            }
          } else if (botcopy.form) {
            console.log("we got form oo");
            console.log(botcopy.form);

            if (chatType == "paddi") {
              storeQuestionsAndAnswers("", botcopy.form, "form");
            } else {
              if (reply !== "") {
                storeQuestionsAndAnswers("", botcopy.form, "form");
              } else {
                storeQuestionsAndAnswers(inputValue, botcopy.form, "form");
              }
            }
          } else if (botcopy.carousel) {
            if (chatType == "paddi") {
              storeQuestionsAndAnswers("", botcopy.carousel, "carousel");
            } else {
              if (reply !== "") {
                storeQuestionsAndAnswers("", botcopy.carousel, "carousel");
              } else {
                storeQuestionsAndAnswers(
                  inputValue,
                  botcopy.carousel,
                  "carousel",
                );
              }
            }
          }
        }
      }
    }

    console.log("paddi AI is coming live");

    console.log(reply);

    onSuccess(reply);
  }

  return {
    isLoading: isLoading,
    mutate: sendAiMessage,
  };
}

export const questionsArray: QuestionAnswerPair[] =
  loadQuestionsFromLocalStorage();

export function storeQuestionsAndAnswers(
  question: string,
  answer: string,
  type: string = "text",
) {
  const existingQuestions = loadQuestionsFromLocalStorage();

  console.log("These are our old questions and answers:");
  console.log(existingQuestions);

  existingQuestions.push({ question, answer, type });

  storeQuestionsInLocalStorage(existingQuestions);

  console.log("These are our questions and answers:");
  console.log(existingQuestions);
}

export function loadQuestionsFromLocalStorage(): QuestionAnswerPair[] {
  try {
    const existingQuestions = JSON.parse(
      localStorage.getItem("questions") ?? "[]",
    );
    return existingQuestions;
  } catch (error) {
    console.error("Error loading questions from local storage:", error);
    return [];
  }
}

function storeQuestionsInLocalStorage(questions: QuestionAnswerPair[]) {
  try {
    localStorage.setItem("questions", JSON.stringify(questions));
  } catch (error) {
    console.error("Error saving questions to local storage:", error);
  }
}

export function clearChatInLocalStorage() {
  localStorage.setItem("questions", JSON.stringify([]));
  console.log("we don clear questions");
  console.log(localStorage.getItem("questions"));
  localStorage.setItem("sessionId", JSON.stringify(""));
  console.log("we don clear session");
  console.log(localStorage.getItem("sessionId"));
  localStorage.setItem("sessionId", JSON.stringify(Date.now().toString()));
}

// SUGESTIONS STORING

export const suggestionArray: TextCommandPair[] =
  loadSuggestionsFromLocalStorage();

function storeTextAndCommand(
  text: string,
  command: string,
  type: string = "text",
) {
  suggestionArray.push({ text, command, type });

  storeSuggestionsInLocalStorage(suggestionArray);

  console.log("this is our suggestion");

  console.log(suggestionArray);
}

export function loadSuggestionsFromLocalStorage(): TextCommandPair[] {
  try {
    const existingSuggestions = JSON.parse(
      localStorage.getItem("suggestions") ?? "[]",
    );
    return existingSuggestions;
  } catch (error) {
    console.error("Error loading questions from local storage:", error);
    return [];
  }
}

function storeSuggestionsInLocalStorage(suggestions: TextCommandPair[]) {
  try {
    localStorage.setItem("suggestions", JSON.stringify([]));
    localStorage.setItem("suggestions", JSON.stringify(suggestions));
  } catch (error) {
    console.error("Error saving suggestions to local storage:", error);
  }
}

export function clearSuggestionsInLocalStorage() {
  localStorage.setItem("suggestions", JSON.stringify([]));
}
