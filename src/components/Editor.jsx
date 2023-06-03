import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/theme/monokai.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
const ACTIONS = require("../Actions");

function Editor({ socketRef, roomId, onCodeChange, onLanguageChange }) {
  const editorRef = useRef(null);

  function changeLanguage(event) {
    const lang = event.target.value;
    onLanguageChange(lang);

    if (!editorRef.current) return;
    if (lang === "JavaScript") {
      editorRef.current.setOption("mode", "javascript");
    } else if (lang === "Python") {
      editorRef.current.setOption("mode", "text/x-python");
    } else if (lang === "C/C++") {
      editorRef.current.setOption("mode", "text/x-c++src");
    }
  socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
    roomId,
    language: lang,
  });
  }

  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "monokai",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
      socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        const element = document.getElementById("curLanguage");
        element.value = language;
        onLanguageChange(language);
        if (language === "JavaScript") {
          editorRef.current.setOption("mode", "javascript");
        } else if (language === "Python") {
          editorRef.current.setOption("mode", "text/x-python");
        } else if (language === "C/C++") {
          editorRef.current.setOption("mode", "text/x-c++src");
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div id="editorContent">
      <div id="editorNav">
        <select
          id="curLanguage"
          onChange={changeLanguage}
          defaultValue={"JavaScript"}
        >
          <option value="JavaScript">JavaScript</option>
          <option value="C/C++">C/C++</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <textarea id="realtimeEditor"></textarea>
      {/* <textarea id="editorInput"></textarea>
      <textarea id="editorOutput"></textarea> */}
    </div>
  );
}

export default Editor;
