"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");
  
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(delay);
  }, [value, onSearch]);

  return (
    <Input
      placeholder="Search notes..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full"
    />
  );
}
