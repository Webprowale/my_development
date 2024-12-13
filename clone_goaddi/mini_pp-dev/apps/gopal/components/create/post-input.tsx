"use client";
import React, { useRef, useState, useEffect, createRef } from "react";

import { MentionsInput, Mention } from "react-mentions";

import classNames from "./tag.module.css";
import defaultStyle from "./defaultStyle";
import { merge } from "@/utils/tag";
import { searchUsers } from "@/axios/endpoints/post.endpoint";
import PostAvatar from "../posts/dairy-post/avatar";

function PostInput({ field, postWatch, mentions, setMentions }: any) {
  let style = merge({}, defaultStyle, {
    input: {
      overflow: "auto",
      height: 70,
      width: "100%",
    },
    highlighter: {
      boxSizing: "border-box",
      overflow: "hidden",
      height: 70,
    },
  });

  function handleAddMention(mention: any) {
    setMentions([...mentions, { id: mention.id, display: mention.display }]);
    console.log(mentions);
  }

  function fetchUsers(query: any, callback: any) {
    if (!query) return;
    // fetch(`https://api.github.com/search/users?q=${query}`, { json: true })
    searchUsers({
      keyword: query,
      type: "user",
    })
      .then((res) =>
        // const {
        //   id,
        //   firstname,
        //   lastname,
        //   picture,
        //   followers,
        //   following,
        // } = user;

        res?.result.slice(0, 15).map((user: any) => ({
          display: user.firstname + " " + user.lastname,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          picture: user.picture,
          userId: user.id,
        })),
      )
      .then(callback);
  }

  useEffect(() => {
    // Function to detect mentions
    function detectMentions(text: string) {
      const regex = /@\[([^\]]+?)\]/g;
      const mentions = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        mentions.push({ display: match[1], id: match[2] });
      }
      return mentions;
    }

    const detectedMentions = detectMentions(postWatch);
    setMentions(detectedMentions);
    console.log(mentions);
  }, [postWatch]);

  return (
    <div className="scrollable ">
      <MentionsInput
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        {...field}
        className="font-satoshi hover:"
        // classNames={classNames}
        style={style}
        placeholder={"Share your experience with the world"}
        // allowSpaceInQuery={true}
        a11ySuggestionsListLabel={"Suggested mentions"}
        customSuggestionsContainer={(children) => (
          <div className="p-2 shadow-lg rounded-sm bg-white">
            <div className="p-1 hover:gray-200 w-[300px] max-h-[270px] h-full overflow-auto input__tag">
              {children}
            </div>
          </div>
        )}
      >
        <Mention
          markup="@[__display__]"
          displayTransform={(url) => `@${url}`}
          trigger="@"
          data={fetchUsers}
          onAdd={(id, display) => handleAddMention({ id: id, display })}
          renderSuggestion={(suggestion, search, highlightedDisplay) => {
            // console.log(suggestion);
            const { firstname, lastname, picture, userId } = suggestion as any;

            return (
              <div key={userId} className="user text-gray-800">
                <PostAvatar
                  firstName={firstname}
                  lastName={lastname}
                  avatar={picture}
                  size="small"
                  noDate
                />
              </div>
            );
          }}
          className="text-primary600 font-satoshi underline  mentions__mention"
        />
      </MentionsInput>
    </div>
  );
}

export default PostInput;

const users = [
  {
    id: "walter",
    display: "Walter White",
  },
  {
    id: "pipilu",
    display: "皮皮鲁",
  },
  {
    id: "luxixi",
    display: "鲁西西",
  },
  {
    id: "satoshi1",
    display: "中本聪",
  },
  {
    id: "satoshi2",
    display: "サトシ・ナカモト",
  },
  {
    id: "nobi",
    display: "野比のび太",
  },
  {
    id: "sung",
    display: "성덕선",
  },
  {
    id: "jesse",
    display: "Jesse Pinkman",
  },
  {
    id: "gus",
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: "saul",
    display: "Saul Goodman",
  },
  {
    id: "hank",
    display: "Hank Schrader",
  },
  {
    id: "skyler",
    display: "Skyler White",
  },
  {
    id: "mike",
    display: "Mike Ehrmantraut",
  },
  {
    id: "lydia",
    display: "Lydìã Rôdarté-Qüayle",
  },
];
