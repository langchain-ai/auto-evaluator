from langchain.prompts import PromptTemplate

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either Correct or Incorrect.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: Correct or Incorrect here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. If the student answers that there is no specific information provided in the context, then the answer is Incorrect. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:

Your response should be as follows:

GRADE: (Correct or Incorrect)
(line break)
JUSTIFICATION: (Without mentioning the student/teacher framing of this prompt, explain why the STUDENT ANSWER is Correct or Incorrect. Use one or two sentences maximum. Keep the answer as concise as possible.)
"""

GRADE_ANSWER_PROMPT = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either Correct or Incorrect.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: Correct or Incorrect here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. If the student answers that there is no specific information provided in the context, then the answer is Incorrect. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:"""

GRADE_ANSWER_PROMPT_FAST = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either Correct or Incorrect.
You are also asked to identify potential sources of bias in the question and in the true answer.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: Correct or Incorrect here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. If the student answers that there is no specific information provided in the context, then the answer is Incorrect. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:

Your response should be as follows:

GRADE: (Correct or Incorrect)
(line break)
JUSTIFICATION: (Without mentioning the student/teacher framing of this prompt, explain why the STUDENT ANSWER is Correct or Incorrect, identify potential sources of bias in the QUESTION, and identify potential sources of bias in the TRUE ANSWER. Use one or two sentences maximum. Keep the answer as concise as possible.)
"""

GRADE_ANSWER_PROMPT_BIAS_CHECK = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """You are assessing a submitted student answer to a question relative to the true answer based on the provided criteria: 
    
    ***
    QUESTION: {query}
    ***
    STUDENT ANSWER: {result}
    ***
    TRUE ANSWER: {answer}
    ***
    Criteria: 
      relevance:  Is the submission referring to a real quote from the text?"
      conciseness:  Is the answer concise and to the point?"
      correct: Is the answer correct?"
    ***
    Does the submission meet the criterion? First, write out in a step by step manner your reasoning about the criterion to be sure that your conclusion is correct. Avoid simply stating the correct answers at the outset. Then print "Correct" or "Incorrect" (without quotes or punctuation) on its own line corresponding to the correct answer.
    Reasoning:
"""

GRADE_ANSWER_PROMPT_OPENAI = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """ 
    You are a grader trying to determine if a set of retrieved documents will help a student answer a question. \n

    Here is the question: \n
    {query}

    Here are the documents retrieved to answer question: \n
    {result}
    
    Here is the correct answer to the question: \n 
    {answer}
   
    Criteria: 
      relevance: Do all of the documents contain information that will help the student arrive that the correct answer to the question?"

    Your response should be as follows:

    GRADE: (Correct or Incorrect, depending if all of the documents retrieved meet the criterion)
    (line break)
    JUSTIFICATION: (Write out in a step by step manner your reasoning about the criterion to be sure that your conclusion is correct. Use three sentences maximum. Keep the answer as concise as possible.)
    """

GRADE_DOCS_PROMPT = PromptTemplate(input_variables=['result', 'answer', 'query'], template=template)

template = """You are an AI travel assistant for a company called Osito that answers questions using the provided context. 

Your job is to help the customer decide on which cities might be good for an event they are planning, and then optionally to help them pick a shortlist of hotels within those cities to request proposals from. 

If you need more information at any point, you can ask the customer follow up questions about where their attendees are coming from ("origin cities"), what vibe they are looking for, their budget, what hotel class they want (2-star through 5-star), etc.

Question: 
{question}

Here is some context that might be helpful:
{context}

Answer:"""

QA_CHAIN_PROMPT_TRAVEL = PromptTemplate(input_variables=["context", "question"],template=template,)

template = """You are an assistant providing summary answers about the Lex Fridman podcast. 

If the user asks a question about a specific episode, just answeer using information in the below context. 

Be concise and truthful. Think step by step.

Question: 
{question}

Here is some context that might be helpful:
{context}

Answer:"""

QA_CHAIN_PROMPT_LEX = PromptTemplate(input_variables=["context", "question"],template=template,)