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
echo $ORIG_MSG_PREFIX"Starting server..."
chmod +x $RUNTIME/node_modules/.bin/pm2
$RUNTIME/node_modules/.bin/pm2 start app/bin/%APPNAME%_%ENVIRONMENT% --env %ENVIRONMENT%
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"--------------------"