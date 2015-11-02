# Electron-accelerator

[![npm version](https://badge.fury.io/js/electron-accelerator.svg)](http://badge.fury.io/js/electron-accelerator)

Get up and running with a customisable electron build process!

This tool will request some configuration for your new electron project and then:

- Unpack a template to the current working directory.
- Apply your custom configuration

The end result is a project scaffold that supports building, debugging and releasing for Windows, Linux and Mac platforms.

### Installation

```
npm i electron-accelerator -g
```

### Usage

Electron accelerator has a handful of commands

```
electron-accelerator <command> [options]

Commands:
  init            initalise an electron project in a given directory
  setup-squirrel  setup a project for releases with Squirrel
  version         display the version of electron-accelerator

```

### Initalize an Electron project

To initialise an electron project: use the ``init`` commnand:

```
Usage: electron-accelerator init -d [directory] -p [platform] -a [architecture]

Example: electron-accelerator init -d ./ -p all - a x64

Required arguments:

-d, --directory            execute in directory   
-p, --platform             build for              [choices: "all", "darwin", "win32", "linux"]
-a, --architecture         build as               [choices: "all", "x64", "ia32"]


Optional arguments:

--application-name         the application name         [default: "electron-accelerator"]
--authors-name             application author           [default: "human"]
--application-description  a short description          [default: ""]
--repository-url           a git url                    [default: ""]
--debug                    debug output                 [default: false]

```

This will:


- Unpack a template to the current working directory.
- Apply your custom configuration
- Write a ``readme.md`` to your project. The read me will describe how to build and release your electron app.
- Your new project will support
  - ``script/bootstrap`` - quickly and easily set up everything you need to get started with electron development
  - ``script/build`` - create custom builds for your required platforms
  - ``script/server`` - quickly run up your electron build to test
  - ``script/server-debug`` - quickly run up your electron build with node-inspector debugging

### Configure automatic updates

To configure your pre-initalized electron accelerator project for automatic updates via Squirrel, use the ``setup-squirrel`` command.


*Right now this only supports setting up squirrel releases for windows via s3 (watch this space)*

#### Usage: setup-squirrel windows

```

Usage: electron-accelerator setup-squirrel windows-s3 -d [directory] -b [bucket] -p [prefix] -u [update-url]

Example: electron-accelerator setup-squirrel windows-s3 -d ./ -b windows-updates -p 'electron' -u http://myapp.com/updates

Required arguments:
  -d, --directory      the directory of a pre-initalized electron-accelerator project [default: "."]
  -b, --bucket-name    the s3 bucket that the windows build will be served from
  -p, --bucket-prefix  the s3 bucket prefix that the windows build will be served from                                                                      
  -u, --update-url     the url to update from

```

This will write the following entries to your projects ``config.json``

 - ``s3BucketName`` The top level bucket for which your app updates will be uploaded to
 - ``s3PrefixName`` The prefix where your application will live under the given bucket
 - ``windowsUpdateUrl`` The update Url for your application

 And add the following helper scripts to get you started releasing your application.

 - ``script/release`` - quickly release your electron application to any configured squirrel endpoints.

### Related projects and reading
This project stands on the shoulders of giants. It uses the following packages:

- [electron-packager](https://github.com/maxogden/electron-packager)
- [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)
- [grunt-electron-installer](https://github.com/atom/grunt-electron-installer)
