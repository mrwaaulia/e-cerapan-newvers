import React from "react";
import { Card } from "@heroui/react";

export interface CreatorCardProps {
  steps: number;
  title: string;
  description: string;
  className?: string;
}

export function CreatorCard({
  steps,
  title,
  description,
  className,
}: CreatorCardProps) {
  return (
    <Card
      className={`w-2xs h-100  bg-white rounded-3xl shadow-sm border border-gray-100 ${className || ""}`}
    >
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="flex flex-col items-start">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
            {steps}
          </div>

          <Card.Title className="text-lg font-bold text-gray-900">
            {title}
          </Card.Title>

          <Card.Description className="mt-2 text-sm text-neutral leading-relaxed text-left">
            {description}
          </Card.Description>
        </Card.Header>

        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-1 w-12 rounded-full bg-warning"></div>
        </Card.Footer>
      </div>
    </Card>
  );
}
