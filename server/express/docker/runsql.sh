CONTAINER_NAME=docker-db-1

DB_NAME=pgdb
DB_USER=pgdb

for f in ./migration/*.sql
do
  echo "Running $f ..."
  docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME < $f
done