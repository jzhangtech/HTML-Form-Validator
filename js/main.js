$(document).ready(function()
{
    init();
});

function init()
{
    initValidator();

    $(document).on("keypress", "form", function(event)
    {
        return event.keyCode != 13;
    });

    $( "#validatorForm" ).submit(function(event)
    {
        event.preventDefault();
        if(validator.refreshValidation()) success();
    });
}
function initValidator()
{
    validator = new FormValidation();
    validator.addInputElement($('[id$="Name"]')[0], 'Name', true);
    validator.addInputElement($('[id$="Email"]')[0], 'Email', true);
    validator.addInputElement($('[id$="Zipcode"]')[0], 'Zipcode', true);
    validator.addInputElement($('[id$="Digit"]')[0], 'Digit', true);
    validator.addInputElement($('[id$="String"]')[0], 'String', true);
    validator.addInputElement($('[id$="SSN"]')[0], 'SSN', true);
    validator.addInputElement($('[id$="Dropdown"]')[0], 'Dropdown', true);
    validator.addInputElement($('[id$="PhoneNumber"]')[0], 'Phone Number', true);
    console.log(validator.inputList.length)
}


function success()
{
    console.log('success');
}
