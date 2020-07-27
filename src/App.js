import React, { useState } from "react";
import crypto from "crypto";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Container } from "@material-ui/core";
import "./App.css";

import {
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

  const warning = () => {
    const warning =
      "DO NOT USE AND KEYS CREATED BY THIS APP. ESPECIALLY THOSE CREATED FROM THE RANDOM TEXT. THERE IS NOT SUFFICIENT ENTROPHY TO CREATE A TRULY RANDOM PRIVATE KEY";
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

  const createInsecureKey = () => {
    let secret = "this is a huge secret";
    const privKey = crypto
      .createHmac("sha256", secret)
      .update("I love cupcakes")
      .digest("hex");
    createKeys(privKey);
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
  };

  return (
    <div className="App">
      <h2>Bitoin Public Private Key Generator</h2>
      <TextField
        id="outlined-basic"
        name="text"
        label="Random Text"
        value={text}
        onChange={handleChange}
        variant="outlined"
      />
      <br />
      <Button variant="contained" color="primary" onClick={createInsecureKey}>
        Create From Text
      </Button>
      <h4>Or</h4>
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Securely Generate
      </Button>
      {warning()}
      <Container>
        {keys.pubAddr !== "" ? (
          <>
            <hr />
            <div>
              <br />
              <h3 style={{ color: "red" }}>DO NOT SHARE</h3>
              <img
                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${crypto.privAddr}`}
                alt="privatekey"
              />
              <div style={{ color: "red", wordWrap: "break-word" }}>
                Private Key:{" "}
              </div>
              {keys.privAddr}
            </div>
            {warning()}
            <hr />
            <h3 style={{ color: "red" }}>Receive Bitcoin Below</h3>
            <div>
              <img
                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${crypto.pubAddr}`}
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
      </Container>
    </div>
  );
}

export default App;
