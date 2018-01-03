const canvasdata = $('canvas');

let can =
{
    resize: function ()
    {
        let max = (Screen.getSize()[1]- 90);

        canvasdata.width(max);
        canvasdata.height(max);


        this.createGrid();
    },

    createGrid: function (_anz)
    {
        canvasdata.drawLine({
            strokeStyle: '#000',
            strokeWidth: 1,
            x1: 20, y1: 50,
            x2: 20, y2: (canvasdata.height()-50),
        });
    },
    /*
    createGrid: function()
    {
        let x, y;

        // Draw vertical gridlines
        for (x = -centerX; x <= centerX; x += graph.zoom) {
            $('canvas').canvas.drawLine({
                strokeStyle: '#ddd',
                strokeWidth: graph.zoom / 15,
                x1: x, y1: -centerY,
                x2: x, y2: centerY
            });
        }
        // Draw vertical gridlines
        for (y = -centerY; y <= centerY; y += graph.zoom) {
            $('canvas').canvas.drawLine({
                strokeStyle: '#ddd',
                strokeWidth: graph.zoom / 15,
                x1: -centerX, y1: y,
                x2: centerX, y2: y
            });
        }

        $$.canvas.css({
            backgroundImage: 'url(' + $$.canvas[0].toDataURL() + ')',
            backgroundPosition: '0 0',
            backgroundSize: canvasW + 'px ' + canvasH + 'px'
        })
    },

// Create coordinate grid
function drawAxes() {

    $$.canvas
    // X-axis
        .drawLine({
            strokeStyle: '#aaa',
            strokeWidth: graph.zoom / 15,
            x1: -canvasW / 2, x2: canvasW / 2,
            y1: -graph.offset.y, y2: -graph.offset.y
        })
        // Y-axis
        .drawLine({
            strokeStyle: '#aaa',
            strokeWidth: graph.zoom / 15,
            x1: graph.offset.x, x2: graph.offset.x,
            y1: -canvasH / 2, y2: canvasH
        });
}
*/
};