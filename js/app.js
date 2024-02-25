(function(){
    toggleBurger('mobile-menu-active');

    var isOpenDialog = false;

    var btn = document.getElementById('order-btn');
    if(btn) {
        btn.addEventListener('click', function() {
            openContactsForm();
        });
    }

    window.addEventListener('keyup', function(){
        if(isOpenDialog){
            validateContacts();
        }
    })

    function openContactsForm() {
        var d = document.getElementById('modal-dialog');
        if(d) {
            isOpenDialog = true;
            document.querySelector('body').style.overflow = 'hidden';
            d.classList.add('open-modal');
            var close = document.getElementById('close-dialog');
            close.addEventListener('click', function(e){
                e.preventDefault();
                closeContactsForm()
            });
        
            var form = document.getElementById('contact-submit');
            if(!form) return false;
    
            form.addEventListener('submit', function(event){
                event.preventDefault();
                if(validateContacts()){
                    this.submit();
                }
            });
        }
    }

    function closeContactsForm() {
        var d = document.getElementById('modal-dialog');
        if(d) {
            d.classList.remove('open-modal');
            isOpenDialog = false;
            document.querySelector('body').style="";
        }
    }

    function toggleBurger(activeClass) {
        var btnBurger = document.querySelector('#burger-btn');
        btnBurger.addEventListener('click', function(event){
            var nav = document.querySelector('#nav__menu');
            nav && nav.classList.toggle(activeClass);
            var body = document.querySelector('body');
            body && body.classList.toggle(activeClass); 
            this.classList.toggle(activeClass)
        });
    }

    function validateContacts() {
        var errors = false; 
        var fields = ['name', 'phone', 'email'];
       
        fields.forEach(field => {
            var element =  document.getElementById(field);
            element.classList.toggle('errors');
            element.parentElement.previousElementSibling.classList.remove('errors');
            element.classList.remove('errors');

            if(element.value.length == 0){
                element.classList.toggle('errors');
                element.parentElement.previousElementSibling.classList.add('errors');
                element.classList.add('errors');
                if(!errors) {
                    errors = true;
                }
            }
        });

        var term = document.getElementById('term');
        term.addEventListener('change', function() {
            this.checked ?
            this.nextElementSibling.classList.remove('errors') :  
            this.nextElementSibling.classList.add('errors');
            
        })    

        if(!term.checked) {
            term.nextElementSibling.classList.add('errors');
            term.classList.add('errors');
            errors = true;
        } else {
            term.classList.remove('errors');
            term.nextElementSibling.classList.remove('errors');
        }
        
        return  !errors;
    }

})();