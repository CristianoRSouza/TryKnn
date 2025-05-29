const N8N_ENDPOINT =
  "https://n8n.knnidiomas.com.br/webhook/ad1f8888-33f4-4d55-9cbe-a0944d0b3849";

// const N8N_ENDPOINT =
//   "https://knnbrasil.app.n8n.cloud/webhook/ad1f8888-33f4-4d55-9cbe-a0944d0b3849";

type userData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  name: string;
  email: string;
  phone: string;
  school?: string;
  state?: string;
  city?: string;
  master_id?: number | null;
  scores?: {
    fluency: number;
    pronunciation: number;
    intonation: number;
    toefl: number;
    toeic: number;
    ielts: number;
    pte: number;
  };
};

export const sendRDConversionEvent = async (
  userData: userData,
  identifier: string
) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: identifier,
        utm_source: userData.utm_source || "",
        utm_medium: userData.utm_medium || "",
        utm_campaign: userData.utm_campaign || "",
        utm_content: userData.utm_content || "",
        utm_term: userData.utm_term || "",
        gclid: userData.gclid || "",
        name: userData.name,
        email: userData.email,
        master_id: userData.master_id || null,
        phone: userData.phone,
        cf_school: userData.school || "",
        state: userData.state || "",
        city: userData.city || "",
        cf_fluency: `${userData?.scores?.fluency}` || null,
        cf_pronunciation: `${userData?.scores?.pronunciation}` || null,
        cf_intonation: `${userData?.scores?.intonation}` || null,
        cf_toefl: `${userData?.scores?.toefl}` || null,
        cf_toeic: `${userData?.scores?.toeic}` || null,
        cf_ielts: `${userData?.scores?.ielts}` || null,
        cf_pte: `${userData?.scores?.pte}` || null,
      },
    }),
  };

  try {
    const response = await fetch(
      `https://api.rd.services/platform/conversions?api_key=${process.env.NEXT_PUBLIC_RD_API_KEY}`,
      options
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro:", error);
  }
};

export const sendN8NConversionEvent = async (
  userData: userData,
  identifier: string
) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: identifier,
        utm_source: userData.utm_source || "",
        utm_medium: userData.utm_medium || "",
        utm_campaign: userData.utm_campaign || "",
        utm_content: userData.utm_content || "",
        utm_term: userData.utm_term || "",
        gclid: userData.gclid || "",
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        master_id: userData.master_id || null,
        cf_school: userData.school || "",
        state: userData.state || "",
        city: userData.city || "",
        cf_fluency: `${userData?.scores?.fluency}` || null,
        cf_pronunciation: `${userData?.scores?.pronunciation}` || null,
        cf_intonation: `${userData?.scores?.intonation}` || null,
        cf_toefl: `${userData?.scores?.toefl}` || null,
        cf_toeic: `${userData?.scores?.toeic}` || null,
        cf_ielts: `${userData?.scores?.ielts}` || null,
        cf_pte: `${userData?.scores?.pte}` || null,
      },
    }),
  };

  try {
    const response = await fetch(N8N_ENDPOINT, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro:", error);
  }
};
