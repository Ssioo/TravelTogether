#!/bin/bash

# This script is used to build the project using emscripten

if [[ $# -eq 0 ]]; then
    echo "Usage: build.sh [release|debug]"
    exit 0
fi

mkdir -p build

if [[ $1 == "release" ]]; then
    emcmake cmake . -DCMAKE_BUILD_TYPE=Release
    emmake make
    #emcc -O0 -g wasm/TravelTogether.wasm -o build/TravelTogether.js
elif [[ $1 == "debug" ]]; then
    emcmake cmake . -DCMAKE_BUILD_TYPE=Debug
    emmake make
    #emcc -O3 wasm/TravelTogether.wasm -o build/TravelTogether.js
elif [[ $1 == "clean" ]]; then
    rm -rf build CMakeFiles CMakeCache.txt cmake_install.cmake Makefile
else
    echo "Usage: build.sh [release|debug]"
fi