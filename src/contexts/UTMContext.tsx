import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type TUtms =
  | {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
    gclid?: string | null;
    city?: string | null;
    state?: string | null;
    master_id?: string | null;
    filled?: string | null;
    email?: string | null;
    phone?: string | null;
    name?: string | null;
  }
  | undefined;

const UtmsContext = createContext<{
  utms: TUtms;
  setUtms: Dispatch<SetStateAction<TUtms>>;
  utmParams?: string;
  sessionChecked: boolean;
  setSessionChecked: Dispatch<SetStateAction<boolean>>;
}>({
  utms: undefined,
  setUtms: () => { },
  sessionChecked: false,
  setSessionChecked: () => { },
});

export const useUtms = () => useContext(UtmsContext);

export const UtmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [utms, setUtms] = useState<TUtms>();
  const [utmParams, setUtmParams] = useState<string>("");
  const [sessionChecked, setSessionChecked] = useState<boolean>(false);

  useEffect(() => {
    // Obtém os parâmetros UTM da URL
    const params = new URL(document.location.href).searchParams;
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_term = params.get("utm_term");
    const utm_content = params.get("utm_content");
    const city = params.get("city");
    const state = params.get("state");
    const gclid = params.get("gclid");
    const master_id = params.get("master_id");
    const filled = params.get("filled");

    // Define os UTMs no estado
    if (master_id) {
      setUtms((prev) => ({ ...prev, master_id }));
    }

    if (utm_source) {
      setUtms((prev) => ({ ...prev, utm_source }));
    }

    if (utm_medium) {
      setUtms((prev) => ({ ...prev, utm_medium }));
    }

    if (utm_campaign) {
      setUtms((prev) => ({ ...prev, utm_campaign }));
    }

    if (utm_term) {
      setUtms((prev) => ({ ...prev, utm_term }));
    }

    if (utm_content) {
      setUtms((prev) => ({ ...prev, utm_content }));
    }

    if (city) {
      setUtms((prev) => ({ ...prev, city }));
    }

    if (state) {
      setUtms((prev) => ({ ...prev, state }));
    }

    if (gclid) {
      setUtms((prev) => ({ ...prev, gclid }));
    }

    if (filled) {
      setUtms((prev) => ({ ...prev, filled }));
    }
  }, []);

  useEffect(() => {
    if (utms) {
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(utms)) {
        if (value) {
          params.append(key, value);
        }
      }

      setUtmParams(params.toString());
    }
  }, [utms]);

  return (
    <UtmsContext.Provider
      value={{
        utms,
        setUtms,
        utmParams: utmParams ? `?${utmParams}` : "",
        sessionChecked,
        setSessionChecked,
      }}
    >
      {children}
    </UtmsContext.Provider>
  );
};
