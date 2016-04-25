#!/usr/bin/env bash

MSG_PREFIX="[SHUTDOWN] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"-----------------------"
echo $MSG_PREFIX"#   Shutdown Server   #"
echo $MSG_PREFIX"-----------------------"

# Change to root dir
. scripts/set_runtime_dir.sh

# Set node runtime
. scripts/set_node_env.sh

# Shutdown nginx if we need to
FRONT_WITH_NGINX=%FRONT_WITH_NGINX%
if [ "$FRONT_WITH_NGINX" = true ]
then
   echo $MSG_PREFIX"Stopping nginx"
   # TODO: Shutdown nginx
fi

# Shutdown the existing web server process
echo $ORIG_MSG_PREFIX"Stopping node app process"
chmod +x $RUNTIME/node_modules/.bin/pm2
$RUNTIME/node_modules/.bin/pm2 stop %APPNAME%_%ENVIRONMENT%
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"-----------------------"