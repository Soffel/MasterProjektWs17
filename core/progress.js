const progressbar = $('.progress-bar');

let Progress =
{
    show: function ()
    {
        this.update(0);
        progressbar.show()
    },

    hide: function ()
    {
        setTimeout('progressbar.hide()', 2000);
    },

    update: function (value)
    {
        if(isNaN(value) || value < 0 )
            throw new Error("invalid value!");

        if(value > 100)
            value = 100;

        progressbar.css('width', value+'%').attr('aria-valuenow', value);
    },
};