#!/usr/bin/env bash

MSG_PREFIX="[SET_RUNTIME_DIR] "

# Get script location and change directory to runtime root
BASE=$(cd $(dirname $0); pwd -P)
echo $MSG_PREFIX"Executing in "$BASE
RUNTIME=$BASE/../
echo $MSG_PREFIX"Changing directory to "$RUNTIME
cd $RUNTIME