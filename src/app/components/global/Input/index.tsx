"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatPhoneNumner, isEmailValid } from "@/utils/formValidation";
import { toPlainText } from "@/utils/textFormatter";
import styles from "./styles.module.scss";
import { SearchItem, InputProps } from "./types";

import Success from "@public/icons/form/check_circle.svg";
import Warning from "@public/icons/form/error.svg";
import Error from "@public/icons/form/dangerous.svg";

const Input = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  isSearch = false,
  data,
  type = "default",
  maxLength,
  state = "default",
  customStyle,
  onClick,
  onBlur,
  formData,
  setFormData,
}: InputProps) => {
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const [inputStatus, setInputStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const inputElement = inputRef.current;

      if (
        type === "phone" &&
        inputElement &&
        (e.key === "Backspace" || e.key === "Delete")
      ) {
        const selectionStart = inputElement.selectionStart;
        const selectionEnd = inputElement.selectionEnd;

        if (selectionStart !== selectionEnd) {
          // Se há uma seleção, remova a seleção
          setInputValue("");
          setFormData && setFormData({ ...formData, phone: "" });
          e.preventDefault();

          setInputStatus("default");
          setHasValue(false);
        } else {
          // Se não há seleção, remova o último caractere
          const rawValue = inputValue.replace(/\D/g, "");
          const formattedValue = formatPhoneNumner(rawValue.slice(0, -1));
          setInputValue(formattedValue);
          setFormData && setFormData({ ...formData, phone: formattedValue });
          e.preventDefault();
          if (inputValue === "") {
            setInputStatus("default");
            setHasValue(false);
          }
        }
      }
    };

    const inputElement = inputRef.current;
    inputElement?.addEventListener("keydown", handleKeyDown);

    return () => {
      inputElement?.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const rawValue = value.replace(/\D/g, "");
    const formattedValue = formatPhoneNumner(rawValue);

    if (value === "") {
      setResults([]);
      setShowResults(false);
      setInputStatus("default");
    }

    const results = data?.filter((item: SearchItem) => {
      return toPlainText(item.value!.toLowerCase()).includes(
        toPlainText(value.toLowerCase())
      );
    });

    if (results && results.length > 0) {
      setResults(results);
      setShowResults(true);
    }

    if (type === "name" && value.split(" ").length > 1) {
      setInputStatus("success");
    }

    if (type === "name" && value.split(" ").length < 2) {
      setInputStatus("default");
    }

    if (type === "phone") {
      setInputStatus(value.length >= 10 ? "success" : "default");
      setInputValue(formattedValue);
    }

    if (type === "email" && isEmailValid(value)) {
      setInputStatus("success");
    }

    if (type === "email" && !isEmailValid(value)) {
      setInputStatus("default");
    }

    setHasValue(value.length > 0);

    if (type !== "phone") {
      setInputValue(value);
    }
    setFormData && setFormData({ ...formData, [name]: value });

    onChange && onChange(e);
  };

  const handleSelection = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const value = target.innerText;

    if (onClick) {
      onClick(value);
    }

    setInputValue(value);
    setResults([]);
    setShowResults(false);
  };

  const handleBlur = (e: any) => {
    const { value } = e.target;
    setIsFocused(false);

    if (value === "") {
      setInputStatus("default");
    }

    if (type === "name" && value.split(" ").length < 2 && value !== "") {
      setErrorMessage("Por favor, insira o nome completo");
      setInputStatus("error");
    }

    if (type === "phone" && value.length < 8 && value !== "") {
      setErrorMessage("Por favor, insira um número de telefone válido");
      setInputStatus("error");
    }

    if (type === "email" && !isEmailValid(value) && value !== "") {
      setErrorMessage("Por favor, insira um e-mail válido");
      setInputStatus("error");
    }
  };

  return (
    <div className={`${styles.container} ${customStyle}`} ref={containerRef}>
      <div className={`${styles.input__wrapper} ${styles[inputStatus]}`}>
        <input
          id={id}
          name={name}
          type={
            type === "phone" ? "tel" : type === "password" ? "password" : "text"
          }
          placeholder={placeholder}
          value={inputValue}
          // value={value || inputValue}
          className={styles.input}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          autoComplete="off"
          maxLength={type === "phone" ? 15 : maxLength}
          ref={inputRef}
        />
        <label
          className={styles.label}
          style={{
            opacity: `${
              hasValue && isFocused ? 1 : hasValue && !isFocused ? 0 : 1
            }`,
          }}
          htmlFor={id}
        >
          {label}
        </label>
        {inputStatus === "error" && <Error className={styles.icon} />}
        {inputStatus === "success" && <Success className={styles.icon} />}
        {inputStatus === "warning" && <Warning className={styles.icon} />}
        {inputStatus === "error" && (
          <div className={styles.error__message}>{errorMessage}</div>
        )}
      </div>
      {isSearch && showResults && (
        <div className={styles.results} ref={resultsRef}>
          <ul>
            {results.map((item: SearchItem, index: number) => {
              return (
                <li
                  key={index}
                  id={item.id?.toString()}
                  onClick={handleSelection}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
