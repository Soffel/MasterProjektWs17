const progressbar = $('.progress-bar');

let Progress =
{
    update: function (_value)
    {
        if(isNaN(_value) || _value < 0 )
            throw new Error("invalid value!");

        if(_value > 100)
            _value = 100;

        console.log(_value);
        progressbar.css('width', _value+'%').attr('aria-valuenow', _value);
    },
};