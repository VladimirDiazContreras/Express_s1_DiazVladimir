## Documentacion 

http://localhost:3000/api-docs

# documentacion con curl

## Coordinador

### Ver todos los trainers

curl -X GET http://localhost:3000/coordinador/trainers


### Ver todos los campers

curl -X GET http://localhost:3000/coordinador/campers


## trainers
### Ver un trainer por ID

curl -X GET http://localhost:3000/trainers/1


### Actualizar nombre de un trainer

curl -X PUT http://localhost:3000/trainers/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "NuevoNombre"}'


### Eliminar un trainer

curl -X DELETE http://localhost:3000/trainers/1

## Camper

### Ver un camper por ID

curl -X GET http://localhost:3000/campers/1


### Actualizar riesgo de un camper

curl -X PUT http://localhost:3000/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"riesgo": "Alto"}'


### Eliminar un camper

curl -X DELETE http://localhost:3000/campers/1

