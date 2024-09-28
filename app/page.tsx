"use client";

import styles from "./page.module.css";
import { getHash } from "./serverActions/getHash";
import { getTimeStamp } from "./serverActions/getTimeStamp";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(new Map());
  console.log("state: ", state);

  const setHashAndTimpStamp = async (block: number) => {
    console.log("block: ", block);
    const hash = await getHash(block);
    const timeStamp = await getTimeStamp(hash);
    console.log("hash: ", hash);
    console.log("timeStamp: ", timeStamp);
    setState(new Map(state).set(block, { hash, timeStamp }));
  };

  const blockArray = [];
  for (let i = 0; i < 10; i++) {
    blockArray.push(i * 150);
  }

  return (
    <div className={styles.page}>
      {blockArray.map((block) => (
        <ul key={block}>
          <li>Block: {block}</li>
          <li>Hash: {state.get(block)?.hash}</li>
          <li>TimeStamp: {state.get(block)?.timeStamp}</li>
          <button onClick={() => setHashAndTimpStamp(block)}>
            Get Block {block}
          </button>
        </ul>
      ))}
    </div>
  );
}
