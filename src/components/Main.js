import { memo, useState } from "react";
import { calculatorButtons } from "../data/button-data";
import safeEval from "../utils/safeEval";
import Screen from "./Screen";
import Button from "./Button";

const Main = () => {
  const [screen, setScreen] = useState("");
  const [btnCalc, setBtnCalc] = useState("");
  const [memory, setMemory] = useState("");

  const handleClick = (type, value) => {
    switch (type) {
      case "number":
        setBtnCalc(`${btnCalc}${value}`);
        break;
      case "operator":
        switch (value) {
          case "Square Root":
            setBtnCalc(Math.sqrt(btnCalc));
            break;
          case "Percent":
            setBtnCalc(btnCalc * 0.01);
            break;
          default:
            setBtnCalc(`${btnCalc}${value}`);
        }
        break;
      case "decimal":
        setBtnCalc(`${btnCalc}${value}`);
        break;
      case "memory":
        memFunc(value);
        break;
      case "enter":
        const newStr = safeEval(btnCalc);
        setBtnCalc(newStr);
        console.log("Result: ", newStr);
        break;
      default:
        console.log(type);
    }
  }

    // To be separated when we migrate to switch case statement

    const memFunc = (value) => {
      if (value === "Memory Save") {
      
        const plainCalc = Number(btnCalc);

        // Number Validation
        if (Number.isNaN(plainCalc) || plainCalc === null) {
          console.log("a");
          setScreen("Error");
          setBtnCalc("");
          setMemory("");
        } else {
          console.log("b");
          setMemory(btnCalc);
        }

      } else if (value === "Memory Clear") {
        setMemory("");
      } else if (value === "Memory Recall") {
        setScreen(memory);
      } else if (value === "Memory Addition") {
        setBtnCalc(`${btnCalc}+${memory}`);
        setScreen(`${btnCalc} + ${memory}`);
      } else if (value === "Memory Subtract") {
        setBtnCalc(`${btnCalc}-${memory}`);
        setScreen(`${btnCalc} - ${memory}`);
      }
    };

  return (
    <main>
      <section className="screen">
        <Screen />
      </section>

      <section className="buttons">
        {calculatorButtons.map((item) => {
          return (
            <Button
              key={item.value}
              type={item.type}
              className={item.className}
              text={item.text}
              value={item.value}
              onClick={handleClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
