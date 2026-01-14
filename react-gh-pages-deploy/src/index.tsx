/**
 * エントリーポイント
 *
 * 参照関係:
 * - webpack.config.js の entry で指定 → ビルド時に読み込まれる
 * - ビルド結果 dist/index.js を index.html が読み込む
 */

import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Hello World</h1>
      <p>React app deployed on GitHub Pages</p>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
