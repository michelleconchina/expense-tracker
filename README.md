# Daily Expense Tracker

React Native + TypeScript (Expo) frontend for a Daily Expense Tracker, paired with the [ExpenseTracker.Api](https://github.com/michelleconchina/expense-tracker-api) C# backend. Built one phase at a time as a language-learning project.

## Stack

- Expo (React Native, TypeScript)
- Fetches from the ExpenseTracker.Api REST backend

## Running locally

Requires [Node.js](https://nodejs.org) and the [Expo Go](https://expo.dev/go) app on your phone (or an emulator/simulator).

```bash
npm install
npm start
```

Scan the QR code with Expo Go, or press `a` / `i` / `w` in the terminal for Android/iOS/web.

The backend must be running separately (see [ExpenseTracker.Api](https://github.com/michelleconchina/expense-tracker-api)). Since a phone can't reach `localhost`, point `fetch()` calls at your computer's LAN IP instead.

> Expo has changed significantly between versions — check the [versioned docs](https://docs.expo.dev/versions/v57.0.0/) for this project's Expo version before making changes.

## Project plan

This repo is built alongside a phased checklist (setup → backend foundations → data layer → CRUD API → frontend foundations → frontend features → polish). Check your saved plan artifact for the full breakdown and progress.
