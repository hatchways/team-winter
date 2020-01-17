# MailSender

  

A web application that allows you to automate your sales emails! Upload a list of leads and select a template, and automatically send off emails from a connected account!

  

## Prerequisites

  

-  Python 3
   - The project uses Python 3 as its backend language. Download it  [here](https://www.python.org/downloads/).

-  pip
   -  The project uses pip as its Python package manager. Installation tutorial is [here](https://pip.pypa.io/en/stable/installing/) .

- npm
   - The project uses npm as its JavaScript package manager. Installation tutorial is [here](https://www.npmjs.com/).

- PostgreSQL
	- The project uses PostgreSQL as its database. Download it [here](https://www.postgresql.org/download/) 

## Getting started

  

- Cloning this repo: 
`git clone https://github.com/hatchways/team-winter.git`

- Setting up virtual environment and dependencies in server:
   - Go to server directory and install **pipenv** with: `pip install pipenv`
	- Activate the virtual environment and install dependencies: `pipenv install`

- Installing dependencies in client: 
	- run `npm install` in client directory

  

## Running app locally

Starting the client:
- Go to client directory and run `npm run`

Starting the server:
- Go to server directory and run `flask run`
	- `pipenv run flask run` if the virtual environment isn't already activated
  
## Setting up the database  

Go to config file and set SQLALCHEMY_DATABASE_URI environment variable in the following format:

'postgresql://username:password@localhost/db_name'

Next, create database 'db_name' in your localhost. You can do so in the following commands:
```
$ psql   # or
$ sudo -u postgres psql -p 5432 -h 127.0.0.1
$ postgresql > create database db_name;
```

#### Database migration
Go to server directory
```
$ python manage.py db migrate   # to prepare the migration steps
$ python manage.py db upgrade   # to apply the latest migration to your database
```
## Technologies

  

**Server-side:**

  

-  [Python 3](https://www.python.org/downloads/)

-  [Flask](https://www.palletsprojects.com/p/flask/)

-  [PostgreSQL](https://www.postgresql.org/download/) 

-  [SQLAlchemy](https://www.sqlalchemy.org/)

-  [Redis Queue](https://python-rq.org/)

-  _and other commonly used back-end implementations_

  

**Client-side:**

  

-  [ReactJS](https://reactjs.org/) 

-  [Material-UI](https://material-ui.com/)


-  _and other commonly used front-end implementations_

  

## Authors

  

-  [Yangeng Chen](https://github.com/YangengChen)

-  [Crystal Low](https://github.com/crystallow1168)

-  [Benjamin Jenkins](https://github.com/benjaminjenkins1)

  

## Acknowledgements

  

- App design mock-ups by [Hatchways](https://hatchways.io)' project-based career accelerator program.

- Guidance from [Shums Kassam](https://github.com/skassam21)

  

## License

  

This app is available under [MIT](https://choosealicense.com/licenses/mit/) license.
