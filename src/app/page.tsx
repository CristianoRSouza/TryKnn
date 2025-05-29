'use client';

import { useEffect } from 'react'
import EnglishTestWC from "./teste-de-ingles-iframe/page";
import { TestFlowProvider } from "@/contexts/TestFlowContext";
import { TestScoresProvider } from "@/contexts/TestScoresContext";

const Home = () => {

  useEffect(() => {
    const params = new URL(document.location.href).searchParams;

    const email = params.get("utm_email");
    const phone = params.get("utm_phone");
    const name = params.get("utm_name");

    if (!email || !phone || !name) {
      window.location.href = 'not-found'
    }
  })

  return (
    <TestFlowProvider>
      <TestScoresProvider>
        <EnglishTestWC />
      </TestScoresProvider>
    </TestFlowProvider>
  )
};

export default Home;
