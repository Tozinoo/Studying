#!/bin/bash

kill -9 `ps -ef | grep httpServer.js | grep node | awk '{print $2}'`
kill -9 `ps -ef | grep httpServer.js | grep node | awk '{print $2}'`
node /home/rootdir/Studying/linux/sample/blockChain/httpServer.js &
node /home/rootdir/Studying/linux/sample/blockChain2/httpServer.js &

curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock1\"]}" http://localhost:3001/mineBlock
curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock2\"]}" http://localhost:3001/mineBlock
curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock3\"]}" http://localhost:3001/mineBlock

curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock4\"]}" http://localhost:3002/mineBlock
curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock5\"]}" http://localhost:3002/mineBlock
curl -H "Content-type: application/json" --data "{\"data\":[\"testBlock6\"]}" http://localhost:3002/mineBlock

