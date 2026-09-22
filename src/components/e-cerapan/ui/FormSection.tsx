import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-8 overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-200">
        <h2 className="text-[20px] font-semibold text-primary leading-[1.4]">
          {title}
        </h2>
      </div>
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}
