import React, { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import "./App.css";

import {
  genPrivKeyFromText,
  genPrivateKey,
  genPublicKey,
  createPublicAddress,
  createPrivateKeyWIF,
} from "./genKeys.js";

function App() {
  const [text, setText] = useState("");
  const [keys, setKeys] = useState({
    privKey: "",
    pubKey: "",
    privAddr: "",
    pubAddr: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const warning = () => {
    const warning =
      "Use keys created from this app at your own risk. I am not responsible for any lost or stolen Bitcoin from the abuse, misuse, or misunderstanding of this app";
    return (
      <div style={{ padding: "20px" }}>
        <h4 style={{ margin: "auto", color: "red", width: "80%" }}>
          {warning}
        </h4>
      </div>
    );
  };

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const createKeyFromText = (data, n = 100) => {
    if (text.length < 32) {
      setErrMsg("Text must be at least 32 characters long");
    } else {
      let privKey = genPrivKeyFromText(data);
      createKeys(privKey);
    }
  };

  const handleSubmit = () => {
    let privKey = genPrivateKey();
    createKeys(privKey);
  };

  const createKeys = (privKey) => {
    let pubKey = genPublicKey(privKey);
    let privAddr = createPrivateKeyWIF(privKey);
    let pubAddr = createPublicAddress(pubKey);
    setKeys({ privKey, pubKey, privAddr, pubAddr });
    setErrMsg("");
  };

  return (
    <div className="App">
      <Container>
        <img src="logo.png" alt="bitcoin" />
        <h2>Bitcoin Public Private Key Generator</h2>
        <TextField
          style={{ background: "white" }}
          name="text"
          label="Random Text"
          value={text}
          onChange={handleChange}
          variant="outlined"
        />
        {errMsg ? <div style={{ color: "red" }}>{errMsg}</div> : <></>}
        <br />
        <Button variant="contained" color="primary" onClick={createKeyFromText}>
          Generate From Text
        </Button>
        <h4>Or</h4>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Randomly Generate
        </Button>
        {warning()}
        {keys.pubAddr !== "" ? (
          <>
            <hr />
            <div>
              <h4 style={{ color: "blue" }}>
                You can confirm your key pair by importing your private key on{" "}
                <a href="https://blockchain.com/">Blockchain.com</a>
              </h4>
              <br />
              <h3 style={{ color: "red" }}>DO NOT SHARE</h3>
              <img
                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${keys.privAddr}`}
                alt="privatekey"
              />
              <div style={{ color: "red" }}>Private Key: </div>
              <span style={{ wordWrap: "break-word" }}>{keys.privAddr}</span>
            </div>
            {warning()}
            <hr />
            <h3 style={{ color: "red" }}>Receive Bitcoin Below</h3>
            <div>
              <img
                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${keys.pubAddr}`}
                alt="publickey"
              />
              <div style={{ color: "red" }}>Public Key: </div>
              {keys.pubAddr}
            </div>
            {warning()}
          </>
        ) : (
          <></>
        )}
        <h4 style={{ color: "blue" }}>
          See the source code{" "}
          <a href="https://github.com/GalaxysHub/BitcoinKeyGenerator">here</a>
        </h4>
      </Container>
    </div>
  );
}

export default App;
