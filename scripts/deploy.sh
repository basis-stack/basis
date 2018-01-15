#!/usr/bin/env bash

MSG_PREFIX="[DEPLOY] "

echo $MSG_PREFIX"------------------------"
echo $MSG_PREFIX"#   Deploy Artifacts   #"
echo $MSG_PREFIX"------------------------"

# Set target env
TARGET_ENV=${1:-"development"}
echo $MSG_PREFIX"Using deploy settings for env: $TARGET_ENV"

# Determine deploy settings for target (input) env
case "$TARGET_ENV" in
%DEPLOY_VARIABLES%
*)
  DEPLOY_USER="UNKNOWN"
  DEPLOY_HOST="UNKNOWN"
  DEPLOY_LOCATION="UNKNOWN"
  ;;

esac

# Copy app package to deploy host
DEST="$DEPLOY_USER@$DEPLOY_HOST:/tmp"
PACKAGE_NAME=%APPNAME%.package.tar.gz
echo $MSG_PREFIX"Deploying package ($PACKAGE_NAME) to "$DEST
scp publish/$PACKAGE_NAME $DEST

# TODO: Shutdown existing service (via stop $TARGET_ENV)

# Unzip to deploy location and adjust permissions
echo $MSG_PREFIX"Unzipping package to $DEPLOY_LOCATION and setting permissions"
ssh $DEPLOY_USER@$DEPLOY_HOST "tar -xvzf /tmp/$PACKAGE_NAME -C $DEPLOY_LOCATION && chmod -R a+x $DEPLOY_LOCATION/."

# TODO: Start the app (via start $TARGET_ENV)

# End
echo $MSG_PREFIX"Done."
echo $MSG_PREFIX"------------------------"