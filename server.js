const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const keys = require('./credentials.json');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function appendOrderToSheet(orderData) {
  const sheetId = '1qMH3lFW2-YvhGcJy42-N-4uKtEL4ObnPkX7_4VFN-WY';
  const range = 'Sheet1!A1';
  const values = [
    [
      orderData.id,
      orderData.email,
      orderData.total_price,
      new Date(orderData.created_at).toLocaleString(),
    ],
  ];

  const resource = {
    values,
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });
}

app.post('/webhook/orders/create', async (req, res) => {
  const orderData = req.body;
  console.log('Order data received', orderData);
  try {
    await appendOrderToSheet(orderData);
    res.status(200).send('Webhook received and order saved to Google Sheets');
  } catch (error) {
    console.error('Error saving order to Google Sheets:', error);
    res.status(500).send('Error saving order to Google Sheets');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
