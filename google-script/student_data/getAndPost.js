function doGet() {
  readDataFromSheet()
}

function readDataFromSheet() {
  var spreadsheetId = 'Google Sheet ID';
  var sheetName = 'google sheet name';
  // Open the spreadsheet by ID
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  // Get the sheet by name
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Define the range from which to read data (e.g., A1:B10)
  var range = sheet.getRange('A1:B10');

  // Get the values in the range
  var values = range.getValues();

  // Log the values
  Logger.log(values);
}

function doPost(e) {
  var spreadsheetId = '1NecxjbWS4mONIy7CJznGRN3LvdAwPICMiBeraXkS9TI';
  var sheetName = 'student_data';
  var data = JSON.parse(e.postData.contents);

  // Open the spreadsheet by ID
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  // Get the sheet by name
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Append the data to the sheet
  sheet.appendRow([data.name, data.standard, data.phone_number]);

  return ContentService.createTextOutput('Data added successfully');
}
