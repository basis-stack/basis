#!/usr/bin/env bash

MSG_PREFIX="[SET_NODE_ENV] "

# Set the runtime to a specific node version
NODE_VERSION=%NODE_RUNTIME_ENV%
echo $MSG_PREFIX"Setting node env to "$NODE_VERSION

# TODO: Is this (running profile) the most efficient / best way to do this ?? Need to think this through
. ~/.profile
nvm use $NODE_VERSION