import React, { useState } from 'react';
import $ from 'jquery'

export const updateQuestions = (updatedQuestions, Deadline, title) => {

    var currentTime = new Date((Date.now()))
    var timeDifference = new Date(Deadline) - currentTime;
  
    sessionStorage.setItem('quizQuestions', JSON.stringify({title ,questions: updatedQuestions} ))
    var users = JSON.parse(localStorage.getItem('user'))
    sessionStorage.setItem('userCreatedTest', users.name)

    var testInterval = setInterval(() => {
        timeDifference-=1
   
        sessionStorage.setItem('deadline', timeDifference)
        if (timeDifference <= 0) {
            alert('Test over')
            sessionStorage.removeItem('quizQuestions')
            sessionStorage.removeItem('deadline')
        
            clearInterval(testInterval)
        }
    }, 1);
}



function Quiz() {
    
    var user = JSON.parse(localStorage.getItem('user'))
    var username = sessionStorage.getItem('userCreatedTest')
    var questionTag = JSON.parse(sessionStorage.getItem('quizQuestions'))
    var newquestions = null
    var testTitle = "Simple Test"
    if(questionTag){
        newquestions = questionTag.questions
        testTitle = questionTag.title
    
    }
        //default test questions
    var questions = [{
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
    ];

    var oldquestions = questions


    var deadLine = localStorage.getItem('deadline')
    if (deadLine === 0) {
        deadLine = "Test timeout..."
    }
    if (newquestions) //if new questions are created else default test questions...
        questions = newquestions

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return ( 
        <div className = 'QuizBody' >
            <div className = 'app'> 
                {
                    showScore ? ( 
                            <div className = 'score-section'>
                                You scored { score } out of { (questions.length)? questions.length : 1 } 
                            </div>
                                ) : ( 
                                    <div>
                                        <div className = 'question-section' >
                                            <div className = 'question-count' >
                                                <span > Question { currentQuestion + 1 } </span>/ { (questions.length)? questions.length : 1 } 
                                            </div> 
                                            <div className = 'question-text' > {(questions[currentQuestion]) ? questions[currentQuestion].questionText : oldquestions[0].questionText } </div> 
                                        </div > 
                                        <div className = 'answer-section' > 
                                            {
                                                (questions[currentQuestion]) ? 
                                                    questions[currentQuestion].answerOptions.map((answerOption) => (
                                                        <button className = "q-button" onClick = {() => handleAnswerOptionClick(answerOption.isCorrect)} > { answerOption.answerText } </button>
                                                    ))
                                                :
                                                    oldquestions[currentQuestion].answerOptions.map((answerOption) => (
                                                        <button className = "q-button" onClick = {() => handleAnswerOptionClick(answerOption.isCorrect)} > { answerOption.answerText } </button>
                                                    ))
                                            } 
                                        </div>
                                    </div>
                                    )
                } 
            </div> 
            <div id = 'TestList' >
                <p>Test posted by: <span>{(username)? username : 'Computer'}</span></p>
                <h4>{testTitle}</h4>
                <button id = 'TakeTest' onClick = {() => { $('.app').toggle() }} > Take Test </button>  
            </div> 
        </div> 
    );
}
export default Quiz