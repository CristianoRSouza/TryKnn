export async function uploadAudioToElsa(audioBlob: Blob, sentence: string) {
  const formData = new FormData();
  formData.append("sentence", sentence);
  formData.append("audio_file", audioBlob, "audio.wav");
  formData.append("api_plan", "premium");
  formData.append("return_feedback_hints", "true");
  formData.append("feedback_language", "pt-BR");

  const headers = {
    Authorization: `ELSA ${process.env.NEXT_PUBLIC_ELSA_API_KEY}`,
    Accept: "application/json",
  };

  const response = await fetch("https://api.elsanow.io/api/v3/score_audio", {
    method: "post",
    headers,
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Audio uploaded to Elsa:", result);
    return result;
  } else {
    console.error("Error uploading audio to Elsa:", response.statusText);
    return null;
  }
}
