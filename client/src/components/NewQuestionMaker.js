var questionCounter;

export const setCount = () => {
    questionCounter = 1
}

export const incCount = () => {
    questionCounter++
}

export const getCount = () => {
    return questionCounter
}

//New question template function

export const makeQuestionTemplate = questionNumber => {


    /**** Code for question template begins here.... ****/

    //Question fieldSet
    var myQuestionTemplate = document.createElement('fieldset');
    myQuestionTemplate.id = 'questionTemplate ' + questionNumber;

    //Legend for FieldSet
    var myQuestionLegend = document.createElement('legend')
    myQuestionLegend.innerText = 'Question ' + questionNumber;
    myQuestionTemplate.appendChild(myQuestionLegend)

    //Main question Container
    var myDiv = document.createElement('div')
    myDiv.id = 'paper ' + questionNumber;

    //Logic to create and add new Questions to DOM
    var createQuestion = document.createElement('input')
    createQuestion.type = 'text';
    createQuestion.placeholder = 'question ' + questionNumber + '...';
    createQuestion.id = 'q ' + questionNumber;

    //append new question to myDiv
    myDiv.appendChild(createQuestion)

    //Create three options
    var optionDiv = document.createElement('div')
    optionDiv.id = 'AllOptions ' + questionNumber;
    optionDiv.textContent = 'Options: '

    for (let optCounter = 1; optCounter <= 3; optCounter++) {

        var pOuter = document.createElement('p');
        var option = document.createElement('input')
        var pInner = document.createElement('p');
        var isCorrectLabel = document.createElement('label')
        var span = document.createElement('span')
        var isCorrectRadio = document.createElement('input')

        option.id = questionNumber + ' optionList ' + optCounter //id = questionNum OptionNum
        option.placeholder = 'option ' + optCounter + '...'

        span.innerText = 'Right Option'

        isCorrectRadio.type = 'radio'
        isCorrectRadio.className = 'with-gap'
        isCorrectRadio.name = 'correct ' + questionNumber
        isCorrectRadio.id = questionNumber + ' optionRadio ' + optCounter

        isCorrectLabel.appendChild(isCorrectRadio)
        isCorrectLabel.appendChild(span)
        pInner.appendChild(isCorrectLabel)
        pOuter.appendChild(option)
        pOuter.appendChild(pInner)
        optionDiv.appendChild(pOuter)

    }

    myDiv.appendChild(optionDiv)
    myQuestionTemplate.appendChild(myDiv)

    /**** Code for question template Ends here....  ****/

    return myQuestionTemplate


}