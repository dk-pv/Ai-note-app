"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAI } from "@/hooks/useAI";

interface AIButtonProps {
  type: "summary" | "improve" | "tags";
  content: string;
  onResult: (result: string | string[]) => void;
}

const labelMap = {
  summary: "Summarize",
  improve: "Improve",
  tags: "Generate Tags",
};

export default function AIButton({ type, content, onResult }: AIButtonProps) {
  const { callAI, loading } = useAI();

  const handleClick = async () => {
    if (!content.trim()) return alert("Please write something first!");
    const result = await callAI(type, content);
    if (!result) return;
    if (type === "tags") onResult(result.tags);
    else if (type === "summary") onResult(result.summary);
    else if (type === "improve") onResult(result.improved);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Sparkles size={16} />
      {loading ? "Thinking..." : labelMap[type]}
    </Button>
  );
}
