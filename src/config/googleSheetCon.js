const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'src/credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  const spreadsheetId = '1Z1_9f6ROsL0e6_nXmLBSD7Prxh_7YtGHJvp834RYPsI';

module.exports = {
    auth,
    spreadsheetId
}