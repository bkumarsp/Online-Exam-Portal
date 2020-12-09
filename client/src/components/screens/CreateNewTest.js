import React from 'react'
import $ from 'jquery'

import { updateQuestions } from './Quiz'
import {setCount, incCount, getCount, makeQuestionTemplate} from '../NewQuestionMaker'


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {QUESTION_PAPER: {}}
    }

    componentDidMount() {
        setCount() //set initial question counter to 1
        var max_questions = 50;
        var question_wrapper = $('#questionWrapper');
        var create_new_question = $("#CreateNewQuestion");
        var questionCount = 1;
 
        //create new question dynamically.
        $(create_new_question).click(function(e) { //on add input button click
            e.preventDefault();
            
            let questionNumber = getCount() //get updated question count

            if (questionCount < max_questions) { //max input box allowed
                questionCount++; //question text box increment

                var myQuestionTemplate = makeQuestionTemplate(questionNumber)
                $(question_wrapper).append(myQuestionTemplate);
            }

            incCount() //increment question number count

        }); //end of create_new_question : click function


        document.getElementById('createNewTest').addEventListener('click', function(e){
            e.preventDefault();
            window.location.reload(false)
        })
        
        const printQP = blueprint => {
            $("#forms").toggle()
            $("#review").toggle()
            $("#newtest").toggle()
            Object.keys(blueprint).forEach((question, index) => {
                
                var classname = 'question ' + index;
                var options = blueprint[question].newOptions;
                var q = `<div class=${classname}> 
                                <h5>${index + 1}. ${question}</h5>
                                <p>
                                    <label>
                                        <input class="with-gap" name="Option" type="radio" value=${options[0]} />
                                        <span>${options[0]}</span>
                                    </label>
                                </p>
                                <p>
                                <label>
                                    <input class="with-gap" name="Option" type="radio" value="${options[1]}" />
                                    <span>${options[1]}</span>
                                </label>
                                </p>
                                <p>
                                <label>
                                    <input class="with-gap" name="Option" type="radio" value="${options[2]}" />
                                    <span>${options[2]}</span>
                                </label>
                                </p>
                            </div>`
                $('#Container').append(q)
               
            });

        }

        //create new tests
        document.getElementById('createTest').addEventListener('click', (e) => {
            e.preventDefault();
            var testTitle = $('#testTitle').val()

            var questions = []
            var qp = document.getElementById('questionWrapper');

            var getTestTime = document.getElementById('Timing').value

            if (qp.childElementCount === 0) 
                return alert('No Questions Found, Test Not Created..!')
            if(!getTestTime)
                return alert('Enter the test date and time...')

            var questionOptionSet = {}; //Question Option Set
            var qCounter = qp.childElementCount
            var iterator = 1;
            
            while (iterator <= qCounter) { //iterate over each questions
                var ques = document.getElementById('q ' + iterator)
                //check for element
                if (!ques) {
                    var qt = document.getElementById('questionTemplate ' + iterator)
                    if(qt)
                        qt.remove(); //if question field is empty, just ignore the question field
                    iterator++
                    continue;
                }

                ques = ques.value
                //check for element value
                if(!ques){
                    var qts = document.getElementById('questionTemplate ' + iterator)
                    if(!qts)
                        qts.remove(); //if question field is empty, just ignore the question field
                    iterator++
                    continue;
                }


                var newOptionsIsCorrect = {
                    newOptions: [],
                    isCorrect: []
                }

                //for loop to collect all options in particular order relative to questions
                // eslint-disable-next-line no-loop-func
                for(let index=1; index<=3; index++){
                    var optionElement = document.getElementById(iterator + ' optionList ' + index)
                    var optionValue = optionElement.value;

                    if (optionValue){
                        newOptionsIsCorrect.newOptions[index-1] = optionValue;
                    }
                    else{
                        newOptionsIsCorrect.newOptions[index-1] = 'None' //Default option
                    }
                    newOptionsIsCorrect.isCorrect[index-1] = document.getElementById(iterator + ' optionRadio ' + index).checked;

                    optionElement.remove()
                }

                questionOptionSet[ques] = newOptionsIsCorrect;
                
                //For quiz questions
                questions.push({
                        questionText: ques,
                        answerOptions:  // eslint-disable-next-line no-loop-func
                                        newOptionsIsCorrect.newOptions.map((eachOptions, index) => {
                                            if(eachOptions)
                                                return {
                                                        answerText: newOptionsIsCorrect.newOptions[index],
                                                        isCorrect: newOptionsIsCorrect.isCorrect[index] 
                                                    }
                                            return {
                                                answerText: 'None of these',
                                                isCorrect: newOptionsIsCorrect.isCorrect[index]
                                            }
                                        }),
                                
                        
                    
                });
                document.getElementById('questionTemplate ' + iterator).remove() //remove question template after reading the contents
                
                iterator++
            } //end of while

            //Update the question in Quiz app
            updateQuestions(questions, getTestTime, testTitle)

            // eslint-disable-next-line no-restricted-globals
            if (confirm("Create new test? Previously created test might be lost...")) {
                this.setState({ QUESTION_PAPER: questionOptionSet })
                
                printQP(this.state.QUESTION_PAPER);
                alert('Test Created...');
            } else
                alert('Test Cancelled...');
        }) //end of create test button
    
    }//end of componentDidMount()

    render() {
        return ( 
            <div id='PaperSection'>
                <form id="forms"> 
                    <h3>Test Title: </h3>
                    <input type="text" id="testTitle" placeholder="Subject name, what this test based on,..." required />
                    <button id = "CreateNewQuestion" > Add Question + </button>
                    <div id = "questionWrapper" > </div> 
                    <strong>Set test Timings: </strong>
                    <input type="datetime-local" name="testTiming" id="Timing"/>
                    <button id = "createTest" > Create Test </button> 
                </form > 
                <form id = 'finalQP'>
                    <div id='review' style={{display: "none"} }><p>Paper Review</p></div>
                    <div id = "Container" ></div> 
                    <div id='newtest' style={{display: "none"} }><button id='createNewTest'>Create new test</button></div>
                </form >
            </div>
        )
    } //end of render()
}//end of class


export default Test