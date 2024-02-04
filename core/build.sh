#!/bin/bash

# This script is used to build the project using emscripten

if [[ $# -eq 0 ]]; then
    echo "Usage: build.sh [release|debug]"
    exit 0
fi

if [[ $1 == "release" ]]; then
    emcmake cmake . -DCMAKE_BUILD_TYPE=Release
    emmake make
elif [[ $1 == "debug" ]]; then
    emcmake cmake . -DCMAKE_BUILD_TYPE=Debug
    emmake make
else
    echo "Usage: build.sh [release|debug]"
fi