const spaceSelectSetSize = 5;
let zoom = 0;

let Preparer =
    {
        run: function ()
        {
            zoom = 0;

            this.createSpaceSelect();
        },

        zoomUp: function () {

            zoom++;
        },

        setZoom: function (_zoom) {

            zoom = _zoom;
        },

        createSpaceSelect: function ()
        {
            let space = $('#space');
            let min   = 1;
            let normal = spaceSelectSetSize;
            let max    = spaceSelectSetSize *2;

            if(zoom > 0)
            {
               min    = spaceSelectSetSize * zoom;
               normal = spaceSelectSetSize * (zoom * 2);
               max    = spaceSelectSetSize * (zoom * 3);
            }

            space.html("<option value='"+min+"' selected>"+min+"</option>");
            space.append("<option value='"+normal+"'>"+normal+"</option>");
            space.append("<option value='"+max+"'>"+max+"</option>");
        },
    };