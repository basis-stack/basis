#!/usr/bin/env bash

MSG_PREFIX="[INSTALL_PLATFORM] "
ORIG_MSG_PREFIX=$MSG_PREFIX

echo $MSG_PREFIX"------------------------"
echo $MSG_PREFIX"#   Install Platform   #"
echo $MSG_PREFIX"------------------------"

NVM_VERSION=0.33.8

# Install / Update node version manager
echo $MSG_PREFIX"Installing nvm version "$NVM_VERSION
curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash

# Install nginx if required
FRONT_WITH_NGINX=%FRONT_WITH_NGINX%
if [ "$FRONT_WITH_NGINX" = true ]
then
   echo $MSG_PREFIX"Installing nginx "
   # TODO: Install Nginx here and shut it down
fi

# Install the target node runtime
NODE_VERSION=%NODE_RUNTIME_ENV%
echo $MSG_PREFIX"Enabling node version manager"
. ~/.nvm/nvm.sh
echo $MSG_PREFIX"Installing node "$NODE_VERSION
nvm install $NODE_VERSION