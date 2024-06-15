import React, { useState, useRef, useEffect } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState(`console.log("Hello, world!");`);
  const [output, setOutput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [code]);   

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleRun = () => {
    try {
      let capturedOutput = "";
      const log = console.log;
      console.log = (...args) => {
        capturedOutput += args.join(" ") + "\n";
      };

      const result = eval(code);

      console.log = log;

      if (capturedOutput) {
        setOutput(capturedOutput.trim());
      } else if (result !== undefined) {
        setOutput(String(result));
      } else {
        setOutput("");
      }
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const generateLineNumbers = (code) => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).map((num) => (
      <div key={num} className="text-gray-500">
        {num}
      </div>
    ));
  };

  return (
    <div className="my-4  w-full bg-gray-800 overflow-hidden">
      <div className="flex justify-between h-[464px]">
        <div className="flex-1 flex flex-col border border-neutral-50">
          <div className="flex">
            <div className="text-white p-3">main.js</div>
            <div className="flex-1 bg-gray-600"></div>
            <div className="bg-gray-600">
              <button
                onClick={handleRun}
                className="bg-blue-600 hover:bg-blue-700 text-white top-3 right-3 border border-gray-900 text-white font-semibold px-4 py-1.5 mt-2 mr-6 "
              > 
                Run
              </button>
            </div>  
          </div>
          <div className="flex flex-1 overflow-auto">
            <div className="text-white p-2 text-right" style={{ minWidth: "2em" }}>
              {generateLineNumbers(code)}
            </div>
            <textarea
              ref={textareaRef}  
              value={code}  
              onChange={handleChange}
              onInput={adjustTextareaHeight}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              spellCheck="false"
              className={`bg-gray-800 text-white flex-1 p-2 ${isFocused ? 'outline-none' : ''}`}
              style={{
                resize: "none",
                border: "none",
              }}
            />
          </div>
        </div>

       
        <div className="flex-1 flex flex-col border border-neutral-50 relative">
          <div className="bg-gray-600 text-white p-3">Output</div>
          <pre className="bg-gray-800 text-white p-2 flex-1 overflow-auto m-0">
            {output}
          </pre>
          <button
            onClick={clearOutput}
            className="absolute top-3 right-3 border border-gray-900 text-white font-semibold px-3 py-1"
          >
            Clear
          </button>
        </div>
      </div>x
    </div>
  );
};

export default CodeEditor;










