from neo4j import GraphDatabase

class GraphDBConnector:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))
    
    def close(self):
        self.driver.close()

    def save_document(self, doc_id: str, content: str):
        with self.driver.session() as session:
            session.run(
                "CREATE (d:Document {id: $id, content: $content})",
                id=doc_id,
                content=content
            )
    
    def search_document(self, query: str):
        with self.driver.session() as session:
            result = session.run(
                "MATCH (d:Document) WHERE d.content CONTAINS $query RETURN d.content LIMIT 3",
                query=query
            )
            return [record["d.content"] for record in result]
