import {useTranslation} from "react-i18next";

export {AppLocalizationProvider, useAppLocalizationContext} from "./provider";

export {default as i18n} from "./i18n";

export const useAppTranslation = () => {
  const {t: translate} = useTranslation();
  return translate;
};
