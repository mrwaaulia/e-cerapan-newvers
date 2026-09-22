import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-[18px] leading-[29.67px] tracking-[-1.14px] font-normal mb-8">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-[#2479BC]">{item.label}</span>
            ) : (
              <>
                <Link href={item.href || '/'} className="text-neutral-800 hover:text-black">
                  {item.label}
                </Link>
                <ChevronRight className="w-5 h-5 text-neutral-800" strokeWidth={1.5} />
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
