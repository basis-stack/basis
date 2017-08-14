#!/usr/bin/env bash

MSG_PREFIX="[SHUTDOWN] "

echo $MSG_PREFIX"-----------------------"
echo $MSG_PREFIX"#   Shutdown Server   #"
echo $MSG_PREFIX"-----------------------"

# Shutdown nginx if we need to
# TODO: Do we even need to do this if is just reverse proxy ? Probably not.
FRONT_WITH_NGINX=%FRONT_WITH_NGINX%
if [ "$FRONT_WITH_NGINX" = true ]
then
   echo $MSG_PREFIX"Stopping nginx"
   # TODO: Shutdown nginx
fi

# Shutdown the existing web server process
NODE_ENV=${1:-"development"}
echo $MSG_PREFIX"Stopping node app process"

# TODO: Need to check it is actually running 1st, before we blindly just shut it down

node node_modules/pm2/bin/pm2 stop %APPNAME%_$NODE_ENV
echo $MSG_PREFIX"Done."
echo $MSG_PREFIX"-----------------------"