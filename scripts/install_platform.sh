#!/usr/bin/env bash

MSG_PREFIX="[INSTALL_PLATFORM] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"------------------------"
echo $MSG_PREFIX"#   Install Platform   #"
echo $MSG_PREFIX"------------------------"

NVM_VERSION=0.31.0

# Install / Update NVM
echo $MSG_PREFIX"Installing nvm version "$NVM_VERSION
curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash

# TODO: Install nginx also !!!