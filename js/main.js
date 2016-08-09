var app = {

		settings: {
			regExForMail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // определяет регулярное выражение для валидации имени
		  regExForPhone: /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/, // определяет регулярное выражение для валидации телефона
		  invalidClass: 'invalid',
		  invalidClassMsg: 'invalid-msg',
		  validClass: 'valid',
		  textForNullInput: 'This value is requaried!',
		  textForEmail: 'Enter valid mail',
		  textFotPhone: 'Enter valid phone: (063) 555-5555',
		  countStringTable: 1,
		  arrName: [],

		},

		 validationEmail: function() {
       var elem = document.getElementById('email'),
           mail = elem.value,
           regexp = this.settings.regExForMail,
           invalidClass = this.settings.invalidClass;

       if (mail.length !== 0 && mail.match(regexp).length === mail.length) {
           elem.removeClass(invalidClass);
           return mail;
       } else {
           elem.addClass(invalidClass);
       }
   	},

   	validationPhone: function() {
       var elem = document.getElementById('phone'),
           phone = elem.value,
           regexp = this.settings.regExForPhone,
           invalidClass = this.settings.invalidClass;

       if (phone.length !== 0 && phone.match(regexp).length === phone.length) {
           elem.removeClass(invalidClass);
           return phone;
       } else {
           elem.addClass(invalidClass);
       }
   	},

   	checkingEmptyString: function() {
   		var form = document.getElementById('form');
   	},


  	validationField: function() {
       var email = this.validationEmail(),
           phone = this.validationPhone();

       if (email && phone) {
           window.localStorage.name = name;
           //reload page after success validation form
           //window.location.reload(); 
       }
   	},

		checkOk: function ( el ) {// вывод галочки, зелёная рамка
			var check = document.createElement('span');//галочка
			el.style.borderColor = 'green';
			el.parentNode.appendChild( check );
			check.className = 'fa fa-check';
			check.style.color = 'green';
			errorMsg.style.display = "none";
		},

		checkError: function ( el, text ) {// вывод крассной рамки и сообщения
			var invalidClass = this.settings.invalidClass,
					invalidClassMsg = this.settings.invalidClassMsg;

			el.addClass(invalidClass);
			el.parentNode.appendChild( erorMsg );
			errorMsg.addClass(invalidClassMsg);
		},

   	checkInput: function (el) {

   		var text = this.settings.textForNullInput;

		  if ( !this.value ) {//если инпут пустой
				this.checkError( el, text );
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
		},




		deleteEror: function () {

			  	if (this.className == this.settings.invalidClass ) { // сбросить состояние "ошибка", если оно есть
			    this.className = this.settings.validClass;
			  }
		},




		addEl: function ( e ) {//нажатие на кнопку сохранить

		  var countStrTable = this.settings.countStrTable,
		  		tr = document.createElement( 'tr' ),
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
	  },



	  winner: function ( e ) {
		  var arrName = this.settings.arrName;
		  		rand 		= Math.floor ( Math.random() * arrName.length ),
		  		boot 		= document.getElementsByClassName( 'bootstrap-tagsinput' )[0],
		  		input 	= boot.getElementsByTagName( 'input' )[0],
		  		span 		= document.createElement( 'span' );

		  input.setAttribute('size', '85%');
		  boot.insertBefore( span, input );
		  span.className = 'tag label label-info';
		  span.innerHTML = arrName[rand];//запись случайного имени в инпут

		  span.appendChild( spanRem );
		  spanRem.dataset.role = 'remove';
		},


		removeSpan: function () {//удаление случайного елемента
			this.parentNode.remove( this );
		},




		init: function() {
			var form     = document.getElementById('form'),
					spanRem  = document.createElement( 'span' ),
					errorMsg = document.createElement('small'),//строка для вывода сообщения об ошибки
					tbody    = document.getElementById('tbody');

					for ( var i = 0; i < form.length-1; i++ ) {

								form[i].addEventListener('blur', function() {
									app.checkInput(this);
								});


								form[i].addEventListener('focus', function() {
									app.deleteEror(this);
								});

					}



			 document.getElementById('save').addEventListener('click', function(e) {
           e.preventDefault();
           app.addEl(e);
       });

       document.getElementById('new').addEventListener("click", function(e) {
           e.preventDefault();
           app.winner(e);
       });

       spanRem.addEventListener("click", function(e) {
           e.preventDefault();
           app.removeSpan(e);
       });
		}

}

app.init();