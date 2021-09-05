import { Suspense, useEffect, useState } from "react";

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), []);
  return null;
}

function Loader() {
  return <div>loading </div>;
}

export function Intro({ children }) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {clicked && children}
      <div
        className={`fullscreen bg ${clicked ? "ready" : "notready"} ${
          clicked && "clicked"
        }`}
      >
        <div className="stack">
          <a href="#" onClick={() => setClicked(true)}>
            {!clicked && "Click to continue"}
          </a>
        </div>
      </div>
    </>
  );
}
