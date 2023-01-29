# Zenith

## About
As part of the DevMobil course of the 3rd year of media engineering, we realized an application mainly with Ionic6, Angular and TypeScript.

The objective here was to build the front-end of our application following the first part of the course, where we had developed the back-end (API).

Our application uses two API, one for the [images](https://qimg.onrender.com/doc/) and the [one we developed](https://github.com/Meryl-D/zenith-api)

Zenith is an app that lets you journal your travels and share them with other users.
* You can post places that you visited, with a picture, a description and a location.
* Other users can comment your posts, if you decided to let them see the post (public ≠ private post).
* You have two views, the main one is a map and the other one is a basic feed like Instagram.

## Installation and run the Zenith-App

1. Simply fork or download [the project here](https://github.com/JasmineMolanoco/Zenith)

2. Then you can install dependancies 
```bash
  npm install
```

3. Now you can run the app (local)

```bash
  ionic serve
```
It will open a localhost page on your favorite browser.

## How does the app work ?
1. First, an authentication will be required. 
You are invited to create an account.

2. To use the app at his best, you must allow your browser to use your geolocation. From this, you will see the map zoom in the zone where you are at the moment. You may find a post from one friend nearby. :-)

3. You can create a post, by taking a picture or choosing one of your library. You can also choose if you want to share it with your friends (public post must be ticked) or leave it on your personal travel's journal (untick public post). 

⋅⋅⋅As we could have taken the photo on a trip to London last week, we left the choice to be able to publish a photo at an earlier date, as well as to choose a different location than the current one.⋅⋅

4. Il est possible d’interchanger de vue. Il existe la vue principale, avec la map, et celle de la modale au-dessous, qui propose les publications dans un ordre chronologique (feed). De plus, si vous souhaitez voir uniquement vos voyages, vous pouvez cocher la case dans la modale de « feed ».

## Little hacks in case the app crashes...

- Try to reload the page, and make sure your `ionic serve` command is still active on your terminal.

- Make sure your `environments.ts`file is not empty. It should have this: 

````
export const environment = {
  production: false,
  apiUrl: "https://zenith.onrender.com",
  qimgUrl: "https://qimg.onrender.com/api/images/",
  qimgToken: "V0FlUgFH1ot/vhb3BlyWETy2QfOgV0BKMKrj8hIVXHMSugjvgcsFaSDTUgsCtOc89pQh02uqlNsTYIk3W2weGwCEgjJL+UtHVIKv5MjZFwOXzTkPiiLOpbVyBcxJHwEc0zol2HCaGE85UVjq2LdMlHgDASm6261hlw12iZkz84I=",
  mapBox: {
    accessToken: "pk.eyJ1IjoibWVyeWwtZCIsImEiOiJjbGRmdHJxZmcwYzhrM3BuMGs2dnlrZ2d6In0.pcQE-nixyFImZpwcZZjuQA",
    geocodeUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  }
};
````


## Useful links
[DevMobil Course](https://mediacomem.github.io/comem-devmobil/latest/)

[Zenith Repos](https://github.com/JasmineMolanoco/Zenith)

![Zenith Logo](src/assets/LOGO-ZENITH.png)
