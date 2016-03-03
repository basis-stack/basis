#!/usr/bin/env bash

MSG_PREFIX="[SHUTDOWN] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"-----------------------"
echo $MSG_PREFIX"#   Shutdown Server   #"
echo $MSG_PREFIX"-----------------------"

# Change to root dir
. scripts/set_runtime_dir.sh

# Shutdown the existing web server process
echo $ORIG_MSG_PREFIX"Stopping existing process..."
chmod +x $RUNTIME/node_modules/.bin/pm2
$RUNTIME/node_modules/.bin/pm2 stop %APPNAME%_%ENVIRONMENT%
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"-----------------------"