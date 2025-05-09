from pydantic import BaseModel

class Metrics(BaseModel):
    retrieval_similarity: float
    qa_similarity: float
    faithfulness_similarity: float

class Question(BaseModel):
    question: str

class Answer(BaseModel):
    answer: str
    metrics: Metrics