"use client"
import React, { ChangeEvent } from "react";

interface TextareaProps {
    minRows: number
    className: string
    onChange :(e: ChangeEvent<HTMLTextAreaElement>) => void
    initialVal?: string
}

const CustomTextarea = ({minRows, className, onChange, initialVal}: TextareaProps) => {
    const [rows, setRows] = React.useState(minRows);
    const [value, setValue] = React.useState(initialVal || "");
    
    React.useEffect(() => {
      const rowlen = value.split("\n");
  
      if (rowlen.length > minRows) {
        setRows(rowlen.length);
      }
    }, [value, minRows]);
  
    return (
      <textarea value={value} placeholder="Add description" onChangeCapture={onChange} className={className} rows={rows} onChange={(text) => setValue(text.target.value)} />
    );
  }

  export default CustomTextarea