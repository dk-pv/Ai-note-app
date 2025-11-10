"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteCreateSchema } from "@/lib/validation";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AIButton from "@/components/AIButton";

type FormData = z.infer<typeof noteCreateSchema>;

interface NoteEditorProps {
  initial?: Partial<FormData & { _id?: string }>;
  onSave: (data: FormData & { _id?: string }) => Promise<void>;
  onCancel?: () => void;
}

export default function NoteEditor({
  initial,
  onSave,
  onCancel,
}: NoteEditorProps) {
  const [aiResult, setAiResult] = useState<string | string[] | null>(null);
  const [contentValue, setContentValue] = useState(initial?.content || "");
  const [showContentWarning, setShowContentWarning] = useState(false);

  const defaultValues: FormData = {
    title: initial?.title || "",
    content: initial?.content || "",
    tags: initial?.tags || [],
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(noteCreateSchema) as any,
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setContentValue(initial?.content || "");
  }, [initial, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await onSave({ ...data, _id: initial?._id });
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleAIAction = (type: "summary" | "improve" | "tags") => {
    if (!contentValue.trim()) {
      setShowContentWarning(true);
      return;
    }
    setShowContentWarning(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-xl bg-white dark:bg-gray-900 shadow-sm"
    >
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input {...register("title")} placeholder="Enter note title..." />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Content</label>
        <Textarea
          {...register("content")}
          rows={6}
          placeholder="Write your note content..."
          onChange={(e) => setContentValue(e.target.value)}
        />
        {errors.content && (
          <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
        )}
        {showContentWarning && (
          <p className="text-xs text-yellow-600 mt-1">
            Please fill in this field before using AI tools.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <AIButton
          type="summary"
          content={contentValue}
          onClick={() => handleAIAction("summary")}
          onResult={(r) => setAiResult(r)}
        />
        <AIButton
          type="improve"
          content={contentValue}
          onClick={() => handleAIAction("improve")}
          onResult={(r) => setAiResult(r)}
        />
        <AIButton
          type="tags"
          content={contentValue}
          onClick={() => handleAIAction("tags")}
          onResult={(r) => setAiResult(r)}
        />
      </div>

      {aiResult && (
        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 mt-3">
          <h3 className="font-semibold mb-2">AI Result:</h3>
          {Array.isArray(aiResult) ? (
            <ul className="list-disc list-inside space-y-1">
              {aiResult.map((tag, i) => (
                <li key={i} className="text-sm">
                  #{tag}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed">{aiResult}</p>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
