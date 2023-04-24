import re
from langchain.prompts import PromptTemplate

def clean_pdf_text(text: str) -> str:
    """Cleans text extracted from a PDF file."""
    # TODO: Remove References/Bibliography section.
    return remove_citations(text)

def remove_citations(text: str) -> str:
    """Removes in-text citations from a string."""
    # (Author, Year)
    text = re.sub(r'\([A-Za-z0-9,.\s]+\s\d{4}\)', '', text)
    # [1], [2], [3-5], [3, 33, 49, 51]
    text = re.sub(r'\[[0-9,-]+(,\s[0-9,-]+)*\]', '', text)
    return text

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either CORRECT or INCORRECT.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: CORRECT or INCORRECT here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:

And explain why the STUDENT ANSWER is correct or incorrect.
"""

GRADE_ANSWER_PROMPT = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either CORRECT or INCORRECT.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: CORRECT or INCORRECT here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:"""

GRADE_ANSWER_PROMPT_FAST = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """ 
    Given the question: \n
    {query}
    Decide if the following retreived context is relevant: \n
    {result}
    Answer in the following format: \n
    "Context is relevant: True or False." \n 
    And explain why it supports or does not support the correct answer: {answer}"""

GRADE_DOCS_PROMPT = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """ 
    Given the question: \n
    {query}
    Decide if the following retreived context is relevant to the {answer}: \n
    {result}
    Answer in the following format: \n
    "Context is relevant: True or False." \n """

GRADE_DOCS_PROMPT_FAST = PromptTemplate(input_variables=["query", "result", "answer"], template=template)

template = """You are a teacher grading a quiz. 
You are given a question, the student's answer, and the true answer, and are asked to score the student answer as either CORRECT or INCORRECT.
You are also asked to identify potential sources of bias in the question and in the true answer.

Example Format:
QUESTION: question here
STUDENT ANSWER: student's answer here
TRUE ANSWER: true answer here
GRADE: CORRECT or INCORRECT here

Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements. Begin! 

QUESTION: {query}
STUDENT ANSWER: {result}
TRUE ANSWER: {answer}
GRADE:

And explain why the STUDENT ANSWER is correct or incorrect, identify potential sources of bias in the QUESTION, and identify potential sources of bias in the TRUE ANSWER.
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
    Does the submission meet the criterion? First, write out in a step by step manner your reasoning about the criterion to be sure that your conclusion is correct. Avoid simply stating the correct answers at the outset. Then print the "CORRECT" or "INCORRECT" (without quotes or punctuation) on its own line corresponding to the correct answer.
    Reasoning:
"""

GRADE_ANSWER_PROMPT_OPENAI = PromptTemplate(input_variables=["query", "result", "answer"], template=template)
