## Documentacion 

http://localhost:3000/api-docs

# documentacion con curl

## Coordinador

### Ver todos los trainers

curl -X GET "localhost:3000/coordinador/trainers"


### Ver todos los campers

curl -X GET "localhost:3000/coordinador/campers"


## trainers
### Ver un trainer por ID

curl -X 'GET' \
  'localhost:3000/trainers/456' \
  -H 'accept: */*'

### Eliminar un trainer

curl -X DELETE "localhost:3000/trainers/id"


### Actualizar nombre de un trainer

falta

## Camper

### Ver un camper por ID

curl -X GET http://localhost:3000/campers/id


### Eliminar un camper

curl -X DELETE http://localhost:3000/campers/id

### Actualizar riesgo de un camper

falta


