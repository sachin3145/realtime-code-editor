import React, { useState } from "react";
import Client from "../components/Clients";
import Editor from "../components/Editor";

function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Sachin" },
    { socketId: 2, userName: "Devansh" },
    { socketId: 3, userName: "Rahul" },

  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="editorPageLogo">
            <img width="40" height="40" src="/icon.png" alt="logo" />
            <h1>InLoop</h1>
          </div>
          <h3>Connected</h3>
          <div className="clientList">
                      {clients.map((client) => (
                          <Client key={client.socketId} userName={client.userName} />
                      ))}
          </div>
              </div>
              <button className="btn copyBtn">Copy Room Id</button>
              <button className="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorWrap"><Editor/></div>
    </div>
  );
}

export default EditorPage;
