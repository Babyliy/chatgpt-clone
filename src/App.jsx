import "./App.css";
import gptLogo from "./assets/bot.png";
import addBtn from "./assets/add.png";
import msgIcon from "./assets/message.png";
import homeIcon from "./assets/home.png";
import saveIcon from "./assets/save.png";
import upgrade from "./assets/upgrade.png";
import sendIcon from "./assets/send2.png";
import robot from "./assets/robot.png";
import user from "./assets/user.jpeg";
import { sendMsgToOpenAI } from "./api";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([
    {
      text: "I'm LiyahBot, How can I help you?",
      isBot: true,
    },
  ]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [response]);
  const handleSend = async () => {
    const text = input;
    setInput('');
    setResponse([
      ...response,
      {text, isBot:false}
    ])
    const res = await sendMsgToOpenAI(text);
    console.log(res);
    setResponse([
      ...response,
      { text, input, isBot: false },
      { text: res, isBot: true },
    ]);
  }
  const handleEnter = async (e) =>{
    if(e.key==='Enter') await handleSend();
  }
  const handleQuery = async (e) =>{
     const text = e.target.value;
     setResponse([...response, { text, isBot: false }]);
     const res = await sendMsgToOpenAI(text);
     console.log(res);
     setResponse([
       ...response,
       { text, input, isBot: false },
       { text: res, isBot: true },
     ]);
  }
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="" className="logo" />
            <span className="text">LiyahBot</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="" className="addBtn" />
            New Chat
          </button>
          <div className="upperSidebottom">
            <button className="query" value={"What is Programming ?"} onClick={handleQuery}>
              <img src={msgIcon} alt="" className="addBtn" />
              What is Programming ?
            </button>
            <button className="query" value={" What is an API ?"} onClick={handleQuery} >
              <img src={msgIcon} alt="" className="addBtn" />
              What is an API ?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={homeIcon} alt="" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saveIcon} alt="" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={upgrade} alt="" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {response.map((response, i) => (
            <div key={i} className={response.isBot ? "chat bot" : "chat"}>
              <img
                src={response.isBot ? robot : user}
                alt=""
                className="chatImg"
              />
              <p className="txt">{response.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message...."
              required
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />{" "}
            <button className="send" onClick={handleSend}>
              <img src={sendIcon} alt="send" className="sendIcon" />
            </button>
          </div>
          <p className="warning">LiyahBot may produce wrong information</p>
        </div>
      </div>
    </div>
  );
}

export default App;
