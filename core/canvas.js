const backgroundColor = '#f5f5f5';
const axesColor       = '#000000';
const gridColor       = '#929292';
const pointColor      = '#165dff';
const axesDistance    = 25;
const beautyDistance  = 5;
const strokeSize      = 15;

let CanvasF =
{
    resize: function (_separations, _time)
    {
        let max = (Screen.getSize()[1]- 150);

        $('#canvascontainer').html("<canvas id='canvas' width='"+max+"' height='"+max+"' ></canvas>");

        this.createAxes();
        this.createGrid(_separations, _time);
    },

    createAxes: function ()
    {
        let canvas = $('#canvas');
        let size   = canvas.width();
        let pyt    = Math.round(strokeSize * Math.sin(45)) * 0.5;

        canvas.drawRect({
            layer: true,
            fillStyle: backgroundColor,
            x: 0,
            y: 0,
            width: axesDistance,
            height: size,
            fromCenter: false,
        }).drawRect({
            layer: true,
            fillStyle: backgroundColor,
            x: beautyDistance,
            y: (size - axesDistance),
            width: size,
            height: axesDistance,
            fromCenter: false,
        }).drawRect({
            layer: true,
            fillStyle: backgroundColor,
            x: 0,
            y: 0,
            width: size,
            height: beautyDistance,
            fromCenter: false,
        }).drawRect({
            layer: true,
            fillStyle: backgroundColor,
            x: (size - beautyDistance),
            y: 0,
            width: beautyDistance,
            height: size,
            fromCenter: false,
        }).drawLine({
            layer: true,
            strokeStyle: axesColor,
            strokeWidth: 2,
            x1: axesDistance,
            y1: beautyDistance,
            x2: axesDistance,
            y2: (size - axesDistance),
        }).drawLine({
            layer: true,
            strokeStyle: axesColor,
            strokeWidth: 2,
            x1: axesDistance,
            y1: (size - axesDistance),
            x2: (size - beautyDistance),
            y2: (size - axesDistance),
        }).drawLine({
            layer: true,
            strokeStyle: axesColor,
            strokeWidth: 2,
            x1: axesDistance,
            y1: (size - axesDistance),
            x2: (axesDistance - pyt),
            y2: (size - axesDistance+ pyt),
        });
    },

    createGrid: function (_separations, _time)
    {
        if(isNaN(_separations))
            throw new Error("invalid value: "+_separations);

        Progress.show();

        let canvas = $('#canvas');
        let size   = canvas.width();

        _separations = (_separations / $('#space').val()) ;

        let distance = (size - axesDistance - beautyDistance) / _separations;
        let progress = 100 / _separations;
        let count    = 0;

        console.log(distance);
        if(distance < 20)
        {
            Preparer.zoomUp();
        }

        for(let index = (distance + axesDistance); index < size; index += distance)
        {
            canvas.drawLine({
                layer: true,
                strokeStyle: gridColor,
                strokeWidth: 2,
                index: 4,
                x1: index,
                y1: beautyDistance,
                x2: index,
                y2: (size - axesDistance),
            }).drawLine({
                layer: true,
                strokeStyle: axesColor,
                strokeWidth: 2,
                x1: index,
                y1: (size - axesDistance),
                x2: index,
                y2: (size - strokeSize),
            }).drawLine({
                layer: true,
                strokeStyle: gridColor,
                strokeWidth: 2,
                index: 4,
                x1: axesDistance,
                y1: (size - index),
                x2: size - beautyDistance,
                y2: (size - index),
            }).drawLine({
                layer: true,
                strokeStyle: axesColor,
                strokeWidth: 2,
                x1: strokeSize,
                y1: (size - index),
                x2: axesDistance,
                y2: (size - index),
            });

            count += progress;
            Progress.update(count);
        }

        Progress.update(100);
        Progress.hide(_time);
    },

    createPoints: function (_pointsArray)
    {
        let separations = (_pointsArray["bigX"] > _pointsArray["bigY"] ? _pointsArray["bigX"] : _pointsArray["bigY"])+1;

        this.resize(separations,750);

        Progress.show();

        let canvas     = $('#canvas');
        let canvassize = (canvas.width() - axesDistance - beautyDistance)
        let distance   = canvassize / separations;
        let progress   = 100 / _pointsArray.length;
        let count      = 0;

        for(let index = 0; index < _pointsArray.length; index++)
        {
            let point = _pointsArray[index];

            canvas.drawDonut({
                layer: true,
                fillStyle: pointColor,
                x: (point[0] * distance) + axesDistance,
                y: (canvassize - (point[1] * distance)) + beautyDistance,
                radius: 5,
                holeSize: 0.5,
                data:point,
                mouseover: function(layer) {
                  console.log(layer.data);
                },
                mouseout: function(layer) {},
            });

            count += progress;
            Progress.update(count);
        }

        Progress.update(100);
        Progress.hide(2000);
    }
};