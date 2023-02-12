// Description: This file is the main entry point for the application
// Imoprt the functions from functions.js
import { indexPage, billsPage, billDetailsPage } from "./functions";

// Load Index Page
try {
  indexPage();
} catch (error) {
  throw error;
  console.log("Index Page Not Loaded!")
}

// Load Bills Page
try {
  billsPage();
} catch (error) {
  throw error;
  console.log("Bills Page Not Loaded!")
}

// Load Bill Details Page
try {
  billDetailsPage();
} catch (error) {
  throw error;
  console.log("Bill Details Page Not Loaded!")
}
