"use client";

import { ChevronDown } from "lucide-react";

type SelectOption = {
  label?: string;
  value: string;
};

type SelectInputProps = {
  name?: string;
  label?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
};

export default function SelectInput({
  name,
  label,
  value,
  options,
  placeholder = "Select",
  onChange,
  disabled = false,
  required = false,
}: SelectInputProps) {
  return (
    <div className="relative inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-2 transition-colors focus-within:border-primary">
      {label && (
        <label
          htmlFor={name}
          className="shrink-0 text-sm uppercase tracking-wider text-muted"
        >
          {label}
        </label>
      )}

      <div className="relative flex h-full min-w-0 items-center">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          required={required}
          aria-label={label ? undefined : name}
          className="h-full min-w-0 cursor-pointer bg-background pr-5 text-sm text-text outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label ?? option.value}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-0 text-foreground"
        />
      </div>
    </div>
  );
}
