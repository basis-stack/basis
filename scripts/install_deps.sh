#!/usr/bin/env bash

MSG_PREFIX="[INSTALL_DEPS] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"----------------------------"
echo $MSG_PREFIX"#   Install Dependencies   #"
echo $MSG_PREFIX"----------------------------"

# Change to root dir
source scripts/set_runtime_dir.sh

# Install NPM dependencies
echo $ORIG_MSG_PREFIX"Installing npm dependencies..."
npm install
echo $ORIG_MSG_PREFIX"Done."
echo $ORIG_MSG_PREFIX"----------------------------"