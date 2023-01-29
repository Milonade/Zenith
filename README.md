# Zenith

## About
As part of the DevMobil course of the 3rd year of media engineering, we developed an application using Ionic6, Angular and TypeScript.

The goal of this project was to build the front-end of our application following the first part of the course, where we had developed the back-end (API).

Our application uses three API, one for the [images](https://qimg.onrender.com/doc/), one for [geocoding](https://www.mapbox.com/geocoding) and the [one we developed](https://github.com/Meryl-D/zenith-api)

Zenith is an app that lets you journal your travels and share them with other users.
* You can post places that you visited, with a picture, a description and a location.
* Other users can comment your posts, if you decided to let them see the post (public ≠ private post).
* You have two views, the main one is a map and the other one is a basic feed like Instagram.

## Install and run the Zenith-App

1. Simply fork or download this project

2. Move to the project file with `cd ./pathToProject`

3. Then you can install dependancies 
```bash
  npm install
```

4. Now you can run the app locally

```bash
  ionic serve
```
For the app to work, you need to get 2 api tokens. One for [mapBox](https://www.mapbox.com/) and one for [Qimg](https://qimg.onrender.com/doc/). You can simply copy the sample environment file and add your own tokens there.

## How does the app work ?
1. First, an authentication is required. You are invited to create an account.

2. To use the app at its best, you must **allow your browser to use your geolocation**. 
   
   From this, you will see the map zoom into the zone where you are at the moment. You may find a post from another friendly user nearby. :-)

3. You can **create a post**, by taking a picture or choosing one of from your gallery. You can also choose if you want to share it with your friends (public post must be ticked) or leave it on your personal travel's journal (untick public post). 

   NB: As we could have taken the photo on a trip to London last week, we left the choice to be able to publish a photo at an earlier date, as well as to choose a different location than the current one.

4. It is possible to **switch views**. There is the main view, with the map, and a modal view below, which shows the posts in chronological order (feed). 
   
   In addition, if you only want to see your trips, you can check the box in the "feed" modal.

## Little hacks in case the app crashes...

- Try to reload the page, and make sure your `ionic serve` command is still active on your terminal.

- Make sure your own envrionment file contains the api tokens needed by the app.

## Useful links
[DevMobil Course](https://mediacomem.github.io/comem-devmobil/latest/)

[Zenith Repos](https://github.com/JasmineMolanoco/Zenith)

![Zenith Logo](src/assets/LOGO-ZENITH.png)

### Authors:
[Meryl Dubois](https://github.com/Meryl-D/)

[Clarisse Gagnebin](https://github.com/clagnar/)

[Jasmine Molano](https://github.com/JasmineMolanoco/)
