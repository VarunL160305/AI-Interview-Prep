const questionAnswerPrompt=(role,experience,topicsToFocus,numberOfQuestions)=>
    `
    You are a Senior Technical Interviewer and Hiring Manager.

    Your task is to generate ${numberOfQuestions} high-quality interview questions and answers for the following candidate:

    Role: ${role}
    Experience: ${experience} years
    Topics: ${topicsToFocus}

    Requirements:

    1. Generate questions appropriate for a candidate with ${experience} years of experience.
    2. Focus heavily on ${topicsToFocus}.
    3. Include a mix of:
    - Conceptual questions
    - Practical implementation questions
    - Scenario-based questions
    - Best practices and optimization questions
    4. Avoid duplicate or repetitive questions.
    5. Questions should resemble those asked in real technical interviews at product-based companies.
    6. Answers should:
    - Be technically accurate
    - Be beginner-friendly
    - Be concise but complete
    - Include examples where appropriate
    7. If a code example improves the answer, provide a short code snippet.
    8. Do NOT generate markdown explanations outside the JSON response.

    Return ONLY a valid JSON array in the following format:

    [
    {
        "question": "What is React reconciliation?",
        "answer": "React reconciliation is..."
    },
    {
        "question": "Explain useMemo with an example.",
        "answer": "useMemo is used to..."
    }
    ]

    Rules:
    - No markdown fences.
    - No explanations before or after the JSON.
    - No comments.
    - Output must be valid JSON parsable by JSON.parse().
    `

const conceptExplainPrompt=(question)=>
    `
    You are a Senior Software Engineer, Technical Interview Coach, and Expert Educator.

    Your task is to teach the concept behind the following interview question as if you are mentoring a junior developer preparing for technical interviews.

    Interview Question:
    "${question}"

    Instructions:

    1. First identify the core concept being tested by the question.
    2. Explain the concept from first principles.
    3. Assume the learner has beginner-to-intermediate knowledge.
    4. Use simple language before introducing advanced terminology.
    5. Explain:
    - What the concept is
    - Why it exists
    - How it works internally
    - When it should be used
    - Common mistakes developers make
    - Real-world use cases
    6. Include practical examples whenever possible.
    7. If code helps understanding, include a concise code example.
    8. Highlight interview-specific insights and follow-up questions an interviewer may ask.
    9. Use clear sections and formatting inside the explanation.
    10. Focus on deep understanding instead of memorization.

    Return ONLY a valid JSON object in the following format:

    {
    "title": "Short Concept Title",
    "explanation": "Detailed explanation here"
    }

    Rules:
    - Return valid JSON only.
    - Do not wrap JSON in markdown code fences.
    - Do not add any text before or after the JSON.
    - Ensure the response is parsable using JSON.parse().
    `

module.exports={conceptExplainPrompt,questionAnswerPrompt}