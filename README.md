# chefly

A app using [Express 4](http://expressjs.com/).


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git pull
$ npm install
$ heroku local

```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ git add .

$ git commit -m "what did you change"

$ git push

Merging your local branch with <dev|prod> will automatically rebuild and relaunch the server. 

Merging the dev branch to prod will rebuild the production server and should only be done after code reviews.
```

## Documentation
```
Steps to launch the mongoDB web interface
$ heroku login
<login>
<pasword>

$ heroku addons:open mongolab --app chefly-prod

```
