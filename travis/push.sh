#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update README.md\n"

  #copy data we're interested in to other place
  cp -R coverage $HOME/coverage

  #go to home and setup git
  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  #using token clone master branch
  git clone --quiet --branch=master https://${GH_TOKEN}@github.com/JSystemsTech/backbone-collection-predefined-filters.git  master > /dev/null

  #go into diractory and copy data we're interested in to that directory
  
  git add -f . README.md
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md update to master"
  git push -fqu origin master > /dev/null

  echo -e "Pushed README.md update\n"
fi