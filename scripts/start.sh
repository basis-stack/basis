#!/usr/bin/env bash

MSG_PREFIX="[STARTUP] "

echo $MSG_PREFIX"--------------------"
echo $MSG_PREFIX"#   Start Server   #"
echo $MSG_PREFIX"--------------------"

# Set web server as background process
echo $MSG_PREFIX"Starting node app as background process"
export NODE_ENV=${1:-"development"}
# TODO: Need to update pm2 in memory if is present
node node_modules/pm2/bin/pm2 start bin/start-%APPNAME% --name="%APPNAME%-$NODE_ENV"

# Start nginx if we need to
FRONT_WITH_NGINX=%FRONT_WITH_NGINX%
if [ "$FRONT_WITH_NGINX" = true ]
then
   echo $MSG_PREFIX"Starting nginx as reverse proxy"
   # TODO: Start nginx
fi

echo $MSG_PREFIX"Done."
echo $MSG_PREFIX"--------------------"