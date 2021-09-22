import { saveAs } from 'file-saver';

export const exportWorkBook = (fileName, buffer) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const fileExtension = '.xlsx';

  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, fileName + fileExtension);
};
