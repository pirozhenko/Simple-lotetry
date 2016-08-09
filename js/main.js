;(function(window, undefined){
var MYAPP = MYAPP || {}

MYAPP.event = {

    addFormListener: function(el, type, fn) {

	    var form    			= document.getElementById('form'),
					email   			= form[2],//поле для вводфа почты
					phone   			= form[3],//поле для ввода телефона
					btn     			= document.getElementById('save'),//кнопка сохранить, ввод данных в таблицу
					newWinner   	= document.getElementById('new'),//кнопка сохранить, ввод данных в таблицу
				  tbody         = document.getElementById('tbody'),
				  text 					= 'This value is requaried!',//текст если поле пустое
				  text2 				= 'Enter valid mail',// текст при проверке почты
				  text3 				= 'Enter valid phone: (063) 555-5555 ',//текст подсказка для вывода номера телефона
				  countStrTable = 1,//для счётчик строк в таблице
					erorMsg 			= document.createElement('small'),//строка для вывода сообщения об ошибки
				  spanRem 		  = document.createElement( 'span' ),
				  arrName       = [],
				  regExForMail  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // определяет регулярное выражение для валидации имени
	  			regExForPhone  =/\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/; // определяет регулярное выражение для валидации телефона

				  var validateEmail = function(el){//валидацияпочты

				    var re = regExForMail;
						  return re.test( el.value );

				  };

				  var validPhone = function(el){//валидация телефона

				    var re = regExForPhone;
							return re.test( el.value );

				  };

				  var checkOk = function ( el ) {// вывод галочки, зелёная рамка
							var check = document.createElement('span');//галочка
							el.style.borderColor = 'green';
							el.parentNode.appendChild( check );
							check.className = 'fa fa-check';
							check.style.color = 'green';
							erorMsg.style.display = "none";

					};

					var checkError = function ( el, text ) {// вывод крассной рамки и сообщения
						el.style.borderColor = 'red';
						el.parentNode.appendChild( erorMsg );
						erorMsg.style.color = 'red';
						erorMsg.style.display = 'block';
						erorMsg.innerHTML = text;
					};

	  			var checkInput = function () {
						  if ( !this.value ) {//если инпут пустой
								checkError( this, text );
								return false;

						  } else if ( email.value ) {// валидация почты
							  	validateEmail( email );

							  	if ( validateEmail( email ) ) {
									    checkOk( this );

									  } else {
									    checkError( this,text2 );

									  }
						  } else if ( phone.value ) {//проверка телефона

									  	validPhone( phone.value );
									  	if ( validPhone( phone.value ) ) {
									  		checkOk( this );

									  	} else {
									  		checkError( this, text3 );
									  	}
						  } else {
						  	checkOk( this );

						  }
					};

	    		var delEror = function () {
						  	if (this.style.borderColor = 'red') { // сбросить состояние "ошибка", если оно есть
						    this.style.borderColor = '#c4c4c4';
						  }
					};

		    	for ( var i = 0; i < form.length-1; i++ ) {

								
								form[i].addEventListener('blur', checkInput, false);
								form[i].addEventListener('focus', delEror, false);


						}

	    		//передача данных в таблицу


	    		var addEl = function ( e ) {//нажатие на кнопку сохранить
						e = e || window.e;
					  if ( e.preventDefault ) { // если метод существует
					    e.preventDefault(); // то вызвать его
					  }

					  var tr = document.createElement( 'tr' ),
					   		th = document.createElement( 'th' );

				    tbody.appendChild( tr );
				    tr.appendChild( th );

						for ( var i = 0; i < form.length-1; i++ ) {//создание стольбцов и вставка их в таблицу с вместимостью инпутов
									if ( !form[i].value ) {
										alert( 'Заполните все поля!' );
										return false;


									}	else if ( form[i].style.borderColor == 'red' ) {
										alert('Заполните всё правельно!');
										return false;

									} else {

								    th.innerHTML = countStrTable;
						   			var td  = document.createElement( 'td' );
								    
										tr.appendChild( td );
										td.innerHTML =  form[i].value;
									}
						 }
						 countStrTable++;//увеличиваем колиичество строк
						 arrName.push( form[0].value );
				  };

	       // создание победителя

		    	var winner = function ( e ) {
				 		e = e || window.e;
					  if ( e.preventDefault ) {
					    e.preventDefault();
					  }
					  var rand 		= Math.floor ( Math.random() * arrName.length ),
					  		boot 		= document.getElementsByClassName( 'bootstrap-tagsinput' )[0],
					  		input 	= boot.getElementsByTagName( 'input' )[0],
					  		span 		= document.createElement( 'span' );

					  input.setAttribute('size', '85%');
					  boot.insertBefore( span, input );
					  span.className = 'tag label label-info';
					  span.innerHTML = arrName[rand];//запись случайного имени в инпут

					  span.appendChild( spanRem );
					  spanRem.dataset.role = 'remove';
					};


					//удаление ел-та в поле победитель

					var removeSpan = function () {//удаление случайного елемента
						this.parentNode.remove( this );
					};


		      btn.addEventListener('click', addEl, false);
		      newWinner.addEventListener('click', winner, false);
		      spanRem.addEventListener('click', removeSpan, false);


    },
}

MYAPP.event.addFormListener(form, "type", onblur);
})(window, undefined);

	// 1.когда заполнил хотя бы одно поле и нажимаешь сохранить, всплывает алерт, но значения в таблицу вводятся
	// + если вводишь неправельные данные то они вводятся
	// 2.подстановка скобочек в телефон
	// 3.и не понятно почему выдаёт ошибку консоль если запущен через index.html(1.не видит datepicker, 2.ошибка с кнопокй New winner)
