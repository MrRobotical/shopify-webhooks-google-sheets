# Shopify Webhook to Google Sheets Integration

This project is an experiment to capture Shopify order data using a webhook and automatically send it to a Google Spreadsheet. The key steps include:

Webhook Listener: A Shopify webhook listens for the orders/create event.
Google Sheets API: The captured order data (such as order ID, email, total price, and creation date) is appended to a Google Sheet using the Google Sheets API.
Express Server: An Express server handles incoming webhook requests, processes the data, and communicates with Google Sheets.
The project demonstrates how to connect Shopify and Google Sheets via webhooks and APIs.
