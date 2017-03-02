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

$ git push origin <branch>

Once you have pushed your changes to a branch you can submit a merge&pull request.  

Createing a new pull request for the master branch will automatically create a heroku app named 'chefly-dev-pr-#' where # is the pull request number.  This will show up in the merge request on the git hub merge page.

Before completing the merge request on github the newly created app is connected to the dev DB and can be used for any testing.  Once the merge is completed the new app is destroyed and 'chefly-dev' will be rebuilt with the merged code.

Commiting changes to the github 'master' branch will only rebuild 'chefly-dev'.  To push changes to 'chefly-prod', once dev finishes building log into heroku and promote dev to prod in the 'chefly-pipeline'.

or

heroku pipelines:promote -r stagining 

```

## Documentation
```
Steps to launch the mongoDB web interface
$ heroku login
<login>
<pasword>

$ heroku addons:open mongolab --app chefly-<dev|prod>

Steps to launch log server PaperTrail:
$ heroku addons:open papertrail --app chefly-<dev|prod>

```
