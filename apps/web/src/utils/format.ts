export const formatDate = (dateString?: string) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
};

export const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}m ${sec}s`;
};

export const formatStatus = {
  PROCESSING: "Processando",
  DONE: "Concluído",
  FAILED: "Falhou",
};
