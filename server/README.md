# How to set up PostgreSQL to run with our app:
```
Go to .env file and edit DATABASE_URL variable in the following format:
'postgresql://username:pw@localhost/db_name'
where username will be postgres, and pw will be your password to your localhost
and db_name is the name of your database.

# For sensitivity reasons, our password is blurred out
In our case: 'postgresql://postgres:xxxx@localhost/team-winter'

Next, create database 'team-winter' in your localhost 
You can do so in the following commands:

$ psql
# or  
$ sudo -u postgres psql -p 5432 -h 127.0.0.1
$ postgresql > create database team-winter;

# Verify that team-winter is listed
$ postgresql > \l
                           List of databases
     Name      | Owner | Encoding | Collate | Ctype | Access privileges
---------------+-------+----------+---------+-------+-------------------
 postgres      | rs    | UTF8     | C       | C     |
..
 team-winter   | rs    | UTF8     | C       | C     |
..
```

# How to run the server:

- Change directory to the /server directory
- **pipenv install**: to install the dependencies
- **pipenv shell**: to load .env environment variables and virtual environment 
- **python manage.py db init**: to set up migration folder *Only if you don't have migration folder* 
- **python manage.py db migrate**: to prepare the migration steps
- **python manage.py db upgrade**: to apply the latest migration to your database
- **flask run**: to run the server