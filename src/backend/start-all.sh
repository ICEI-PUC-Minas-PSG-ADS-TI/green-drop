#!/usr/bin/env bash

(
  cd discovery-server
  ./mvnw spring-boot:run
) &

sleep 10

(
  cd api-gateway
  ./mvnw spring-boot:run
) &

sleep 5

(
  cd user-service
  ./mvnw spring-boot:run
) &
(
  cd auth-service
  ./mvnw spring-boot:run
) &
(
  cd image-service
  ./mvnw spring-boot:run
) &

wait
