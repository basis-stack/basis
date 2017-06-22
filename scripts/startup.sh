#!/usr/bin/env bash

MSG_PREFIX="[STARTUP] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"--------------------"
echo $MSG_PREFIX"#   Start Server   #"
echo $MSG_PREFIX"--------------------"

# Change to root dir
. scripts/set_runtime_dir.sh

# Set node runtime
. scripts/set_node_env.sh

# Set web server as background process
echo $ORIG_MSG_PREFIX"Starting node app as background process"
export NODE_ENV=%ENVIRONMENT%
chmod +x $RUNTIME/node_modules/.bin/pm2
# TODO: Need to update pm2 in memory if is present
$RUNTIME/node_modules/.bin/pm2 start app/bin/%APPNAME%_%ENVIRONMENT% --env %ENVIRONMENT%

# Start nginx if we need to
FRONT_WITH_NGINX=%FRONT_WITH_NGINX%
if [ "$FRONT_WITH_NGINX" = true ]
then
   echo $ORIG_MSG_PREFIX"Starting nginx as reverse proxy"
   # TODO: Start nginx
fi

echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"--------------------"