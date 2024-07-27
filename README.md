# Frontend Task README

## Overview
A React + Typescript application that allows viewing and downloading `.json` or `.csv` files of data available from https://bored-api.appbrewery.com/random, including printing results in the browser console.

## Prerequisites
- Node.js
- npm

## Setup
1. Clone this repository
2. Install dependencies - `npm install`
   - since this project was made using CRA(create-react-app), some depencies might encounter an error on installation. For example, `export-to-csv` was added by also adding the `--legacy-peer-deps` flag. 
   - Most workarounds due to issues with Typescript found [here](https://github.com/facebook/create-react-app/issues/13080).
3. Start the development server - `npm start`
4. Navigate to `http://localhost:3000` in your browser.