function FormValidation()
{
    this.inputList = [];
}

FormValidation.prototype.addInputElement = function(elem, type, isRequired)
{
    if(elem === undefined || type === undefined) return false;

    var instance = this;
    var validatorObj = {
        elem: elem,
        type: type,
        isRequired: isRequired !== undefined ? isRequired : false
    };

    this.inputList.push(validatorObj);

    $(elem).keyup(function()
    {
        var input = instance.getInputById(this.id);
        var isValid = instance.isValid(input.type, this.value, input.isRequired);

        if(!isValid)
        {
             $(this).addClass('invalid');
        }
        else
        {
            $(this).removeClass('invalid');
        }

    });

    $(elem).change(function()
    {
        var input = instance.getInputById(this.id);
        var isValid = instance.isValid(input.type, this.value, input.isRequired);

        if(!isValid)
        {
            $(this).addClass('invalid');
        }
        else
        {
            $(this).removeClass('invalid');
        }

    });
};

//Check all subscribed inputs for valid value and returns true if they are all valid, false otherwise.
FormValidation.prototype.refreshValidation = function()
{
    var isValid = true;

    for(var inputIndex = 0; inputIndex < this.inputList.length; inputIndex++)
    {
        var input = this.inputList[inputIndex];

        if(!this.isValid(input.type, $(input.elem).val(), input.isRequired))
        {
            isValid = false;
            $(input.elem).addClass('invalid');
        }
        else
        {
            $(input.elem).removeClass('invalid');
        }

    }

    return isValid;
};

FormValidation.prototype.isEverythingValid = function()
{
    for(var inputIndex = 0; inputIndex < this.inputList.length; inputIndex++)
    {
        var input = this.inputList[inputIndex];
        if(!this.isValid(input.type, $(input.elem).val(), input.isRequired)) return false;
    }

    return true;
};

FormValidation.prototype.getInputById = function(id)
{
    for(var inputIndex in this.inputList)
    {
        if(this.inputList[inputIndex].elem.id == id) return this.inputList[inputIndex];
    }
};

FormValidation.prototype.isValid = function(type, value, isRequired)
{
    switch(type)
    {
        case 'Phone Number': return this.isValidPhoneNumber(value, isRequired);
        case 'SSN': return this.isValidSSN(value, isRequired);
        case 'Name': return this.isValidName(value, isRequired);
        case 'String': return this.isValidString(value, isRequired);
        case 'Digit': return this.isValidDigit(value, isRequired);
        case 'Email': return this.isValidEmail(value, isRequired);
        case 'Address': return this.isValidAddress(value, isRequired);
        case 'Zipcode': return this.isValidZipcode(value, isRequired);
        case 'Date': return this.isValidDate(value, isRequired);
        case 'ApexDate': return this.isValidApexDate(value, isRequired);
        case 'Dropdown': return this.isValidSelect(value, isRequired);
        default: console.log('Type not available', value); return false;
    }
};

FormValidation.prototype.isValidPhoneNumber = function(value, isRequired)
{
    if(isRequired && (value == undefined || value == "")) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    var temp = value.replace(/[^0-9\.]+/g, '');
    return (temp.length >= 10 && temp.length <= 11);
};

FormValidation.prototype.isValidSSN = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.length === 0)) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    var temp = value.replace(/-/g, '');
    return temp.length == 9;
};

FormValidation.prototype.isValidName = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.trim().length == 0)) return false;
    else if(!isRequired && (value === undefined || value.trim().length == 0)) return true;

    return /^[a-zA-Z\s.]+$/.test(value);
};

FormValidation.prototype.isValidString = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.trim().length == 0)) return false;
    else if(!isRequired && (value === undefined || value.trim().length == 0)) return true;

    return /^[0-9a-zA-Z\s\;\-.\"\'()\/&#,:]+$/.test(value);
};

FormValidation.prototype.isValidSelect = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.length == 0 || value === '--None--')) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    return /^[0-9a-zA-Z\s\;\-.\"\'()\/&#,:]+$/.test(value);
};

FormValidation.prototype.isValidDigit = function(value, isRequired)
{
   try
       {
           var number = parseFloat(value);
           if(isRequired && (number === undefined || number < 0)) return false;
           else if(isNaN(number)) return false;

           return true;
       }
       catch(ex)
       {
           return false;
       }
};

FormValidation.prototype.isValidEmail = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.length == 0)) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
};

FormValidation.prototype.isValidAddress = function(value, isRequired)
{
    if(isRequired && (value == undefined || value == "")) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    return true;
};

FormValidation.prototype.isValidZipcode = function(value, isRequired)
{
    if(isRequired && (value == undefined || value == "")) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    var temp = value.replace(/[^0-9\.]+/g, '');
    if(temp.length != 5 && temp.length != 9)
        return false;

    return true;
};

FormValidation.prototype.isValidDate = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.length == 0)) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;

    return value !== undefined && value != "";
};

FormValidation.prototype.isValidApexDate = function(value, isRequired)
{
    if(isRequired && (value === undefined || value.length == 0)) return false;
    else if(!isRequired && (value === undefined || value.length == 0)) return true;
    var re = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    return re.test(value);
};
