# Notes App Backend

Backend of the notes application, uses Node with Typescript, Graphql with Apollo server and Prisma as ORM.

## Installation

create an .env with the database data and the jsonwebtoken secret:
```
DATABASE_URL="mongodb+srv:/<user>:<password>@<cluster>.mongodb.net/<database>"
```
```
SECRET="<YOUR SECRET KEY>"
```
then install the dependencies
```bash
npm install
```

## Usage

```bash
npm run generate
```
generates prisma client models

```bash
npm run dev
```
run the project in development mode

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/ManuelMaciel/notes-app-backend/blob/master/LICENCE)
