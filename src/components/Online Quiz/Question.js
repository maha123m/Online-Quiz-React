import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from './QuizProvider';
import './style.css';

const Question = () => {
    const { questions, currentQuestionIndex, handleAnswerOption, handleNextQuestion, handlePreviousQuestion, selectedAnswers, quizFinished } = useContext(QuizContext);
    const question = questions[currentQuestionIndex];
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerError, setAnswerError] = useState(false);

    useEffect(() => {
        if (question) {
            const shuffledAnswers = [...question.incorrect_answers, question.correct_answer];
            setAnswers(shuffledAnswers);
            if (selectedAnswers[currentQuestionIndex]) {
                setSelectedAnswer(selectedAnswers[currentQuestionIndex].answer);
            } else {
                setSelectedAnswer(null);
            }

            setAnswerError(false); 
        }
    }, [question, currentQuestionIndex, selectedAnswers]);

    const handleNext = () => {
        if (!selectedAnswer) {
            setAnswerError(true); 
            return; 
        }

        handleNextQuestion();
        setAnswerError(false); 
    };

    const handlePrevious = () => {
        handlePreviousQuestion();
        setAnswerError(false); 
    };

    if (!question) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="quiz-container">
            <div className="question-header">
                <h2 className="question">{question.question}</h2>
            </div>
            <div className="options">
                {answers.map((answer, index) => (
                    <label key={index} className="option">
                        <input 
                            type="radio" 
                            name="answer" 
                            value={answer}
                            checked={selectedAnswer === answer} 
                            onChange={() => {
                                setSelectedAnswer(answer); 
                                handleAnswerOption(answer, answer === question.correct_answer);
                            }}
                            className="answer-radio"
                        />
                        {answer}
                    </label>
                ))}
            </div>
            {answerError && <div className="error-message" style={{ color: 'red' }}>Please select an answer before proceeding to the next question.</div>}
            <div className="button-group">
                {currentQuestionIndex > 0 && (
                    <button className="previous-button" onClick={handlePrevious}>Previous</button>
                )}
                {!quizFinished && (
                    <button className="next-button" onClick={handleNext}>Next</button>
                )}
            </div>
        </div>
    );
};

export default Question;
