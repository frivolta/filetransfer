<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/vvWZZLF.jpg" alt="Share Logo"></a>
</p>

<h3 align="center">File Transfer v.1.0</h3>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

<img width="100%" src="https://imgur.com/obJ9kXG.jpg" alt="Share Logo">
<br/>
<br/>
This application let you easily upload and share multiple files with others. Based on MERN stack: MongoDB, Express, React, Node, features Redux and S3.
The project is structured in two main folders: api, app. The first one manage the server architecture, the second one takes care of the client side.
The Server is indipendent from the client and the other way around.

The initial purpose of this project was testing ES6 classes pattern with Express.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

As part of the MERN stack the following resources are required before bootstrap the project.

- A MongoDB database to connect to.
- Node, NPM
- A bucket on S3 with a granted user
- An SMTP server credential to send email with the share links

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone the project:

```
git clone git@github.com:frivolta/filetransfer-app.git
```

The project is structured in two main folders: /api, /app. The first one manage the server architecture, the second one takes care of the client side.
The Server is indipendent from the client and the other way around.
cd into /api folder and install the dependencies necessary to run the

```
cd api
npm install
```

Repeat the same step for the client in the /app folder, assuming you are still in the api folder:

```
cd ..
cd app
npm install
```

You will find a .env_example file both in the /api and in the /app folders. You need to edit those files with your environment variables.

Now you can start the server:

```
cd api
npm run dev
```

and the client:

```
cd app
npm run start
```

## 🎈 Usage <a name="usage"></a>

Add a file to store and share clicking the "Upload file button", insert the sender and the receiver email: an email containing the shared link will be sent to the last one.
THe user can download a single file or all of them inside a zip archive.
By default files are store on S3 for 3 hours, you can change this configuration in the S3 class inside the /api folder.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [React](https://reactjs.org/) - Client Environment

## ✍️ Authors <a name = "authors"></a>

- [@frivolta](https://github.com/frivolta) - Development
