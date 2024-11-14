#!/bin/env bash

BASE_PATH="$(pwd)/src/content/blog/*"

for item in $BASE_PATH; do
  if [[ -d $item ]]; then
    echo "found dir in: $item"
    echo "running npm run upload:images"
    npm run upload:images
    echo "running git add -A"
    git add -A
  fi
done
