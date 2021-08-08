## What is qik

qik is a simple & modern fast chat app where making a group takes less than a minute - just copy a link and send to your friends to create a group chat!
The chat is currently designed for fast communication, which means it shows only number of messages. Messages that are not shown on the group chat page are deleted.

# How it's made

The app is built with [Next.js](https://nextjs.org) and uses [mongoDB](https://www.mongodb.com/)

# Notes

Currently the app supports only connection, chat, and user/post page for each one of them.
It DOES'NT have a group creating feature with links, but the group that would be created via the link is fully working
If you want to keep working on this, your more than welcome ;)
For questions email me :)

# How to run it

1. [Install node](https://nodejs.org/en/)
2. Set up database and get a [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/)
3. Clone this git repository
```
git clone https://github.com/ya5huk/qik-app.git
cd qik-app
npm install
```
4. Insert into enviorment variable `DB_URI` your connection string:
```
// Example: In file .env.local in root directory
DB_URI = <connection_string> // accessible via process.env.DB_URI
```
5. You are ready to go! Run `npm run dev`
