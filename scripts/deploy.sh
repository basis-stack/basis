#!/usr/bin/env bash

MSG_PREFIX="[DEPLOY] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"------------------------"
echo $MSG_PREFIX"#   Deploy Artifacts   #"
echo $MSG_PREFIX"------------------------"

# Change to root dir
source scripts/set_runtime_dir.sh

# Deploy app package to %DEPLOY_HOST%
DEST="%DEPLOY_USER%@%DEPLOY_HOST%:/tmp"
echo $ORIG_MSG_PREFIX"Deploying to "$DEST
#scp -c blowfish $RUNTIME/package/package.%ENVIRONMENT%.zip $DEST
echo $ORIG_MSG_PREFIX"Unzipping package"
#ssh %DEPLOY_USER%@%DEPLOY_HOST% "unzip -a /tmp/package.%ENVIRONMENT%.zip -d %DEPLOY_LOCATION%"
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"------------------------"