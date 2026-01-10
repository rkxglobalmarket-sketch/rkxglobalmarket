import React from "react";
import { useTranslation } from "react-i18next";

type LanguageOption = {
  key: string;
  label: string;
};

const languages: LanguageOption[] = [
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" },
  { key: "vi", label: "Việt nam" },
  { key: "zh", label: "中文繁体" },
  { key: "kr", label: "한국어" },
  { key: "th", label: "ภาษาไทย" },
];

export const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={i18n.language} onChange={handleChange} className="border px-2 py-1 rounded">
      {languages.map((lang) => (
        <option key={lang.key} value={lang.key}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

