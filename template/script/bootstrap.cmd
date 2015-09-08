@echo off
echo ---------------------------------------------------------------
echo.
echo Hello Human
echo Let's get your electron app dependencies ready to go
echo.
echo ---------------------------------------------------------------
echo.
echo Installing app dependencies...
echo.

npm install

echo Installing dev tooling dependencies...
echo.

npm install -g node-inspector
npm install -g grunt-cli

echo.
echo ---------------------------------------------------------------
echo.
echo Done!
