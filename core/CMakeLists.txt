# Minimum required CMake version
cmake_minimum_required(VERSION 3.15)

# Project name
project(MyWasmProject)

# Set the output directory for the WASM file
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/wasm)
# set teh output directory for the library
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/wasm)

# Build variant Debug Cflags
set(CMAKE_CXX_FLAGS_DEBUG "-g -O0")
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG")

# Set the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Find the Emscripten toolchain
set(CMAKE_TOOLCHAIN_FILE ${EMSDK}/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake)

# Add your source files here
add_executable(TravelTogether
    src/main.cpp
)

# Set the target properties for the WASM build
# set_target_properties(TravelTogether PROPERTIES
#     SUFFIX ".wasm"
#     LINK_FLAGS "--no-entry --export-all"
# )
