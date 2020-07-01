# DEVTREE
A social media platform for developers by developers
## Getting Started
To get this project working on your system, a couple of things are needed:
* npm install - to get all the dependencies
* get a mongo cluster and put these information in a .env file
```
MONGOURI="your_mongo_uri_link"
JWT_SECRET="a_jwt_secret_code"
GITHUB_TOKEN="a_github_token_for_connecting_to_the_api"
```
* install dependencies
```
npm install
```
* install client folder dependencies
```
cd client
npm install
```
* Run express and react
```
npm run dev
```
* build for production
```
cd client
npm run build
```
* test prod
test build before you deploy
```
NODE_ENV=production node server.js
```

## Deploy with Heroku
if you followed the above instructions of putting your important info in a .env file, then heroku will ommit this file along with your info
but Heroku will need these files for succesful deployment.
I suggest you do:
* create a local branch, ---name prod
```
git checkout b prod
```
* add the .env file
```
git add -f .env/prod.json
```
* *DO NOT PUSH THE PROD BRANCH TO GITHUB*
commit it
```
git commit -m 'ready to deploy'
```
* create your heroku project
```
heroku create
```
* push the branch to heroku *NOT GITHUB*
```
git push heroku prod:master

```

Now heroku has what it needs 

# APP INFO
### Author
Hundeyin Oluwadamilola
### version
version 1.00
### License
This project is licensed under the MIT License
