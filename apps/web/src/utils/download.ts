  export const handleTxtDownload = (text: string, filename: string) => {
    const baseName = filename.replace(/\.[^/.]+$/, "");

    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = `${baseName}-transcripted.txt`;
    document.body.appendChild(element);
    element.click();
  };
