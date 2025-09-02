import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

const Keywords = ({ defaultKeywords = [], onChange, placeholder }) => {
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [inputValue, setInputValue] = useState("");

  // Sync with parent component's state
  useEffect(() => {
    setKeywords(defaultKeywords);
  }, [defaultKeywords]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const values = inputValue.includes(",")
        ? inputValue
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
        : [inputValue.trim()];
      const newKeywords = [...new Set([...keywords, ...values])];
      setKeywords(newKeywords);
      setInputValue("");
      onChange?.(newKeywords);
    }
  };

  const removeKeyword = (indexToRemove) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    setKeywords(newKeywords);
    onChange?.(newKeywords);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center shadow bg-gray-100 dark:bg-gray-500 rounded px-2 py-0.5 group relative"
          >
            <span>{keyword}</span>
            <button
              onClick={() => removeKeyword(index)}
              className="ml-2 opacity-70 group-hover:opacity-100 text-foreground group-hover:text-red-500 transition-opacity"
              title="Remove keyword"
              type="button"
            >
              <Icons.x size={14} />
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`${placeholder} (press Enter)`}
      />
    </div>
  );
};

export default Keywords;
