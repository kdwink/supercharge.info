# About

Source code for the web portion of [supercharge.info](https://supercharge.info).

## Environment Setup

* nodejs
* npm


## Running Locally

npm install

npm start

https://localhost:9090/

## Building images from source

On Mac OS, you can `brew install livrsvg` to make use of commands similar to the following from the `image_sources` folder:

```
rsvg-convert -w 16 -h 16 red_dot_standard_64.svg > ../src/main/primary_entry/images/dots/red_dot_standard_16.png
```

## Forum

https://forum.supercharge.info/c/code