document.addEventListener("DOMContentLoaded", function(event)
{
    init();
});

function init()
{
    initValidator();
    setDefault();
    prepForm();
}

function initValidator()
{
    validator = new FormValidation();
    validator.addInputElement(document.querySelector('#Name'), 'Name', true);
    validator.addInputElement(document.querySelector('#Email'), 'Email', true);
    validator.addInputElement(document.querySelector('#Zipcode'), 'Zipcode', true);
    validator.addInputElement(document.querySelector('#Digit'), 'Digit', true);
    validator.addInputElement(document.querySelector('#String'), 'String', true);
    validator.addInputElement(document.querySelector('#SSN'), 'SSN', true);
    validator.addInputElement(document.querySelector('#Dropdown'), 'Dropdown', true);
    validator.addInputElement(document.querySelector('#PhoneNumber'), 'Phone Number', true);
}

function setDefault()
{
    document.addEventListener("keypress", "form", function(event)
    {
        return event.keyCode != 13;
    });
}

function prepForm()
{
    var form = document.querySelector("#validatorForm");

    form.addEventListener('submit',function(event)
    {
        event.preventDefault();
        if(validator.refreshValidation()) submitForm();
    });
}

function submitForm()
{
    alert('success');
}
