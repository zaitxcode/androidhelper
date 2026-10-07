cmake_minimum_required(VERSION 3.22.1)

project("androidhelper")

add_library(
    androidhelper
    SHARED
    androidhelper.cpp
)

find_library(
    log-lib
    log
)

target_link_libraries(
    androidhelper
    ${log-lib}
)
