const backgroundColor = '#f5f5f5';
const axesColor       = '#000000';
const gridColor       = '#929292';

let CanvasF =
{
    resize: function (separations)
    {
        let max = (Screen.getSize()[1]- 150);

        $('#canvascontainer').html("<canvas id='canvas' width='"+max+"' height='"+max+"' ></canvas>");

        this.createAxes();
        this.createGrid(separations);
    },

    createAxes: function ()
    {
        let canvas = $('#canvas');
        let size   = canvas.width();

        canvas.drawRect({
            fillStyle: backgroundColor,
            x: 0,
            y: 0,
            width: 25,
            height: size,
            fromCenter: false,
        }).drawRect({
            fillStyle: backgroundColor,
            x: 0,
            y: size-25,
            width: size,
            height: 25,
            fromCenter: false,
        }).drawLine({
            strokeStyle: axesColor,
            strokeWidth: 1,
            x1: 25,
            y1: 0,
            x2: 25,
            y2: (size - 25),
        }).drawLine({
            strokeStyle: axesColor,
            strokeWidth: 1,
            x1: 25,
            y1: (size -25),
            x2: size,
            y2: (size-25),
        })
    },
    createGrid: function (separations)
    {
        if(isNaN(separations) || !Primes.testNumber(separations))
            throw new Error("invalid value!");

        Progress.show();

        let canvas = $('#canvas');
        let size   = canvas.width();

        if(separations >= 50 && separations <= 500)
        {
            separations = (Math.round10(separations,1) / 10 ) + 1;
        }
        else if(separations > 500)
        {
            separations = (Math.round10(separations,1) / 100) + 1;
        }

        separations = parseInt(separations);

        let distance = (size-25) / separations;
        let progress = 100 / separations;
        let count    = 0;

        for(let index = (distance + 25); index < size; index += distance)
        {
            canvas.drawLine({
                strokeStyle: gridColor,
                strokeWidth: 1,
                x1: index,
                y1: 0,
                x2: index,
                y2: (size - 25),
            }).drawLine(
                {
                strokeStyle: axesColor,
                strokeWidth: 1,
                x1: index,
                y1: (size - 25),
                x2: index,
                y2: (size - 15),
            }).drawLine({
                strokeStyle: gridColor,
                strokeWidth: 1,
                x1: 25,
                y1: (size - index),
                x2: size,
                y2: (size - index),
            }).drawLine({
                strokeStyle: axesColor,
                strokeWidth: 1,
                x1: 15,
                y1: (size - index),
                x2: 25,
                y2: (size - index),
            });

            count += progress;
            Progress.update(count);
        }

        canvas.drawLine({
            strokeStyle: gridColor,
            strokeWidth: 1,
            x1: (size - 1),
            y1: 0,
            x2: (size - 1),
            y2: (size - 25),
        }).drawLine({
            strokeStyle: axesColor,
            strokeWidth: 1,
            x1: (size - 1),
            y1: (size - 25),
            x2: (size - 1),
            y2: (size - 15),
        }).drawLine({
            strokeStyle: gridColor,
            strokeWidth: 1,
            x1: 25,
            y1: 1,
            x2: size,
            y2: 1,
        }).drawLine({
            strokeStyle: axesColor,
            strokeWidth: 1,
            x1: 15,
            y1: 1,
            x2: 25,
            y2: 1,
        });

        Progress.update(100);
        Progress.hide();
    }
};