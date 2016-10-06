var app = {

        settings: {
            regExForMail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // определяет регулярное выражение для валидации имени
            regExForPhone: /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/, // определяет регулярное выражение для валидации телефона
            invalidClass: 'invalid',
            validClass: 'valid',
            textForEmail: 'Enter valid mail',
            textForPhone: 'Enter valid phone: (063) 555-5555',
            countStrTable: 1,
            arrName: []

        },

        validationEmail: function( elem ) {//Валидация поля для почты
           value = elem.value;
           regexp = this.settings.regExForMail;

           return regexp.test( value );
        },

        validationPhone: function( elem ) {//Валидация для телефона
            value = elem.value;
            regexp = this.settings.regExForPhone;

           return regexp.test( value );
        },

        success: function(parent, input, check) {//Добавление зелёной рамки и галочки
            var invalidClass    = this.settings.invalidClass,
                validClass      = this.settings.validClass;

            parent.removeClass(invalidClass);
            input.addClass(validClass);
            parent.appendChild(check);
            check.addClass('fa fa-check');
        },

        fail: function( parent ) {//Добавление текста ошибки
            var invalidClass    = this.settings.invalidClass,
                validClass      = this.settings.validClass;

            parent.addClass(invalidClass);
            parent.removeClass(validClass);
        },

        validationInput: function( el ) {
            var email  = document.getElementById('email'),
                phone  = document.getElementById('phone'),
                valid  = true,
                text2  = this.settings.textForEmail,
                text3  = this.settings.textForPhone,
                check  = document.createElement('span'),//галочка
                parent = el.target.parentNode,
                input  = el.target;

           if ( input.value == '' ) {
                this.fail(parent);

                valid = false;

           } else if ( email.value ) {
                this.validationEmail( email );

                if ( this.validationEmail(email) ) {

                    this.success(parent, input, check);

                    valid = true;

                } else {
                    this.fail(parent);
                    parent.getElementsByClassName('error-message')[0].innerHTML = text2;
                    console.log('invalid');

                    valid = false;
                }

           } else if ( phone.value ) {
                this.validationPhone( phone );

                if ( this.validationPhone( phone ) ) {

                    this.success(parent, input, check);
                    console.log('valid phone number');
                    valid = true;
                } else {
                    this.fail(parent);
                    parent.getElementsByClassName('error-message')[0].innerHTML = text3;
                    console.log('invalid phone number');

                    valid = false;
                }

           } else {

                this.success(parent, input, check);

                valid = true;
           }

           return valid;
        },

        addEl: function ( e ) {//нажатие на кнопку сохранить

            var countStrTable = this.settings.countStrTable,
                email  = document.getElementById('email'),
                phone  = document.getElementById('phone'),
                arrName       = this.settings.arrName,
                tr            = document.createElement( 'tr' ),
                th            = document.createElement( 'th' ),
                invalidFields = 0,
                form          = document.getElementById('form'),
                tbody         = document.getElementById('tbody');



            for ( var i = 0; i < form.length-1; i++ ) {//создание стольбцов и вставка их в таблицу с вместимостью инпутов
                if ( form[i].value == '' ) {

                    form[i].parentNode.addClass(this.settings.invalidClass);
                    invalidFields += 1;

                }
            }
                console.log(arrName);

            if ( (invalidFields == 0) && ( this.validationEmail(email) ) && ( this.validationPhone(phone) ) )  {
                tbody.appendChild( tr );
                tr.appendChild( th );
                th.innerHTML = this.settings.countStrTable;

                for ( var i = 0; i < form.length-1; i++ ) {//создание стольбцов и вставка их в таблицу с вместимостью инпутов

                    var td  = document.createElement( 'td' );
                    tr.appendChild( td );
                    td.innerHTML =  form[i].value;
                    arrName.push( form[0].value );
                }
                this.settings.countStrTable++;
            }
        },

        winner: function ( e ) {
            var arrName  = this.settings.arrName;
                rand     = Math.floor ( Math.random() * arrName.length ),
                boot     = document.getElementsByClassName( 'bootstrap-tagsinput' )[0],
                input    = boot.getElementsByTagName( 'input' )[0],
                spanRem  = document.createElement( 'span' ),
                span     = document.createElement( 'span' );

            input.setAttribute('size', '50%');
            boot.insertBefore( span, input );
            span.className = 'tag label label-info';
            span.innerHTML = arrName[rand];//запись случайного имени в инпут

            span.appendChild( spanRem );
            spanRem.dataset.role = 'remove';

            spanRem.addEventListener("click", function(e) {
               e.preventDefault();
               app.removeSpan(e);
           });
        },

        removeSpan: function ( e ) {//удаление случайного елемента
           var elem = e.target.parentNode;
           elem.remove();
        },

        init: function() {
            var form     = document.getElementById('form'),
                spanRem  = document.createElement( 'span' ),
                span     = document.createElement( 'span' ),
                tbody    = document.getElementById('tbody');

                for ( var i = 0; i < form.length-1; i++ ) {

                    form[i].addEventListener('blur', function(evt) {
                        app.validationInput(evt);
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

            Element.prototype.hasClass = function (className) {
                return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
            };

            Element.prototype.addClass = function (className) {
                if (!this.hasClass(className)) {
                    this.className += ' ' + className;
                }
                return this;
            };

            Element.prototype.removeClass = function (className) {
                var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
                if (this.hasClass(className)) {
                    while (newClass.indexOf( ' ' + className + ' ') >= 0) {
                        newClass = newClass.replace(' ' + className + ' ', ' ');
                    }
                this.className = newClass.replace(/^\s+|\s+$/g, ' ');
                }
                return this;
            };
        }

}

app.init();
