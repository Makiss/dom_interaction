/*
	Создать “Онлайн тест”, 
	который состоит из вопросов с двумя вариантами ответов,
	один из которых верный с счетчиком верных ответов 
	и выводом количества верных ответов в конце теста
*/
(function() {
	'use strict';

	// 1. Создать объект теста списком вопросов и счетчиком ответов
	var quiz = {
		questions: []
	};
	// 2. Создать список вопросов, который состоят из вариантов ответов 
	//  и меткой на правильный вариант ответа.
	var questions = [
		{
			questionText: 'Какое волшебное слово в этикете?',
			questionAnswers: ['Сизам откройся', 'Пожалуйста'],
			rightAnswer: 'Пожалуйста',
			isUserRight: false
		},
		{
			questionText: 'Какой фрукт упал Ньютону на голову?',
			questionAnswers: ['Яблоко', 'Арбуз'],
			rightAnswer: 'Яблоко',
			isUserRight: false
		},
		{
			questionText: 'Какой формы Земля?',
			questionAnswers: ['Шар', 'Пирамида'],
			rightAnswer: 'Шар',
			isUserRight: false
		}
	];

	var userAnswer;
	var questionText;
	var questionItem;
	var rightAnswersCounter;
	var rightAnsweredQuestionsList;
	var wrongAnsweredQuestionsList;
	var quizResultsContainer;
	var questionsCounter;
	var resultFragment;
	var resultParagraph;

	quiz.questions = questions;
	questionsCounter = quiz.questions.length;

	// 3. Запустить тест для пользователя с выводом каждого вопроса 
	//  с вариантами ответов и ввести свой ответ


	// для каждого вопроса в тесте
	for(
		var i = 0; 
		i < questionsCounter;
		i++
	) {
		// сохраняем вопрос
		questionItem = quiz.questions[i];
		// Создаем текст с вопросом
		questionText = 'Вопрос: ' + questionItem.questionText;
	// для каждого ответа в вопросе
		for(
			var j = 0, answersCounter = questionItem.questionAnswers.length;
			j < answersCounter;
			j++
		) {
			// добавляем к тексту с вопросом текст варианта ответа с порядковым номером
			questionText += '\n' + (j + 1) + '. ' + questionItem.questionAnswers[j];
		}

		userAnswer = prompt(questionText);

	// 4. При каждом введенном ответе вести счет правильных ответов.
		questionItem.isUserRight = userAnswer === questionItem.rightAnswer 
		&& true;
	}

	rightAnswersCounter = quiz.questions.reduce(function(sum, question) {
		return question.isUserRight ? sum + 1 : sum;
	}, 0);
	// 5. Вывести информацию о пройденном тесте:
	// alert('У Вас ' + quiz.rightAnswersCounter + ' верных ответов из ' + questionsCounter + ' вопросов.');
	quizResultsContainer = document.querySelector('.content');

		// - создать список для вопросов, на которые пользователь ответил верно, 
		 //  и список вопросов, на которые ответил не верно
	rightAnsweredQuestionsList = document.createElement('ul');
	wrongAnsweredQuestionsList = document.createElement('ul');
	resultParagraph = document.createElement('p');
	resultParagraph.innerText = 'У Вас ' + rightAnswersCounter + ' верных ответов из ' 
		+ questionsCounter + ' вопросов.'
		+ '\nОзнакомьтесь со списками правильно и неправильно отвеченных вопросов.'
		+ 'Правильно отвеченные вопросы выделены зеленым цветом, а не правильные - красным'
		 // - для каждого списка добавить соответствующий класс
	rightAnsweredQuestionsList.className = 'list list--green';
	wrongAnsweredQuestionsList.className = 'list list--red';

		 // - наполнить список вопросами
	quiz.questions.forEach(function(question) {
		var listItem = document.createElement('li');
		listItem.innerText = question.questionText 
			+ ' (Правильный ответ: ' + question.rightAnswer +')';

		question.isUserRight 
			? rightAnsweredQuestionsList.appendChild(listItem)
			: wrongAnsweredQuestionsList.appendChild(listItem);
	});
		 // - вставить списки в разметку
	resultFragment = document.createDocumentFragment();
	resultFragment.appendChild(resultParagraph);
	resultFragment.appendChild(rightAnsweredQuestionsList);
	resultFragment.appendChild(wrongAnsweredQuestionsList);

	quizResultsContainer.appendChild(resultFragment);
})();
