"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

import { useCreateProject } from "@/features/projects/api/use-create-project";
import { Button } from "@/components/ui/button";

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <div className="bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-white shadow-lg">
      <div className="hidden md:flex items-center justify-center bg-white/30 rounded-full w-28 h-28 shrink-0">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-[#0073ff] fill-[#0073ff]" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 text-center md:text-left max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          Visualize your ideas with <span className="text-yellow-300">The Canvas</span>
        </h1>
        <p className="text-sm md:text-base text-white/90">
          Turn inspiration into design in no time. Upload an image and let AI craft your canvas.
        </p>
        <Button
          onClick={onClick}
          disabled={mutation.isPending}
          variant="secondary"
          className="mt-2 w-[180px] hover:scale-105 transition-transform"
        >
          {mutation.isPending ? (
            <>
              Creating...
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            </>
          ) : (
            <>
              Start creating
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
