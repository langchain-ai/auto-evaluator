import requests
from kor.extraction import create_extraction_chain
from kor.nodes import Object, Text, Number
from langchain.chat_models import ChatOpenAI
from langchain.docstore.document import Document

# Extraction schema - 
schema = Object(
    id = "episode_id",
    description = "An ID for each Lex Fridman podcast episode",
    attributes = [
        Text(
            id="episode_id",
            description="The podcast ID.",
        )
    ],
    examples = [
        ("What does episode 333 say about AI?", [{"episode_id": "0333"}]),
        ("What does episode #231 say about dogs?", [{"episode_id": "0231"}]),
        ("What is the summary of episode 50?",[{"episode_id": "050"}])
    ],
    many = True,
)

# Retriever -
def kor_retriever(p,query):

    # LLM - 
    llm = ChatOpenAI(
        model_name="gpt-3.5-turbo",
        temperature=0,
    )

    # Chain -
    chain = create_extraction_chain(llm, schema)

    # City extraction - 
    results = chain.predict_and_parse(text=(query.strip()))["data"]['episode_id']
    print("RESULTS in KOR")
    print(results)

    # Get results - 
    if results:
        metadata_filter = {'id':results[0]['episode_id']} 
        docs = p.similarity_search(query=query,k=3,filter=metadata_filter)
        print("DOCS in KOR")
        print(docs)
        return docs

    else:
        print("No results Kor retrieval!")
        return None