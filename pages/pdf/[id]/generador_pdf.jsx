import React from "react";
import ReactDOM from "react-dom";
import PDFGenerator from "./PDFGenerator";

const App = () => {
  return (
    <div>
      <PDFGenerator />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
