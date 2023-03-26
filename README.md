# ExpensesHandler
Work assignment

first npm install to install all dependencies

START

without nodemon
npm run start

with nodemon
npm run dev

all configuaration happens through .env file

PGUSER='pg username'
PGHOST='host I used localhost'
PGPASSWORD='pg password'
PGDATABASE='real database'
PGTESTDATABASE='test database'
PGPORT='pg port 5432 normaly'
PORT='port you want to use'

TEST

testing happens with Jest and supertest

remember to check which database you use from config file

const database =  test process.env.PGTESTDATABASE real process.env.PGDATABASE

npm run test
