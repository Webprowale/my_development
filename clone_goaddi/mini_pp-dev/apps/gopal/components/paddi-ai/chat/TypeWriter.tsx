// components/Typewriter.js
import { useState, useEffect } from "react";
import styles from "./Typewriter.module.css";

const Typewriter = ({ words }: { words: any }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const isComplete = letterIndex === currentWord.length;
      const isDeletingComplete = letterIndex === 0;

      if (deleting) {
        setDisplayedText(currentWord.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);

        if (isDeletingComplete) {
          setDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setDisplayedText(currentWord.substring(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);

        if (isComplete) {
          setTimeout(() => setDeleting(true), 1000);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, deleting ? 100 : 150);

    return () => clearTimeout(typingTimeout);
  }, [words, wordIndex, letterIndex, deleting]);

  return (
    <span className={styles.typewriter}>
      {displayedText}
      {/* <span className={styles.cursor}>|</span> */}
    </span>
  );
};

export default Typewriter;
