cmd_1
    - docker-compose up -d

cmd_2
    - docker exec -it JobSeacrh_mongo_primary bash
    - mongosh
    - var config = {"_id": "rs0","version": 1,"members": [{"_id": 1, "host": "JobSeacrh_mongo_primary:27017", "priority": 3},{"_id": 2, "host": "JobSeacrh_mongo_secondary-1:27017", "priority": 2},{"_id": 3, "host": "JobSeacrh_mongo_secondary-2:27017", "priority": 1}]};
    - rs.initiate(config, { force: true});

cmd_3
    - docker network create elastic
    - docker pull docker.elastic.co/elasticsearch/elasticsearch:8.15.0
    - docker run --name JobSearch_Elasticsearch --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.15.0
        - note: copy thông tin password, token 
        
 Elasticsearch security features have been automatically configured!
✅ Authentication is enabled and cluster connections are encrypted.

ℹ️  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  Elyh5fI7P0Vt+EF50oVY

ℹ️  HTTP CA certificate SHA-256 fingerprint:
  d15f8d1416a229629497aba79cfd6655560072479ccf33df84e83ec1ca2095d0

ℹ️  Configure Kibana to use this cluster:
• Run Kibana and click the configuration link in the terminal when Kibana starts.
• Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjIwLjAuMjo5MjAwIl0sImZnciI6ImQxNWY4ZDE0MTZhMjI5NjI5NDk3YWJhNzljZmQ2NjU1NTYwMDcyNDc5Y2NmMzNkZjg0ZTgzZWMxY2EyMDk1ZDAiLCJrZXkiOiJocFF2akpFQm9aRGNnNTBOTUxXcDpHZ25KQkFVLVNDNmJuRl9vVXJ2M2FnIn0=

ℹ️ Configure other nodes to join this cluster:
• Copy the following enrollment token and start new Elasticsearch nodes with `bin/elasticsearch --enrollment-token <token>` (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjIwLjAuMjo5MjAwIl0sImZnciI6ImQxNWY4ZDE0MTZhMjI5NjI5NDk3YWJhNzljZmQ2NjU1NTYwMDcyNDc5Y2NmMzNkZjg0ZTgzZWMxY2EyMDk1ZDAiLCJrZXkiOiJoWlF2akpFQm9aRGNnNTBOTUxXcDpVTEhFdkVrT1J3eUgzUlMtcG12TFB3In0=

  If you're running in Docker, copy the enrollment token and run:
  `docker run -e "ENROLLMENT_TOKEN=<token>" docker.elastic.co/elasticsearch/elasticsearch:8.15.0`


    - docker pull docker.elastic.co/kibana/kibana:8.15.0
    - docker run --name JobSearch_Kibana --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.15.0
        - note: verify code




