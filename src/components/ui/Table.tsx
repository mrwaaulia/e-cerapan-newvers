import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export function Table({ children, className = "", ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={["w-full border-collapse text-left text-sm", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({
  children,
  className = "",
  ...props
}: TableSectionProps) {
  return (
    <thead
      className={["border-b border-gray-200 bg-white", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = "",
  ...props
}: TableSectionProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className = "",
  ...props
}: TableRowProps) {
  return (
    <tr
      className={["border-b border-gray-200", "last:border-b-0", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHeader({
  children,
  className = "",
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={["px-4 py-3", "font-medium text-primary", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
  ...props
}: TableCellProps) {
  return (
    <td
      className={["px-4 py-3", "text-sm text-black", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </td>
  );
}
