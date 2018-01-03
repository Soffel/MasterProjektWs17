const {remote} = require('electron');

let Screen =
{
    close : function ()
    {
        remote.getCurrentWindow().close();
    },

    maximize : function ()
    {
        remote.getCurrentWindow().maximize();

        //change maximize-button to unmaximize
        $('#headerMenuMaxi')
            .attr("onclick","Screen.unmaximize()")
            .html("<span class='glyphicon glyphicon-resize-small'></span>");
    },

    minimize: function()
    {
        remote.getCurrentWindow().minimize();
    },

    unmaximize:function ()
    {
        remote.getCurrentWindow().unmaximize();

        //change unmaximize-button to maximize
        $('#headerMenuMaxi')
            .attr("onclick","Screen.maximize()")
            .html("<span class='glyphicon glyphicon-resize-full'></span>");
    },

    getSize:function ()
    {
        return remote.getCurrentWindow().getSize()
    },
};
