import React from "react";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import styles from "./Counter.module.css";

interface CounterProps { 
  counterValue: number,
  setCounterValue: (newCounter: number) => void,
  basketLimit: number,
}

const Counter: React.FC<CounterProps> = ({counterValue, setCounterValue, basketLimit}) => {
    return (
        <div className={styles["counter-container"]}>
          <Button className="add-circle-button"
          disabled={counterValue === basketLimit}
          onClick={() => {
            if (counterValue < basketLimit) setCounterValue(counterValue + 1)
          }}>
            <AddCircle />
          </Button>
          {counterValue}
          <Button
          className="remove-circle-button"
          disabled={counterValue === 1}
          onClick={() => {
            if (counterValue > 1) setCounterValue(counterValue - 1);
            }}>
              <RemoveCircle />
          </Button>
        </div>
    )
}

export default Counter;
