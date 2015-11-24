## That :ship: life

Shipping to windows is easy. Here's the deal:

Application installation, and automatic updates are driven by [Squirrel](https://github.com/Squirrel) and [Squirrel for Windows ](https://github.com/Squirrel/Squirrel.Windows/)

#### Package

To create a [Windows Squirrel installer](https://github.com/Squirrel/Squirrel.Windows/) run:

```
  script\package
```

This command should be run on a Windows machine.

### Release

To release the Squirrel installer:

```
  script\release
```

This uploads an installer to S3.

You can provide access keys by adding a ``s3.key`` file to the root in the following format
```
AWSAccessKeyId=MYACCESSKEY
AWSSecretKey=SECRETKEY
```
``s3.key`` is ignored in the ``.gitignore`` file. Please do not check in sensitive information such as s3 keys.
