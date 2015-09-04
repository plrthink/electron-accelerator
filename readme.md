# Electron-accelerator

Get up and running with a customisable electron build process!

This tool will request some configuration for your new electron project and the:

- Unpack https://github.com/ammeep/electron-accelerator-template
- Apply your custom configuration

The end result is a project scaffold that supports building, debugging and releasing for Windows, Linux and Mac platforms.

### Installation

```
npm i electron-accelerator -g
```

### Usage

In your project directory.

```

Usage: electron-accelerator

This will prompt you to input options.
You can also supply these at the command line

Example: electron-accelerator --authorsName=<name>

Required options:

authorsName               any string
applicationName           any string
platform                  all, linux, win32 or darwin
architecture              all, ia32 or x64
applicationDescription    the description of your application
applicationRepository     the url of the repository for your application
setupWindowsReleases      yes, no

Optional arguments:

squirrelS3Bucket          the bucket name where a windows installer can be uploaded
squirrelS3BucketPrefix    the bucket prefix
squirrelWindowsUpdateUrl  the ur that the windows installer will update from

```

This will:

- Unpack https://github.com/ammeep/electron-accelerator-template
- Apply your custom configuration
- Your new project will support
  - ``script/bootstrap`` - quickly and easily set up everything you need to get started with electron development
  - ``script/build`` - create custom builds for your required platforms
  - ``script/server`` - quickly run up your electron build to test
  - ``script/server-debug`` - quickly run up your electron build with node-inspector debugging


### Related projects and reading
