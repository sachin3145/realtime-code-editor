import React from "react";

function Home() {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <div className="homePageLogo">
          <img
            width="50"
            height="50"
            src="icon.png"
            alt="logo"
          />
          <h1>InLoop</h1>
        </div>
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input className="inputBox" placeholder="ROOM ID" />
          <input className="inputBox" placeholder="USERNAME" />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a href="/" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built With 💛 by &nbsp;
          <a href="https://github.com/sachin3145">Sachin Yadav</a>
        </h4>
      </footer>
    </div>
  );
}

export default Home;
