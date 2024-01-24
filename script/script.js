const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

const excelFilePath = "../excel_data/Test Metadata.xlsx";
const folderPath = "../sample_files/";
const folderPathNewMeta = "../new_metadata_files";

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

renameFilesFromExcel(excelFilePath, folderPath);

let i = 0;
function updateJsonData(folderPath) {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      const filePath = path.join(folderPath, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const nftName = path.parse(file).name;
      if (jsonData["name"] !== ` `) {
        jsonData["name"] = `NFT #${nftName}`;
        jsonData.symbol = "NFT";
        jsonData.collection = "NFT";
        jsonData["image"] = `${nftName}.jpg`;
        jsonData["description"] = `Say hello to my NFT`;
      }

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
      console.log(`Updated ${file}, Total No.of files ${i++}`);
    }
  });
}

updateJsonData(folderPathNewMeta);
