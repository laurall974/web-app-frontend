Hi Roch ! 

Congrats for being here.

## Backend

I use the backend you provided but I had a few lines to allow CORS and fetch data from the end `.sort({_id:-1})`. 
So you can use : https://github.com/laurall974/secure-web-dev-backend

You need to fork this repository then clone it on your computer.

Create an .env file containing :
```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/paris-films?retryWrites=true&w=majority
JWT_SECRET=super-secret-password
```

Install NodeJS and install dependencies : `npm install` (you need to `cd *directory of the back*` before)

To start you need to run the back : `npm start`

## Front-end
Run first : `npm install`

Then do : `npm run dev` 

All the user story map are achieved : 
- US1: As a random visitor, I want to be able to register an account or log-in, so I can
access all features
- US2: As a random visitor, I want to be redirected to the login/register page when I click on “location" tab, so that I know I must log-in to see its content
- US3: As a logged-in user, I want to see locations and be able to click on one location to open a modal containing details, so that the website is useful
- US4: As an “admin" user, I want to see a “Add Location” button in the location page, so that I can create a new location
- US5: As an “admin" user, I want to see a button to edit locations in the array of locations, so that I can edit existing locations
- US6: As an “admin" user, I want to see a button to delete locations in the array of locations so that I can delete existing locations


## Features 

If you are not logged : page like addlocation updatelocation or locations list are hide. You can not access by the URL.

You can always return to the precedent page. 

If you are not the admin user some button are hide.

Error when login are handle.