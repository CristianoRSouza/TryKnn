"use client";

import { useEffect } from "react";

const WebComponentTestPage = () => {
  return (
    <iframe
      src="https://mkt.knnidiomas.com.br/teste-de-ingles-iframe"
      title="Teste de Inglês"
      style={{ width: "100%", height: "100vh", border: "none" }}
      allow="microphone; camera"
    />
  );
};

export default WebComponentTestPage;
