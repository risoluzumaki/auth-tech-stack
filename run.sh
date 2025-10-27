#!/bin/bash

declare -A clients=( ["1"]="react")
declare -A servers=( ["1"]="express" ["2"]="gofiber")

echo "Choice Client:"
echo "1) React"
read client_choice
client=${clients[$client_choice]}

if [ -z "$client" ]; then
  echo "Invalid client choice!"
  exit 1
fi

echo "Choice Server:"
echo "1) Express"
echo "2) GoFiber"
read server_choice
server=${servers[$server_choice]}

if [ -z "$server" ]; then
  echo "Invalid server choice!"
  exit 1
fi

docker_client_file="docker/base/docker-compose.${client}.yml"
docker_server_file="docker/base/docker-compose.${server}.yml"

docker-compose -f $docker_client_file -f $docker_server_file up

echo "running $client and $server containers"