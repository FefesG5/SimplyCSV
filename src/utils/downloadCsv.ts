const downloadCsv = (csvData: string, filename?: string): void => {
  if (!csvData) return;

  try {
    if (!filename) {
      const now = new Date();
      filename = `data_${now.toISOString().replace(/[:\-]|\.\d{3}/g, "")}.csv`;
    }

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link); // Append to body to ensure visibility in all browsers
    link.click();
    document.body.removeChild(link); // Clean up after download
  } catch (error) {
    console.error("An error occurred during the CSV download:", error);
    // Optionally, provide user feedback about the error here
  }
};

export default downloadCsv;
