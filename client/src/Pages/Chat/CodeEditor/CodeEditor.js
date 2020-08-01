import React, { Component, useEffect, useRef, useState } from "react";
import "./CodeEditor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/snippets/autohotkey";
import "ace-builds/src-noconflict/ext-language_tools";
import { socket } from "../../../context/Socket";

const CodeEditor = (props) => {
  const [value, setValue] = useState(`
  function test() {
      console.log("Test")
  }`);
  const [mode, setMode] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const id = useRef(`${Date.now()}`);
  const editor = useRef(null);
  const remote = useRef(false);

  useEffect(() => {
    socket.on("new-value", ({ room, editorId, ops }) => {
      if (id.current !== editorId) {
        remote.current = true;
        setValue(ops);
        remote.current = false;
      }
    });
    socket.on("new-mode", ({ room, editorId, mode }) => {
      if (id.current !== editorId) {
        remote.current = true;
        setMode(mode)
        remote.current = false;
      }
    });
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
    socket.emit("value", {
      room: props.room,
      editorId: id.current,
      ops: newValue,
    });
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    socket.emit("change-mode", {
        room: props.room,
        editorId: id.current,
        mode: newMode
    })
  }

  return (
    <div className="code-editor-container">
      <AceEditor
        className="code-editor-main"
        width="86%"
        height="100%"
        placeholder="Start Typing..."
        mode={mode}
        theme={theme}
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <div className="options">
        <h5>Mode:</h5>
        <select
          className="options-mode"
          name="mode"
          onChange={handleModeChange}
          value={mode}
        >
          <option value="javascript">javascript</option>
          <option value="java">java</option>
          <option value="python">python</option>
          <option value="c_cpp">c/c++</option>
          <option value="xml">xml</option>
          <option value="ruby">ruby</option>
          <option value="sass">sass</option>
          <option value="markdown">markdown</option>
          <option value="mysql">mysql</option>
          <option value="json">json</option>
          <option value="html">html</option>
          <option value="handlebars">handlebars</option>
          <option value="golang">golang</option>
          <option value="csharp">csharp</option>
          <option value="elixir">elixir</option>
          <option value="typescript">typescript</option>
          <option value="css">css</option>
        </select>
        <h5>Theme:</h5>
        <select
          className="options-theme"
          name="Theme"
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="monokai">monokai</option>
          <option value="github">github</option>
          <option value="tomorrow">tomorrow</option>
          <option value="kuroir">kuroir</option>
          <option value="twilight">twilight</option>
          <option value="xcode">xcode</option>
          <option value="textmate">textmate</option>
          <option value="solarized_dark">solarized_dark</option>
          <option value="solarized_light">solarized_light</option>
          <option value="terminal">terminal</option>
        </select>
      </div>
    </div>
  );
};

export default CodeEditor;
