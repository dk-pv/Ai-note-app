"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteCreateSchema } from "@/lib/validation";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof noteCreateSchema>;

interface NoteEditorProps {
  initial?: Partial<FormData & { _id?: string }>;
  onSave: (data: FormData & { _id?: string }) => Promise<void>;
  onCancel?: () => void;
}

export default function NoteEditor({ initial, onSave, onCancel }: NoteEditorProps) {
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
    resolver: zodResolver(noteCreateSchema) as any, // ✅ fix mismatch
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [initial]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await onSave({ ...data, _id: initial?._id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input {...register("title")} placeholder="Note title" />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Content</label>
        <Textarea
          {...register("content")}
          rows={6}
          placeholder="Write your note..."
        />
      </div>

      <div className="flex gap-2">
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
