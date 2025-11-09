

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  // FIX: Explicitly initialize useRef with `undefined` to satisfy strict linting rules that may require an initial value.
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (index >= words.length) return;

    const currentWord = words[index];

    if (!isDeleting && subIndex === currentWord.length) {
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(timeoutRef.current);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  useEffect(() => {
    const blinker = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinker);
  }, []);

  return (
    <span className="text-blue-500 font-bold">
      {words[index] ? `${words[index].substring(0, subIndex)}` : ''}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

export default Typewriter;
