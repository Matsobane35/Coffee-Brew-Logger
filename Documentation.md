# **Roastery Brew-Logging Application**

# **Introduction**

This project features a brew-logging application for a roastery, with a responsive UI that lets the user create, display, edit and delete brews. Records are saved to and retrieved from a local database via the back-end server, which exposes CRUD endpoints to the front-end via a JSON API. The overarching priority of this application is maximum user experience, which is proven by the choice of tools and frameworks used, both on the client side and server side.

### Front-end
* This part of the application uses the React library, instantiated with Vite, with TypeScript as the programming language and Tailwind CSS as the styling framework.
* TypeScript was chosen for its type-strictness in order to avoid unnecessary compile-time and run-time bugs
* SWC is the compiler chosen for converting TypeScript to JavaScript because of its high performance nature
* The opening screen features a position-fixed header with a filtering dropdown menu and a list view for displaying data items. A position-fixed dynamic footer for displaying page numbers is scheduled to appear when the data size exceeds a particular page limit.
* A pop-up-style form is used for editing, deleting and creating new brews

### Back-end
* The highly modular Fastify Node.js framework was chosen to handle HTTP request routing due to its high performance nature compared to its counterparts
* The Drizzle ORM was chosen to handle database operations due to its zero-hydration querying efficiency

# **Setup**

* Check out the README.md file in the backend folder for instructions on how to create your database schema
* A .env.example file is included to help you set up the connection between the back-end server and your database (MUST READ)
* If you are using a different database than postgresql:
    * Adjust the Drizzle import statement in database.js to fit your database type
    * If necessary, adjust the Drizzle dialect used in main.js to fit your database type
    * Modify parts of the .env.example file, such as host, port and username, to fit your database
* In addition, ensure that Node.js (and an NPM package manager) are installed on your machine

# **Online Version**
* You can also interact with the online version of this application [here](https://spiffy-melomakarona-64664e.netlify.app/). This version uses the browser's localstorage to carry out CRUD operations, making sure that the records still exist every time you refresh the website.

