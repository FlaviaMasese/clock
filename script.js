import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");

  const [play, setPlay] = React.useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(breakLength * 60);
      setTimingtype("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(sessionLength * 60);
      setTimingtype("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "wrapper" }, /*#__PURE__*/
    React.createElement("h2", null, "25 + 5 Clock"), /*#__PURE__*/
    React.createElement("div", { className: "break-session-length" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleBreakIncrease, id: "break-increment" }, "Increase"), /*#__PURE__*/
    React.createElement("strong", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleBreakDecrease, id: "break-decrement" }, "Decrease"))), /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleSessionIncrease, id: "session-increment" }, "Increase"), /*#__PURE__*/
    React.createElement("strong", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleSessionDecrease, id: "session-decrement" }, "Decrease")))), /*#__PURE__*/



    React.createElement("div", { className: "timer-wrapper" }, /*#__PURE__*/
    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, title), /*#__PURE__*/
    React.createElement("h3", { id: "time-left" }, timeFormatter())), /*#__PURE__*/

    React.createElement("button", { onClick: handlePlay, id: "start_stop" }, "Start/Stop"), /*#__PURE__*/
    React.createElement("button", { onClick: handleReset, id: "reset" }, "Reset"))), /*#__PURE__*/


    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
