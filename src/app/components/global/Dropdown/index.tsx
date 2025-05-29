import React, { useEffect, useRef, useState } from "react";

import { DropdownProps } from "./types";
import styles from "./styles.module.scss";
import ArrowDown from "@public/icons/keyboard_arrow_down.svg";
import { removeCaps } from "@/utils/textFormating";

const Dropdown: React.FC<DropdownProps> = ({
  data,
  placeholder,
  handleSelected,
  accentColor,
  customStyle,
  id,
  name,
  disabled,
  selectedValue,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(selectedValue || ""); // Initialize with selectedValue
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (handleSelected) {
      handleSelected(value);
    }
    setIsExpanded(false);
    setSelected(value);
  };

  useEffect(() => {
    setSelected(selectedValue || ""); // Update selected state when selectedValue prop changes
  }, [selectedValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (disabled) {
      setIsExpanded(false);
    }
  }, [disabled]);

  return (
    <>
      <div
        className={`${styles.container} ${
          disabled && styles.disabled
        } ${customStyle}`}
        id={id}
      >
        <div
          className={styles.trigger}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{selected !== "" ? selected : placeholder}</span>
          <ArrowDown />
        </div>
        {isExpanded && !disabled && (
          <div className={styles.options} ref={optionsRef}>
            <div className={styles.list}>
              {data &&
                data.map((item, index) => (
                  <div
                    className={styles.list__item}
                    id={`${item.id}`}
                    key={index}
                  >
                    <input
                      type="radio"
                      name={name}
                      id={item.value || item.slug}
                      value={item.value || removeCaps(item.title)}
                      onClick={handleSelection}
                      checked={
                        selected === item.value || selected === item.slug
                      } // Ensure the selected option is checked
                    />
                    <label htmlFor={item.value || item.slug}>
                      {item.value || removeCaps(item.title)}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
