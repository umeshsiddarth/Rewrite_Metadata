const fs = require("fs");
const xlsx = require("xlsx");

const excelFilePath = "Test Metadata.xlsx";
const folderPath = "Test Metadata";

function renameFile(oldName, newName) {
  fs.rename(oldName, newName, (err) => {
    if (err) throw err;
    console.log(`${oldName} has been renamed to ${newName}`);
  });
}

function renameFilesFromExcel(excelFilePath, folderPath) {
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const excelData = xlsx.utils.sheet_to_json(sheet);

  excelData.forEach((row) => {
    const ofnum = row["Old File Number"];
    const nfnum = row["New File Number"];

    const ofname = `${folderPath}/${ofnum}.json`;
    const nfname = `${folderPath}/${nfnum}.json`;
    renameFile(ofname, nfname);
  });
}

renameFile(excelFilePath, folderPath);
