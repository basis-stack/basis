#!/usr/bin/env bash

. scripts/nuke_packages.sh

## Update all packages to the latest stable version
npm install npm-check-updates
node_modules/.bin/ncu --upgradeAll

## Install fresh packages
npm install