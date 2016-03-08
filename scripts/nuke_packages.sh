#!/usr/bin/env bash

MSG_PREFIX="[NUKE_PACKAGES] "

## Uninstall all existing node packages
echo $MSG_PREFIX"Uninstalling existing npm packages"
npm uninstall `ls -1 node_modules | tr '/\n' ' '`
echo $MSG_PREFIX"Nuking node_modules directory...just to be sure"
rm -rf node_modules