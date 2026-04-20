# NoteStack

A simple notes app built to manage your notes. It allows users to create note, update note, download note, delete note and see recommended notes and many more.

__________________________________________________________________

## Features

* Create, Edit, download, delete notes
* Light and Dark theme for better UX 
* Auth based routing system to protect user information
* Tags and keywords for recommendation notes

__________________________________________________________________

## Tech Stack

### Frontend

* Language - Javascript
* React(Frontend library to build SPA and responsive UI/UX)
* Tanstack query(Also knonw as react-query)
* TailwindCSS + DaisyUI

### Backend

* Language - Javascript
* Node.js(Runtime) 
* Express.js(Backend framework to build scalable APIs)
* Cloudinary(For cloud storage)

__________________________________________________________________

## Installation

* Clone the repository

```bash
git clone https://github.com/priyabratasahu360-dot/NoteStack.git
```

* Install dependencies
```bash
npm install 
```

* Run the application
```bash
npm run dev
```

__________________________________________________________________

## Project Structure

```
NoteStack/
├── backend/
│   ├── src/
│       ├── controllers 
│       │  └── auth.controller.js
│       │  └── note.controller.js
│       │  └── user.controller.js
│       ├── lib
│       │  └── Cloudinary.js
│       │  └── db.js
│       ├── middleware
│       │   └── auth.middleware.js
│       ├── models   
│       │    └── DownloadedNote.js
│       │    └── Note.js
│       │    └── User.js
│       ├── routes   
│       │    └── auth.route.js
│       │    └── note.route.js
│       │    └── user.route.js
│       ├── utils   
│       │    └── hash.js
│       │    └── isValid.js
│       │    └── jwt.js
│       ├── server.js    
│
├── frontend/
│   ├── src/
│   │   ├── api 
│   │   │  └── api.js
│   │   │  └── axios.js
│   │   ├── components
│   │   │  └── Footer.jsx
│   │   │  └── Navbar.jsx
│   │   │  └── NoteCard.jsx
│   │   │  └── Sidebar.jsx
│   │   ├── hooks
│   │   │   └── useThemeSelector.js
│   │   ├── layout   
│   │   │    └── DashBoardLayout.jsx
│   │   │    └── HomeLayout.jsx
│   │   ├── lib   
│   │   │    └── lib.js
│   │   ├── pages   
│   │   │    └── AboutPage.jsx
│   │   │    └── ContactPage.jsx
│   │   │    └── CreateNotePage.jsx
│   │   │    └── DashboardPage.jsx
│   │   │    └── DownloadedNotesPage.jsx
│   │   │    └── HomePage.jsx
│   │   │    └── LoginPage.jsx
│   │   │    └── NotesPage.jsx
│   │   │    └── ProfilePage.jsx
│   │   │    └── RecommendedNotesPage.jsx
│   │   │    └── SignupPage.jsx
│   │   │    └── UploadedNotesPage.jsx
│   │   ├── utils   
│   │   │    └── utils.js   
│   │   ├── App.jsx     
│   │   ├── index.css     
│   │   ├── main.jsx   
│   ├── index.html
```
__________________________________________________________________

## Future Improvements

* OAuth(google, github)
* Search functionality
* Clean UI/UX

## Live on render
```bash
https://notestack-53pa.onrender.com
```
__________________________________________________________________