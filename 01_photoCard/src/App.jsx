import React from "react";
import "./App.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="My_Image.jpg" alt="Bhavya's Avatar" />;
}

function Intro() {
  return (
    <div>
      <h1>Bhavya Jain</h1>
      <p>
        I aspire to become a full-stack web developer. I am passionate about
        coding and technology. I am a 21-year-old BCA graduate.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill name="JavaScript" emoji="🔥" color="blue" />
      <Skill name="HTML + CSS" emoji="🎨" color="red" />
      <Skill name="React" emoji="⚛️" color="green" />
      <Skill name="Web Design" emoji="✨" color="pink" />
    </div>
  );
}

function Skill({ name, emoji, color }) {
  return (
    <div
      className="skill"
      style={{
        backgroundColor: color,
        padding: "10px",
        borderRadius: "5px",
        margin: "5px 0",
      }}
    >
      <span style={{ fontWeight: "bold" }}>{name}</span>
      <span style={{ marginLeft: "10px" }}>{emoji}</span>
    </div>
  );
}

export default App;
