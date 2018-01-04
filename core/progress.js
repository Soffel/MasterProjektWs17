const progressbar = $('.progress-bar');

let Progress =
{
    show: function ()
    {
        this.update(0);
        progressbar.show()
    },

    hide: function (_time)
    {
        setTimeout('progressbar.hide()', _time);
    },

    update: function (_value)
    {
        if(isNaN(_value) || _value < 0 )
            throw new Error("invalid value!");

        if(_value > 100)
            _value = 100;

        progressbar.css('width', _value+'%').attr('aria-valuenow', _value);
    },
};