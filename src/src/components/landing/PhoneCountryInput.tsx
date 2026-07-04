import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface CountryOption {
  iso2: string;
  name: string;
  dial: string;
  flag: string;
  minLen: number;
  maxLen: number;
}

/** Curated list — dial code + rough national-number digit length per country. */
export const COUNTRIES: CountryOption[] = [
  { iso2: "FR", name: "France", dial: "33", flag: "🇫🇷", minLen: 9, maxLen: 9 },
  { iso2: "CM", name: "Cameroun", dial: "237", flag: "🇨🇲", minLen: 9, maxLen: 9 },
  { iso2: "BE", name: "Belgique", dial: "32", flag: "🇧🇪", minLen: 8, maxLen: 9 },
  { iso2: "CH", name: "Suisse", dial: "41", flag: "🇨🇭", minLen: 9, maxLen: 9 },
  { iso2: "CA", name: "Canada", dial: "1", flag: "🇨🇦", minLen: 10, maxLen: 10 },
  { iso2: "US", name: "États-Unis", dial: "1", flag: "🇺🇸", minLen: 10, maxLen: 10 },
  { iso2: "GB", name: "Royaume-Uni", dial: "44", flag: "🇬🇧", minLen: 10, maxLen: 10 },
  { iso2: "SN", name: "Sénégal", dial: "221", flag: "🇸🇳", minLen: 9, maxLen: 9 },
  { iso2: "CI", name: "Côte d'Ivoire", dial: "225", flag: "🇨🇮", minLen: 8, maxLen: 10 },
  { iso2: "MA", name: "Maroc", dial: "212", flag: "🇲🇦", minLen: 9, maxLen: 9 },
  { iso2: "DZ", name: "Algérie", dial: "213", flag: "🇩🇿", minLen: 9, maxLen: 9 },
  { iso2: "TN", name: "Tunisie", dial: "216", flag: "🇹🇳", minLen: 8, maxLen: 8 },
  { iso2: "DE", name: "Allemagne", dial: "49", flag: "🇩🇪", minLen: 10, maxLen: 11 },
  { iso2: "ES", name: "Espagne", dial: "34", flag: "🇪🇸", minLen: 9, maxLen: 9 },
  { iso2: "IT", name: "Italie", dial: "39", flag: "🇮🇹", minLen: 9, maxLen: 10 },
  { iso2: "PT", name: "Portugal", dial: "351", flag: "🇵🇹", minLen: 9, maxLen: 9 },
  { iso2: "NL", name: "Pays-Bas", dial: "31", flag: "🇳🇱", minLen: 9, maxLen: 9 },
  { iso2: "GH", name: "Ghana", dial: "233", flag: "🇬🇭", minLen: 9, maxLen: 9 },
  { iso2: "NG", name: "Nigéria", dial: "234", flag: "🇳🇬", minLen: 10, maxLen: 10 },
  { iso2: "CD", name: "RD Congo", dial: "243", flag: "🇨🇩", minLen: 9, maxLen: 9 },
  { iso2: "CG", name: "Congo", dial: "242", flag: "🇨🇬", minLen: 9, maxLen: 9 },
  { iso2: "GA", name: "Gabon", dial: "241", flag: "🇬🇦", minLen: 7, maxLen: 8 },
  { iso2: "BJ", name: "Bénin", dial: "229", flag: "🇧🇯", minLen: 8, maxLen: 8 },
  { iso2: "TG", name: "Togo", dial: "228", flag: "🇹🇬", minLen: 8, maxLen: 8 },
  { iso2: "ML", name: "Mali", dial: "223", flag: "🇲🇱", minLen: 8, maxLen: 8 },
  { iso2: "BF", name: "Burkina Faso", dial: "226", flag: "🇧🇫", minLen: 8, maxLen: 8 },
  { iso2: "IN", name: "Inde", dial: "91", flag: "🇮🇳", minLen: 10, maxLen: 10 },
  { iso2: "BR", name: "Brésil", dial: "55", flag: "🇧🇷", minLen: 10, maxLen: 11 },
  { iso2: "AU", name: "Australie", dial: "61", flag: "🇦🇺", minLen: 9, maxLen: 9 },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

export function isValidPhoneForCountry(country: CountryOption, value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= country.minLen && digits.length <= country.maxLen;
}

export function toE164(country: CountryOption, value: string) {
  return `+${country.dial}${value.replace(/\D/g, "")}`;
}

export function PhoneCountryInput({
  country,
  onCountryChange,
  value,
  onChange,
  placeholder,
  invalid,
}: {
  country: CountryOption;
  onCountryChange: (c: CountryOption) => void;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={`flex items-center rounded-xl border bg-white transition focus-within:ring-2 ${
          invalid
            ? "border-red-400 focus-within:ring-red-200"
            : "border-border focus-within:border-accent-green focus-within:ring-accent-green/20"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 pl-4 pr-2.5 h-11 text-sm shrink-0 border-r border-border text-foreground"
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span className="text-muted-foreground">+{country.dial}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
        </button>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d\s]/g, ""))}
          placeholder={placeholder}
          className="flex-1 h-11 px-3 text-sm outline-none bg-transparent min-w-0"
        />
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute z-30 mt-1.5 w-72 max-h-56 overflow-y-auto rounded-xl border border-border bg-white soft-shadow py-1.5">
            {COUNTRIES.map((c) => (
              <button
                key={c.iso2}
                type="button"
                onClick={() => {
                  onCountryChange(c);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm hover:bg-secondary text-left transition-colors ${
                  c.iso2 === country.iso2 ? "bg-accent-green/5" : ""
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1 text-foreground">{c.name}</span>
                <span className="text-muted-foreground">+{c.dial}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
