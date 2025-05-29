import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (results: any[]) => {
  const dataForExcel = results.map((result) => {
    const options = result.sentence.options;

    return {
      "ID": result.sentence.id,
      "Pergunta": result.sentence.sentence,
      "Opção A": options.a.label,
      "Opção B": options.b.label,
      "Opção C": options.c.label,
      "Opção D": options.d.label,
      "Resposta Correta": Object.entries(options).find(([, opt]) => opt.correct)?.[1].label,
      "Correto?": result.correctly ? "Sim" : "Não",
      "Pronúncia": result.pronunciation ?? '',
      "Entonação": result.intonation ?? '',
      "Fluência": result.fluency ?? '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "resultado-teste.xlsx");
};
