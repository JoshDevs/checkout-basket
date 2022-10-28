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
  const onAddClickHandler = () => {
    if (counterValue < basketLimit) setCounterValue(counterValue + 1)
  };

  const onRemoveClickHandler = () => {
    if (counterValue > 1) setCounterValue(counterValue - 1);
  }

  return (
      <div className={styles["counter-container"]}>
        <Button className="add-circle-button"
        disabled={counterValue === basketLimit}
        onClick={onAddClickHandler}>
          <AddCircle />
        </Button>
        {counterValue}
        <Button
        className="remove-circle-button"
        disabled={counterValue === 1}
        onClick={onRemoveClickHandler}>
            <RemoveCircle />
        </Button>
      </div>
  )
}

export default Counter;
