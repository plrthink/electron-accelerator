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

To initialise an electron project:

```

Usage: electron-accelerator init -d [directory] -p [platform] -a [architecture]

Example: electron-accelerator init --authors-name=Amy --application-name=Foo --p=all --a=x64

Required arguments:

-d, --directory            execute in directory   
-p, --platform             build for              [choices: "all", "darwin", "win32", "linux"]
-a, --architecture         build as               [choices: "all", "x64", "ia32"]


Optional arguments:

--application-name         the application name         [default: "electron-accelerator"]
--authors-name             application author           [default: "human"]
--application-description  a short description          [default: ""]
--repository-url           a git url                    [default: ""]
--setup-windows-releases   set up windows releases now  [default: false]
--debug                    debug output                 [default: false]

squirrel-s3-bucket           the bucket name where a windows installer can be uploaded
squirrel-s3-bucket-prefix    the bucket prefix
squirrel-windows-update-url  the url that the windows installer will update from

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


### Related projects and reading
This project stands on the shoulders of giants. It uses the following packages:

- [electron-packager](https://github.com/maxogden/electron-packager)
- [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)
- [grunt-electron-installer](https://github.com/atom/grunt-electron-installer)
