function doGet(e) {
  var id = e.parameter.id;
  //var id = "QhCOAPBCLKJaal";
  return readDataFromSheet(id);
}

function getSheet(){
  var spreadsheetId = '';
  var sheetName = '';

  // Open the spreadsheet by ID
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  // Get the sheet by name
  return spreadsheet.getSheetByName(sheetName);
}

function readDataFromSheet(id) {
  var sheet = getSheet()
  // Define the range from which to read data (e.g., A1:B10)
  var range = sheet.getRange('A1:G10');

  // Get the values in the range
  var values = range.getValues();

  var res;
  values.forEach((value) => {
    if (value[0] == id){
       const studentObject = {
          id: value[0],
          name: value[1],
          class: value[2],
          phoneNumber: value[3],
          createdAt: value[4],
          updatedAt: value[5],
          deletedAt: value[6],
    };
      res = ContentService.createTextOutput(JSON.stringify(studentObject)).setMimeType(ContentService.MimeType.JSON); 
      return
    }
  });
  return res;

  return ContentService.createTextOutput(id);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = getSheet()

  var id = getId(); 

  var currentTimestamp = Math.floor(Date.now() / 1000)
  // Append the data to the sheet
  var dataToAdd = [id, data.name, data.class, data.phone_number, currentTimestamp, currentTimestamp, 0];
  sheet.appendRow(dataToAdd);

  return ContentService.createTextOutput(JSON.stringify(dataToAdd));
}


function getId() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = 14; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

    return result;
}
