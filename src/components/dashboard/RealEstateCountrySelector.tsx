import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

interface RealEstateCountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

const RealEstateCountrySelector: React.FC<RealEstateCountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  className,
}) => {
  // List of important countries for real estate investment
  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "sg", label: "Singapore" },
    { value: "ae", label: "UAE (Dubai)" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "ch", label: "Switzerland" },
    { value: "es", label: "Spain" },
    { value: "fr", label: "France" },
    { value: "cn", label: "China" },
    { value: "hk", label: "Hong Kong" },
    { value: "br", label: "Brazil" },
    { value: "mx", label: "Mexico" },
    { value: "th", label: "Thailand" },
    { value: "pt", label: "Portugal" },
    { value: "gr", label: "Greece" },
    { value: "it", label: "Italy" },
    { value: "tr", label: "Turkey" },
  ];

  return (
    <div className={className}>
      <div className="flex items-center mb-2">
        <Globe className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
        <Label className="text-sm font-medium">Select Country</Label>
      </div>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
        Real estate data and insights will be tailored to the selected country
      </p>
    </div>
  );
};

export default RealEstateCountrySelector;
