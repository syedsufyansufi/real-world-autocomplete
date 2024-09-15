/**
 * Author: Yomesh Gupta | Devtools Tech
 * YouTube: https://bit.ly/devtools-ygv
 * Twitter: https://twitter.com/yomeshgupta
 */

import Form from "./Form";

import { GRAPHIC_URL } from "../constants";
import "../styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <img src={GRAPHIC_URL} alt="Payment Graphic" />
        <Form />
      </div>
    </div>
  );
}
