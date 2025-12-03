# Lead Management App

A simple **Lead Management System** built with **Next.js**, **React**, and **Tailwind CSS**, connected to a backend API for managing leads.  

This app allows you to:

- View all leads.
- Add new leads with name, email, and status.
- Track leads with a status badge and creation date.
- See statistics like total leads, new, engaged, and won leads.

---

## Features

- **Authentication check**: Redirects to login if the user is not authenticated.
- **Dynamic lead fetching**: Fetches leads from your backend using JWT token.
- **Add Lead**: Create new leads and automatically refresh the list.
- **Lead Stats**: Displays total leads, new, engaged, and won counts.
- **Status styling**: Color-coded statuses with icons.

---

## Tech Stack

- **Frontend**: Next.js 13+, React, Tailwind CSS
- **Backend**: Node.js + Express (separate backend)
- **Authentication**: JWT token (stored in `localStorage`)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lead-management-app.git
cd lead-management-app

## Install dependencies:

1. npm install


## Open your browser:

http://localhost:3000


Install dependencies and configure environment variables:

