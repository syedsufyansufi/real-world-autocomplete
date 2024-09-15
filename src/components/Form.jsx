import { useState } from "react";
import { NOOP, BANK_UPI_HANDLES } from "../constants";

const Form = () => {
  const [upiId, setupiId] = useState("");
  const [prediction, setPrediction] = useState("");
  const [predictions, setPredictions] = useState([]);

  const handleUpiIdChange = (e) => {
    const {
      target: { value = "" }
    } = e;

    setupiId(value);

    if (!value || !value.includes("@")) {
      setPrediction(value || "");
      setPredictions([]);
      return;
    }

    // yomesh@okaxis
    // vpa@bankname
    const [currentUserVPA, currentUserBankname] = value.split("@");

    if (!currentUserVPA) return;

    const userBanknameReg = new RegExp(`${currentUserBankname}`);
    const matchedBanknames = BANK_UPI_HANDLES.filter((bankName) => {
      return userBanknameReg.test(bankName);
    });
    let currentPredictedBankname = matchedBanknames[0];

    // yomesh@dsdsdaasd -> matchedBanknames = [];
    if (currentUserBankname && !matchedBanknames.length) {
      currentPredictedBankname = "";
    }

    setPrediction(`${currentUserVPA}@${currentPredictedBankname}`);
    setPredictions(matchedBanknames);
  };

  const handleKeyPressDown = (e) => {
    const { which = -1, keyCode = -1, code = "" } = e;
    const isRightArrowClick =
      which === 39 || keyCode === 39 || code.toLowerCase() === "arrowright";

    if (isRightArrowClick) {
      setupiId(prediction);
      setPredictions([]);
    }
  };

  const handleBankNameClick = (e) => {
    const { target } = e;
    const currentBankName = target.getAttribute("data-bank-name");
    const [currentUserVPA] = upiId.split("@");
    const updatedUpiId = `${currentUserVPA}@${currentBankName}`;

    setupiId(updatedUpiId);
    setPrediction(updatedUpiId);
    setPredictions([]);
  };

  return (
    <form>
      <div className="input-container">
        <input type="text" value={prediction} onChange={NOOP} />
        <input
          type="text"
          pattern=".+@.+"
          placeholder="Enter your UPI id"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="off"
          value={upiId}
          onChange={handleUpiIdChange}
          onKeyDown={handleKeyPressDown}
        />
      </div>
      <button>Pay Now</button>
      {predictions.length ? (
        <ul>
          {predictions.map((prediction) => {
            return (
              <li
                key={prediction}
                data-bank-name={prediction}
                onClick={handleBankNameClick}
              >
                {prediction}
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
};

export default Form;
