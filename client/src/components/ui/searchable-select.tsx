import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchableSelectProps {
  options: { id: number | string; label: string }[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  searchPlaceholder?: string;
}

export function SearchableSelect({
  options,
  placeholder,
  value,
  onValueChange,
  disabled = false,
  searchPlaceholder = "ค้นหา...",
}: SearchableSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  };

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="px-2 py-2">
          <div className="flex items-center border rounded-md px-3 py-1">
            <Search className="h-4 w-4 mr-2 text-gray-500" />
            <input
              className="w-full bg-transparent border-none focus:outline-none text-sm placeholder:text-gray-500"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <SelectGroup>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.id} value={String(option.id)}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="text-center py-2 text-sm text-gray-500">
              ไม่พบรายการที่ค้นหา
            </div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
