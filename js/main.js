;(function (){
		var form    			= document.getElementById('form'),
				email   			= form[2],//поле для вводфа почты
				phone   			= form[3],//поле для ввода телефона
				check 				= document.createElement('span'),//галочка
				btn     			= document.getElementById('save'),//кнопка сохранить, ввод данных в таблицу
				newWinner   	= document.getElementById('new'),//кнопка сохранить, ввод данных в таблицу
			  text 					= 'This value is requaried!',//текст если поле пустое
			  text2 				= 'Enter valid mail',// текст при проверке почты
			  text3 				= 'Enter valid phone: (063) 555-5555 ',//текст подсказка для вывода номера телефона
			  countStrTable = 1,//для счётчик строк в таблице
				erorMsg 			= document.createElement('small'),//строка для вывода сообщения об ошибки
			  tbody         = document.getElementById('tbody'),
			  arrName       = [],
			  spanRem       = document.createElement('span');//удаляет случайный, вставленный елемент



		function validateEmail ( email ) {//валидация почты
		  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  return re.test( email.value );
		}

		function validPhone ( phone ) {//валидация телефона
			var re = /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/;
			return re.test( phone.value );
		}

		function ok ( el ) {// вывод галочки, зелёная рамка
			el.style.borderColor = 'green';
			el.parentNode.appendChild( check );
			check.className = 'fa fa-check';
			check.style.color = 'green';
			erorMsg.style.display = "none";

		}

		function eror ( el, text ) {// вывод крассной рамки и сообщения
			el.style.borderColor = 'red';
			el.parentNode.appendChild( erorMsg );
			erorMsg.style.color = 'red';
			erorMsg.style.display = 'block';
			erorMsg.innerHTML = text;
		}


			for ( var i = 0; i < form.length-1; i++ ) {

						form[i].onblur = function () {
							  if ( !this.value ) {//если инпут пустой
									return eror( this, text );

							  } else if ( email.value ) {// валидация почты
								  	validateEmail( email );

								  	if ( validateEmail( email ) ) {
										    return ok( this );

										  } else {
										    return eror( this,text2 );

										  }
							  } else if ( phone.value ) {//проверка телефона

										  	validPhone( phone.value );
										  	if ( validPhone( phone.value ) ) {
										  		return ok( this );

										  	} else {
										  		return eror( this, text3 );
										  	}
							  }else {
							  	return ok( this );

							  }
						};

						form[i].onfocus = function () {
						  	if (this.style.borderColor = 'red') { // сбросить состояние "ошибка", если оно есть
						    this.style.borderColor = '#c4c4c4';
						  }
						};

				}

		btn.onclick = function ( e ) {//нажатие на кнопку сохранить
				e = e || window.e;
			  if ( e.preventDefault ) { // если метод существует
			    e.preventDefault(); // то вызвать его
			  } else { // иначе вариант IE8-:
			    e.returnValue = false;
			  }
			  var tr = document.createElement( 'tr' ),
			   		th = document.createElement( 'th' );

			   tbody.appendChild( tr );
			   tr.appendChild( th );
			   th.innerHTML = countStrTable;

				for ( var i = 0; i < form.length-1; i++ ) {//создание стольбцов и вставка их в таблицу с вместимостью инпутов
							if( form[i].value ) {
				   			var td  = document.createElement( 'td' );
								tr.appendChild( td );
								td.innerHTML =  form[i].value;


							}	else {

								alert( 'Заполните все поля!' );
								return false;
							}
				 }
				 countStrTable++;//увеличиваем колиичество строк
				 arrName.push( form[0].value );
		 }

		 newWinner.onclick = function ( e ) {
		 		e = e || window.e;
			  if ( e.preventDefault ) {
			    e.preventDefault();
			  } else {
			    e.returnValue = false;
			  }

			  var rand = Math.floor ( Math.random() * arrName.length );
			  var boot = document.getElementsByClassName( 'bootstrap-tagsinput' )[0];
			  var input = boot.getElementsByTagName( 'input' )[0];
			  var span = document.createElement( 'span' );

			  boot.insertBefore( span, input );
			  span.className = 'tag label label-info';
			  span.innerHTML = arrName[rand];//запись случайного имени в инпут

			  span.appendChild( spanRem );
			  spanRem.dataset.role = 'remove';

			  console.log( arrName[rand] );
			}

			spanRem.onclick = function () {//удаление случайного елемента
				this.parentNode.remove( this );
	}
})();

	// 1.при правильном заполнении формы галочка ставиться, но потом исчезаети появляется на другом ел-те
	// 2.когда заполнил хотя бы одно поле и нажимаешь сохранить, всплывает алерт, но значения в таблицу вводятся
	// 3.подстановка галочек в телефон
	// 4.может что то упростить
	// 5.поле для сгенерированного случайного ел-та не на полную ширину
