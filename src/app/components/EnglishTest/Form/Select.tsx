"use client";
import { useEffect, useRef, useState } from "react";
import ArrowDown from "@public/icons/keyboard_arrow_down.svg";
import styles from "./styles.module.scss";
import { removeCaps, toPlainText } from "@/utils/textFormatter";
import Input from "./Input";

type SelectProps = {
  itemId: string;
  itemValue: string;
  itemPlaceholder: string;
  name: string;
  placeholder: string;
  data: any[];
  handleOptionSelection: (e: any) => void;
  isDisabled?: boolean;
  show?: boolean;
};

const Select = ({
  name,
  placeholder,
  data,
  handleOptionSelection,
  itemId,
  itemValue,
  itemPlaceholder,
  isDisabled = false,
  show,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [filterData, setFilterData] = useState<any[]>(data);

  const handleSelection = (e: React.MouseEvent) => {
    const target = e.target as HTMLInputElement;
    setFilterData(data);
    setSelectedOption(target.textContent || "");
    setShowOptions(false);

    handleOptionSelection(target.textContent);
  };

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleFilterData = (input: any) => {
    const value = toPlainText(input.value);

    const filteredData = data.filter((item) => {
      return toPlainText(item[itemPlaceholder]).startsWith(value);
    });

    setFilterData(filteredData);
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <div
      className={`${styles.select} ${isDisabled && styles.disabled} ${
        !show && styles.hide
      }`}
      ref={selectRef}
    >
      <div
        className={styles.trigger}
        onClick={() => setShowOptions(!showOptions)}
      >
        <span
          style={{
            color: `${selectedOption ? "#645fc9" : "#5e6d7e"}`,
            fontWeight: `${selectedOption ? "500" : "400"}`,
          }}
        >
          {selectedOption || placeholder}
        </span>
        <ArrowDown />
      </div>
      {showOptions && (
        <div className={styles.options} ref={optionsRef}>
          <div className={styles.search}>
            <Input
              id="search-state"
              name="search-state"
              placeholder="Digite para buscar"
              label="Buscar"
              onChange={handleFilterData}
            />
          </div>
          <div className={styles.radios}>
            {filterData.map((item, index) => (
              <div key={index} className={styles.option}>
                <input
                  type="radio"
                  id={item[itemId] || item?.school_data?.legal?.master_id}
                  name={name}
                  value={
                    item[itemValue]
                      ? item[itemValue]
                      : removeCaps(item?.title || "")
                  }
                />
                <label
                  htmlFor={item[itemId] || item?.school_data?.legal?.master_id}
                  onClick={handleSelection}
                >
                  {item[itemPlaceholder] || removeCaps(item?.title || "")}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
