#!/usr/bin/env bash

## Uninstall all existing node packages
npm uninstall `ls -1 node_modules | tr '/\n' ' '`

## Update all packages to the latest stable version
npm install npm-check-updates
node_modules/.bin/ncu --upgradeAll

## Install fresh packages
npm install