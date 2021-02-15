# codingBlogs (Blogs Management) App Client
codingBlogs is a blogs management system. Users can post their blogs related to programming to share with the community.
# Getting Started
Before setting up, make sure the server is installed along with Node.js and NPM

## Prerequisites
If it is not installed, go in your terminal, and follow the steps:

1. Install the [server](https://github.com/reireynoso/fis-blogs-api) 
2. Install [Node and NPM](https://www.npmjs.com/get-npm)

## Setup

From your terminal,

1. Clone the repo and `cd` into the folder
2. Install dependencies with `npm install`
3. Setup and launch the [server](https://github.com/reireynoso/fis-blogs-api) first with `npm run dev` and run the react application with `npm run start`

# Current Features
- User can add a blog selecting the up to 5 programming tags and the cohort it is assigned to. The blog will have to wait for admin approval before being displayed for the public.
- User can remove the blog if they own it. If a user is an admin, they can remove other user's blog as well as their own.
- User can search and filter through a list of all approved and available blogs.
- An admin user can add a new cohort. 
- An admin cannot delete cohorts but they can edit the name of the cohort. 
- An admin user can grant/remove admin privileges for other users.
- Ad admin user can add/remove admins from a specific cohort.
- An admin user can approve blogs upon review. 
# Built With

* React
* TypeScript
# Tools

* React-Router
* React Context API
* Material UI
* Github OAuth
* Universal Cookie

# Resources
- https://favicon.io/emoji-favicons/notebook
# Authors
Reinald Reynoso
