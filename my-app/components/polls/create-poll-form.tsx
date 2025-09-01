"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CreatePollData } from "@/types";

interface CreatePollFormProps {
  onSubmit: (data: CreatePollData) => Promise<void>;
  loading?: boolean;
}

export function CreatePollForm({
  onSubmit,
  loading = false,
}: CreatePollFormProps) {
  const [formData, setFormData] = useState<CreatePollData>({
    title: "",
    description: "",
    options: ["", ""],
    allowMultipleVotes: false,
    requireAuth: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Poll title is required";
    }

    const validOptions = formData.options.filter(
      (option) => option.trim() !== ""
    );
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 options are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        options: validOptions,
      });
    } catch (error) {
      console.error("Create poll error:", error);
    }
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData((prev) => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option)),
    }));
  };

  const toggleSetting = (
    setting: keyof Pick<CreatePollData, "allowMultipleVotes" | "requireAuth">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>
          Create a poll to gather opinions from the community
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Title *</Label>
            <Input
              id="title"
              placeholder="What's your question?"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              error={errors.title}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Add more context to your poll..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Poll Options *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={loading || formData.options.length >= 10}
              >
                Add Option
              </Button>
            </div>

            {errors.options && (
              <p className="text-sm text-destructive">{errors.options}</p>
            )}

            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    disabled={loading}
                  />
                  {formData.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(index)}
                      disabled={loading}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Poll Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Allow Multiple Votes</p>
                  <p className="text-sm text-muted-foreground">
                    Users can select multiple options
                  </p>
                </div>
                <Button
                  type="button"
                  variant={formData.allowMultipleVotes ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("allowMultipleVotes")}
                  disabled={loading}
                >
                  {formData.allowMultipleVotes ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Require Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Only logged-in users can vote
                  </p>
                </div>
                <Button
                  type="button"
                  variant={formData.requireAuth ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("requireAuth")}
                  disabled={loading}
                >
                  {formData.requireAuth ? "Required" : "Optional"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating Poll..." : "Create Poll"}
            </Button>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
