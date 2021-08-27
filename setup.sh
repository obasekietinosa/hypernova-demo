#!/bin/bash

install_deps() {
    (cd product-list && yarn)
    (cd cart && yarn)
    (cd aggregator && yarn)
}

install_deps