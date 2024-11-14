import React, { createContext, useState, useEffect } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                const formattedQuestions = data.results.map(question => {
                    const shuffledAnswers = [...question.incorrect_answers, question.correct_answer];
                    return { ...question, answers: shuffledAnswers };
                });
    
                setQuestions(formattedQuestions); 
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError("Failed to fetch questions. Please try again later.");
            } finally {
                setIsLoading(false); 
            }
        };
    
        fetchQuestions();
    }, []);

    const handleAnswerOption = (answer, isCorrect) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestionIndex]: { answer, isCorrect }
        }));
    
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }
    };
    
    const handleNextQuestion = () => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setQuizFinished(true);
        }
    };
    
    const handlePreviousQuestion = () => {
        const prevQuestion = currentQuestionIndex - 1;
        if (prevQuestion >= 0) { 
            setCurrentQuestionIndex(prevQuestion);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswers({});
        setQuizFinished(false);
    };
    

    return (
        <QuizContext.Provider
            value={{
                questions,
                currentQuestionIndex,
                score,
                selectedAnswers,
                quizFinished,
                handleAnswerOption,
                handleNextQuestion,
                handlePreviousQuestion,
                resetQuiz,
                isLoading,
                error, 
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
