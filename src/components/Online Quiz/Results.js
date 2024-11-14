import React, { useContext, useState } from 'react'; 
import { QuizContext } from './QuizProvider'; 
import './style.css'; 


const Result = () => {
    const { score, selectedAnswers, questions, resetQuiz } = useContext(QuizContext); 
    const [showReview, setShowReview] = useState(false);

    const handleReviewAnswers = () => {
        setShowReview(true);
    };

    return (
        <div>
            <h2>Your Score: {score}/{questions.length}</h2>
            <div className="button-container">
                <button className="restart-button" onClick={resetQuiz}>Restart Quiz</button>
                <button className="review-button" onClick={handleReviewAnswers}>Review Answers</button>
            </div>
            {showReview && (
                <div>
                    <h3>Review Your Answers:</h3>
                    {questions.map((question, index) => (
                        <div key={index} className="answer-review">
                            <p><strong>Question:</strong> {question.question}</p>
                            <p>
                                <strong>Your Answer:</strong> 
                                <span className={
                                    selectedAnswers[index]?.isCorrect ? "correct-answer" : "wrong-answer"
                                }>
                                    {selectedAnswers[index]?.answer || "No answer"}
                                </span>
                            </p>
                            <p>
                                <strong>Correct Answer:</strong> <span className="correct-answer">{question.correct_answer}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Result;
