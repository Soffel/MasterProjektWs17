const backgroundColor = '#f5f5f5';
const axesColor = '#000000';
const gridColor = '#929292';
const pointColor = '#165dff';
const axesDistance = 25;
const beautyDistance = 5;
const strokeSize = 15;

let CanvasF =
    {
        resize: function (_separations, _time) {

            this.clear();
            this.createGrid(_separations, _time);

        },

        clear: function () {
            let max = parseInt((Screen.getSize()[1] - 150));
            $('#canvascontainer').html("<canvas id='canvas' width='" + max + "' height='" + max + "' ></canvas>");
            this.createAxes();
            this.createRecs();
        },

        createRecs: function () {
            let canvas = $('#canvas');
            let size = canvas.width();

            canvas.drawRect({
                layer: true,
                fillStyle: backgroundColor,
                x: 0,
                y: 0,
                width: size,
                height: (beautyDistance - 1),
                fromCenter: false,
            }).drawRect({
                layer: true,
                fillStyle: backgroundColor,
                x: (size - beautyDistance - 9),
                y: 0,
                width: beautyDistance + 10,
                height: (size-beautyDistance),
                fromCenter: false,
            });
        },

        createAxes: function () {
            let canvas = $('#canvas');
            let size = canvas.width();
            let pyt = Math.round(strokeSize * Math.sin(45)) * 0.5;

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
                y: (size - axesDistance-10),
                width: size,
                height: axesDistance+10,
                fromCenter: false,
            }).drawLine({
                layer: true,
                strokeStyle: axesColor,
                strokeWidth: 2,
                x1: axesDistance,
                y1: beautyDistance,
                x2: axesDistance,
                y2: (size - axesDistance -10),
            }).drawLine({
                layer: true,
                strokeStyle: axesColor,
                strokeWidth: 2,
                x1: axesDistance,
                y1: (size - axesDistance -10),
                x2: (size - beautyDistance - 10),
                y2: (size - axesDistance -10),
            }).drawLine({
                layer: true,
                strokeStyle: axesColor,
                strokeWidth: 2,
                x1: axesDistance,
                y1: (size - axesDistance -10),
                x2: (axesDistance - pyt),
                y2: (size - axesDistance -10+ pyt),
            });
        },

        createGrid: function (_separations, _time) {
            if (isNaN(_separations))
                throw new Error("invalid value: " + _separations);

            let canvas = $('#canvas');
            let size = canvas.width()-10;

            _separations = (_separations / $('#space').val());

            let distance = (size - axesDistance - beautyDistance) / _separations;

            if (distance < 35)
            {
                Preparer.zoomUp();
            }
            else if (distance > 146 )
            {
                Preparer.zoomDown();
            }

            let count = 1;
            let zoom = Preparer.getZoom();

            for (let index = (distance + axesDistance); index < size; index += distance) {
                if((size - index) > 1)
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

                    }).drawText({
                        layer: true,
                        fillStyle: axesColor,
                        strokeStyle: axesColor,
                        index: 9999,
                        strokeWidth: 1,
                        x: index,
                        y: (size-beautyDistance),
                        fontSize: 15,
                        fontFamily: 'Arial',
                        text: ((zoom + 1) * count)
                    }).drawText({
                        layer: true,
                        fillStyle: axesColor,
                        strokeStyle: axesColor,
                        index: 9999,
                        strokeWidth: 1,
                        x: beautyDistance,
                        y: (size-index),
                        fontSize: 15,
                        fontFamily: 'Arial',
                        text: ((zoom + 1) * count)});;

                    count++;
                }
            }
        },

        createPoints: function (_pointsArray) {

            if(_pointsArray === 0)
            {
                this.clear();
                return;
            }

            Progress.update(0);

            let separations = (_pointsArray["bigX"] > _pointsArray["bigY"] ? _pointsArray["bigX"] : _pointsArray["bigY"]) + 1;

            this.resize(separations, 750);

            Progress.update(10);

            let canvas = $('#canvas');
            let canvassize = (canvas.width() - axesDistance - beautyDistance - 10)
            let distance = canvassize / separations;
            let progress = 90 / _pointsArray.length;
            let count = 10;

            for (let index = 0; index < _pointsArray.length; index++) {
                let point = _pointsArray[index];

                canvas.drawDonut({
                    layer: true,
                    fillStyle: pointColor,
                    x: (point[0] * distance) + axesDistance,
                    y: (canvassize - (point[1] * distance)) + beautyDistance,
                    radius: 5,
                    holeSize: 0.5,
                    data: [point, index],
                    mouseover: function (layer) {
                        console.log(layer.data);
                    },
                    mouseout: function (layer) {
                    },
                });

                count += progress;
                Progress.update(count);
            }

            Progress.update(100);
        }
    };