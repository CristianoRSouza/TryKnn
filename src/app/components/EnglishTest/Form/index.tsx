"use client";
import styles from "./styles.module.scss";
import { useUserData } from "@/contexts/UserDataContext";
import { useTestFlow } from "@/contexts/TestFlowContext";
import { useTestScores } from "@/contexts/TestScoresContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import Select from "./Select";
import { states } from "@/data/br-states";
import { cities } from "@/data/br-cities";
import Input from "./Input";
import { sendN8NConversionEvent } from "@/services/rdConversionEvent";
import { checkEmail } from "@/utils/emailValidation";
import { searchSchoolsByLocation } from "@/services/fetchServices";
import { removeCaps } from "@/utils/textFormating";
import { useUtms } from "@/contexts/UTMContext";

type InputVariants = "default" | "error" | "success" | "warning";
type InputStates = {
  name: InputVariants;
  email: InputVariants;
  phone: InputVariants;
  state: InputVariants;
  city: InputVariants;
};

// Form component

const Form = () => {
  const { userData, setUserData } = useUserData();
  const { currentStep, goToNextStep } = useTestFlow();
  const { testScores } = useTestScores();

  const { utmParams, utms } = useUtms();

  useEffect(() => {
    if (currentStep === "initial") {
      setTimeout(() => {
        window.history.pushState(
          {},
          "",
          "/teste-de-nivel-de-ingles/dados-cadastrais" + utmParams
        );
      }, 1000);
    }

    if (currentStep === "final") {
      setTimeout(() => {
        window.history.pushState(
          {},
          "",
          "/teste-de-nivel-de-ingles/dados-escola" + utmParams
        );
      }, 1000);
    }
  }, [utmParams]);

  const pronunciationAverage =
    testScores.reduce((acc, score) => acc + score.pronunciation, 0) /
    testScores.length;

  const testScoresWithAllScores = testScores.filter(
    (score) =>
      score.intonation &&
      score.fluency &&
      score.ielts &&
      score.toefl &&
      score.toeic &&
      score.pte
  );
  const intonationAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.intonation, 0) /
    testScoresWithAllScores.length;
  const fluencyAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.fluency, 0) /
    testScoresWithAllScores.length;
  const toeflAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.toefl, 0) /
    testScoresWithAllScores.length;
  const toeicAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.toeic, 0) /
    testScoresWithAllScores.length;
  const ieltsAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.ielts, 0) /
    testScoresWithAllScores.length;
  const pteAverage =
    testScoresWithAllScores.reduce((acc, score) => acc + score.pte, 0) /
    testScoresWithAllScores.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    school: "",
    master_id: "",
  });

  const [inputStates, setInputStates] = useState<InputStates>({
    name: "default",
    email: "default",
    phone: "default",
    state: "default",
    city: "default",
  });

  const isEmailValid = checkEmail(formData.email);

  // * HANDLE INPUTS
  const handleInputChange = (input: any) => {
    let { name, value } = input;
    setInputStates({ ...inputStates, [name]: "default" });
    setFormData({ ...formData, [name]: value });
  };

  // * HANDLE SELECTS
  const [citiesBySelectedState, setCitiesBySelectedState] = useState<any[]>([]);
  const [schoolsBySelecetedCity, setSchoolsBySelectedCity] = useState<any[]>(
    []
  );
  const [loadingSchools, setLoadingSchools] = useState(false);

  const handleSelectedState = (option: string) => {
    const stateCode = states.find((state) => state.name === option)?.code;
    const citiesBySelectedState = cities.filter(
      (city) => city.state === stateCode
    );

    setCitiesBySelectedState(citiesBySelectedState);
    setFormData({ ...formData, state: option });
  };

  const handleSelectedCity = async (option: string) => {
    const stateCode = states.find((state) => state.name === option)?.code;

    setLoadingSchools(true);

    const schoolsByLocation = await searchSchoolsByLocation({
      uf: stateCode || "",
      city: option,
    });

    if (schoolsByLocation.length > 0) {
      setSchoolsBySelectedCity(schoolsByLocation);
    }

    setFormData({ ...formData, city: option });

    setLoadingSchools(false);
  };

  const handleSelectedSchool = (option: string) => {
    const school = schoolsBySelecetedCity.filter(
      (_) => removeCaps(_.title) === removeCaps(option)
    )[0];

    setFormData({
      ...formData,
      master_id: school.school_data.legal.master_id,
      school: school.school_data.legal.name,
    });
  };

  // * HANDLE FORM
  const [popOverMessage, setPopOverMessage] = useState<string>("");
  const handleForm = async (e: React.MouseEvent) => {
    e.preventDefault();

    const { name, email, phone, school, state, city } = formData;

    if (currentStep === "initial") {
      if (name.split(" ").length >= 2 && isEmailValid && phone.length > 7) {
        setUserData({ ...userData, name, email, phone });
        sendN8NConversionEvent(
          {
            utm_source: utms?.utm_source || "",
            utm_medium: utms?.utm_medium || "",
            utm_campaign: utms?.utm_campaign || "",
            utm_term: utms?.utm_term || "",
            utm_content: utms?.utm_content || "",
            gclid: utms?.gclid || "",
            master_id: Number(utms?.master_id) || null,
            name,
            email,
            phone,
          },
          `${
            utms?.master_id
              ? "Conversão KNN Speaking Test"
              : "Conversão KNN Speaking Test - Step 1"
          }`
        );
        goToNextStep();
      }
    }
    if (currentStep === "final") {
      if (state !== "" || city !== "") {
        sendN8NConversionEvent(
          {
            utm_source: utms?.utm_source || "",
            utm_medium: utms?.utm_medium || "",
            utm_campaign: utms?.utm_campaign || "",
            utm_term: utms?.utm_term || "",
            utm_content: utms?.utm_content || "",
            gclid: utms?.gclid || "",
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            master_id: Number(formData.master_id),
            school,
            state,
            city,
            scores: {
              fluency: fluencyAverage,
              pronunciation: pronunciationAverage,
              intonation: intonationAverage,
              toefl: toeflAverage,
              toeic: toeicAverage,
              ielts: ieltsAverage,
              pte: pteAverage,
            },
          },
          "Conversão KNN Speaking Test - Step 2"
        );
        goToNextStep();
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${
        currentStep !== "initial" && currentStep !== "final" && styles.hidden
      }`}
    >
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            priority={true}
            src={`${
              currentStep === "initial"
                ? "/initial-form-img.jpg"
                : "/final-form-img.jpg"
            }`}
            alt="Elsa"
            fill
            quality={65}
          />
        </div>
        <header className={styles.header}>
          <h2>
            {currentStep === "initial"
              ? "Personalize a sua experiência para continuar"
              : "Conclua seu cadastro para revelar seu nível de inglês"}
          </h2>
          <p>
            {currentStep === "initial"
              ? "Para garantirmos uma experiência única e exclusiva, preencha o formulário e descubra seu nível de inglês."
              : "Você está prestes de descobrir o seu nível de inglês! Complete o cadastro para acessar os resultados."}
          </p>
        </header>
        <form className={styles.form}>
          {(inputStates.name === "warning" ||
            inputStates.email === "warning" ||
            inputStates.phone === "warning") && (
            <div className={styles.pop__over}>{popOverMessage}</div>
          )}
          <div className={styles.input__groups}>
            <div className={styles.group}>
              {currentStep === "initial" ? (
                <>
                  <Input
                    id="name"
                    name="name"
                    label="Nome"
                    type="name"
                    value={formData.name}
                    placeholder="Digite seu nome"
                    onChange={handleInputChange}
                    state={inputStates.name}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <Input
                    id="email"
                    name="email"
                    label="E-mail"
                    type="email"
                    value={formData.email}
                    placeholder="Digite seu email"
                    onChange={handleInputChange}
                    state={inputStates.email}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <Input
                    id="phone"
                    name="phone"
                    label="Telefone"
                    value={formData.phone}
                    placeholder="Digite seu telefone"
                    onChange={handleInputChange}
                    maxLength={16}
                    type="phone"
                    state={inputStates.phone}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <Button
                    text="Clique para continuar"
                    onClick={handleForm}
                    iconStyle="filled"
                    disabled={
                      formData.name == "" ||
                      formData.email == "" ||
                      formData.phone == "" ||
                      !isEmailValid
                    }
                  />
                </>
              ) : (
                <>
                  <Select
                    data={states}
                    name="state"
                    placeholder="Selecione seu estado"
                    handleOptionSelection={handleSelectedState}
                    itemId="id"
                    itemValue="name"
                    itemPlaceholder="name"
                  />
                  <Select
                    data={citiesBySelectedState}
                    name="city"
                    placeholder="Selecione sua cidade"
                    handleOptionSelection={handleSelectedCity}
                    itemId="value"
                    itemValue="value"
                    itemPlaceholder="value"
                    isDisabled={citiesBySelectedState.length === 0}
                  />
                  {formData.city !== "" &&
                    formData.state !== "" &&
                    loadingSchools && (
                      <div className={styles.loading__schools}></div>
                    )}
                  {schoolsBySelecetedCity.length > 0 && (
                    <Select
                      data={schoolsBySelecetedCity}
                      name="school"
                      placeholder="Selecione uma escola"
                      handleOptionSelection={handleSelectedSchool}
                      itemId="id"
                      itemValue="name"
                      itemPlaceholder="name"
                      isDisabled={schoolsBySelecetedCity.length === 0}
                    />
                  )}
                  <Button
                    text="Clique para continuar"
                    onClick={handleForm}
                    icon={currentStep === "final" ? "rewarded_ads" : ""}
                    iconStyle="filled"
                    disabled={
                      schoolsBySelecetedCity.length > 0
                        ? formData.state == "" ||
                          formData.city == "" ||
                          !schoolsBySelecetedCity ||
                          formData.school == ""
                        : formData.state == "" || formData.city == ""
                    }
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
