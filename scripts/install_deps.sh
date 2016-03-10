#!/usr/bin/env bash

MSG_PREFIX="[INSTALL_DEPS] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"----------------------------"
echo $MSG_PREFIX"#   Install Dependencies   #"
echo $MSG_PREFIX"----------------------------"

# Change to root dir
. scripts/set_runtime_dir.sh

# Install specific node runtime version
NODE_VERSION=%NODE_RUNTIME_ENV%
echo $ORIG_MSG_PREFIX"Enabling node version manager"
. ~/.nvm/nvm.sh
echo $ORIG_MSG_PREFIX"Installing node version "$NODE_VERSION
nvm install $NODE_VERSION

## TODO: Need to decide if we invoke nuke_packages here first, in order to ensure a fresh clean install of new packages ???

# Install NPM dependencies
echo $ORIG_MSG_PREFIX"Installing npm dependencies"
npm install
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"----------------------------"