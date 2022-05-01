#!/bin/bash

npm start &
sleep 7
sensible-browser http://localhost:3000
wait
