# auth

Database-backed web application with user registration, authentication, and authorization.

## Project Members

[Eugene Baah](https://github.com/eobaah)

[Jonathan Pool](https://github.com/jrpool)

## Base repository

[contacts-snapshot-starter](https://github.com/GuildCrafts/contacts-snapshot-starter)

## Discussion

### General

This application demonstrates the use of the fundamental web languages, HTML, CSS, and JavaScript, and the `bcrypt`, `body-parser`, `dotenv`, `ejs`, `express`, `express-session`, `pg-promise`, and `session-file-store` libraries to create a web server managing user authentication, user authorization, and the creation, retrieval, and deletion of records in a database.

The demonstration takes the form of a server that manages a list of the first and last names of contacts.

The application fulfills the requirements of the “Auth Snapshot Simple module (Module 444) in Phase 3 of the [Learners Guild][lg] curriculum.

The software in this application includes, and extends, software in the base repository.

### Implementation notes

The project members ended their work on this project without addressing numerous design, functionality, performance, and maintainability issues inherent in it. Therefore, it exhibits a mixture of qualities.

## Installation and Configuration

0. These instructions presuppose that (1) [npm][npm] and [PostgreSQL][pg] are installed, (2) there is a PostgreSQL database cluster, (3) PostgreSQL is running, and (4) when you connect to the cluster you are a PostgreSQL superuser.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `auth`, by executing:

    `git clone git@github.com:jrpool/auth.git auth`

3. Make the project directory your working directory by executing:

    `cd auth`

4. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

5. To create the database, execute `npm run db_reset`.

6. If you wish to define a custom encryption key for the session IDs that the application stores in client cookies, execute `echo SECRET=customkey > .env`, where you replace `customkey` with the string of your choice.

7. If you wish to put some sample data into the database, execute `npm run load_contacts`.

8. To start the application, execute `npm start`.

9. To access the application while it is running, use a web browser to request this URL:

`http://localhost:3000/`

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
[pg]: https://www.postgresql.org/
