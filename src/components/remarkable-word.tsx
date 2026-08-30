"use client";

import { useEffect, useState } from "react";

const remarkableLetters = "Remarkable".split("");
const introSequenceDuration = 4_350;

export function RemarkableWord() {
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroActive(false), introSequenceDuration);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <em
      className={`remarkable-wave${introActive ? " remarkable-wave-intro" : ""}`}
      aria-label="Remarkable"
    >
      {remarkableLetters.map((letter, index) => (
        <span aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>
      ))}
    </em>
  );
}
