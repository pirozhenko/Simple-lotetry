var app = {

        settings: {
            regExForMail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // определяет регулярное выражение для валидации имени
            regExForPhone: /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/, // определяет регулярное выражение для валидации телефона
            invalidClass: 'invalid',
            invalidClassMsg: 'invalid-msg',
            validClass: 'valid',
            delClass: 'delete',
            textForNullInput: 'This value is requaried!',
            textForEmail: 'Enter valid mail',
            textForPhone: 'Enter valid phone: (063) 555-5555',
            countStrTable: 1,
            arrName: []

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

        validationInput: function( el ) {
            var email = document.getElementById('imail'),
                phone = document.getElementById('phone'),
                valid = true;

                invalidClass = this.settings.invalidClass,
                text = this.settings.textForNullInput,
                text2 = this.settings.textForEmail,
                text3 = this.settings.textForPhone,
                delClass = this.settings.delClass,
                validClass = this.settings.validClass,
                invalidClassMsg = this.settings.invalidClassMsg,
                errorMsg = document.createElement('small'),//строка для вывода сообщения об ошибки;
                check = document.createElement('span');//галочка

                var parent = el.target.parentNode,
                    input = el.target;

               if ( input.value != '' ) {
                      parent.removeClass(invalidClass);
                      parent.addClass(validClass);

                    valid = true;
               } else {
                    parent.addClass(invalidClass);
                    parent.removeClass(validClass);
                    valid = false;
               }

               return valid;
        },

        addEl: function ( e ) {//нажатие на кнопку сохранить

            var countStrTable = this.settings.countStrTable,
                arrName = this.settings.arrName,
                tr = document.createElement( 'tr' ),
                th = document.createElement( 'th' ),
                invalidFields = 0,
                form = document.getElementById('form'),
                tbody    = document.getElementById('tbody');


            for ( var i = 0; i < form.length-1; i++ ) {//создание стольбцов и вставка их в таблицу с вместимостью инпутов
                if ( form[i].value == '' ) {

                    form[i].parentNode.addClass(this.settings.invalidClass);
                    invalidFields += 1;
                    // return false;

                }
            }

            if (invalidFields == 0) {
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
            var arrName = this.settings.arrName;
                rand        = Math.floor ( Math.random() * arrName.length ),
                boot        = document.getElementsByClassName( 'bootstrap-tagsinput' )[0],
                input   = boot.getElementsByTagName( 'input' )[0],
                span        = document.createElement( 'span' );

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

                spanRem.addEventListener("click", function(e) {
                    e.preventDefault();
                    app.removeSpan(e);
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