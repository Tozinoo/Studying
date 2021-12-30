#!/bin/bash

if [ $1 == "m" ] 
then
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock1"]}' http://localhost:3001/mineBlock
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock2"]}' http://localhost:3001/mineBlock
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock3"]}' http://localhost:3001/mineBlock
  
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock4"]}' http://localhost:3002/mineBlock
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock5"]}' http://localhost:3002/mineBlock
  curl -H "Content-type:application/json" --data '{"data" : ["testBlock6"]}' http://localhost:3002/mineBlock
elif [ $1 == "b" ]
then
  curl -X GET http://localhost:3001/blocks | python3 -m json.tool
  echo "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
  curl -X GET http://localhost:3002/blocks | python3 -m json.tool
fi