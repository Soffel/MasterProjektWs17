const config =
    {
        color:
            {
                background: '#f5f5f5',
                axes: '#000',
                grid: '#929292',
                point: '#165dff',
            },
        font:
            {
                type: 'Arial',
                size: 15,
            },
        distance:
            {
                padding: 20,
                stroke: 12,
                axes: 25,
                arrow: 8,
                beauty: 1,
                text: 4,
            },
        width:
            {
                axes: 2,
                grid: 2,
                text: 1,
            },
        arrow:
            {
                radius: 10,
                angle: 45,
            },
        point:
            {
                radius: 5,
                hole: 0.5,

            }
    };

let CanvasCreator =
    {
        new: function () {
            let maxSize = parseInt((Screen.getSize()[1] - 120));
            $('#canvascontainer').html("<canvas id='canvas' width='" + maxSize + "' height='" + maxSize + "' ></canvas>");
        },

        clear: function () {
            this.new();
            this.createDefaultView();
        },

        resize: function (_countOfSeparations) {
            this.clear();
            this.createAxes();
            this.createGrid(_countOfSeparations)
        },

        createDefaultView: function () {
            let canvas = $('#canvas');
            let canvasSize = canvas.width();

            canvas.drawRect({ //Rand links
                layer: true,
                fillStyle: config.color.background,
                x: 0,
                y: 0,
                width: (config.distance.axes + config.distance.padding),
                height: canvasSize,
                fromCenter: false,
            }).drawRect({ // Rand oben
                layer: true,
                fillStyle: config.color.background,
                x: 0,
                y: 0,
                width: canvasSize,
                height: config.distance.padding,
                fromCenter: false,
            }).drawRect({ // Rand rechts
                layer: true,
                fillStyle: config.color.background,
                x: (canvasSize - config.distance.padding),
                y: 0,
                width: config.distance.padding,
                height: canvasSize,
                fromCenter: false,
            }).drawRect({ // Rand unten
                layer: true,
                fillStyle: config.color.background,
                x: 0,
                y: (canvasSize - (config.distance.padding + config.distance.axes)),
                width: canvasSize,
                height: (config.distance.padding + config.distance.axes),
                fromCenter: false,
            });
        },

        createAxes: function () {
            let canvas = $('#canvas');
            let canvasSize = canvas.width();

            canvas.drawLine({// y Achse
                layer: true,
                strokeStyle: config.color.axes,
                strokeWidth: config.width.axes,
                x1: (config.distance.axes + config.distance.padding),
                y1: (config.distance.padding - config.distance.arrow),
                x2: (config.distance.axes + config.distance.padding),
                y2: (canvasSize - config.distance.padding - config.distance.axes),
                startArrow: true,
                arrowRadius: config.arrow.radius,
                arrowAngle: config.arrow.angle
            }).drawLine({ // x Achse
                layer: true,
                strokeStyle: config.color.axes,
                strokeWidth: config.width.axes,
                x1: (config.distance.axes + config.distance.padding),
                y1: (canvasSize - config.distance.padding - config.distance.axes),
                x2: (canvasSize - config.distance.padding + config.distance.arrow),
                y2: (canvasSize - config.distance.padding - config.distance.axes),
                endArrow: true,
                arrowRadius: config.arrow.radius,
                arrowAngle: config.arrow.angle
            });
        },

        getAndChangeDistance: function (_size, _countOfSeparations) {

            let sep = _countOfSeparations / $('#space').val();
            let dis = ($('#canvas').width() - (2 * config.distance.padding + config.distance.axes)) / sep;
            console.log(dis);
               if (dis < 35 ) {
                   Preparer.zoomUp();
                   dis = this.getAndChangeDistance(_size, _countOfSeparations)
               }
               else if (dis > 146 && Preparer.getZoom() > 1) {
                   Preparer.zoomDown();
                   dis = this.getAndChangeDistance(_size, _countOfSeparations)
               }

            return dis;
        },

        createGrid: function (_countOfSeparations) {
            if (isNaN(_countOfSeparations))
                throw new Error('invalid value');

            let canvas = $('#canvas');
            let canvasSize = canvas.width();
            let distance = this.getAndChangeDistance(canvasSize, parseInt(_countOfSeparations));
            let count = 1;
            let zoom = Preparer.getZoom();

            for (let index = (distance + config.distance.padding + config.distance.axes);
                 index < (canvasSize - config.distance.padding);
                 index += distance) {
                canvas.drawLine({ //grid senkrecht
                    layer: true,
                    strokeStyle: config.color.grid,
                    strokeWidth: config.width.grid,
                    x1: index,
                    y1: config.distance.padding,
                    x2: index,
                    y2: (canvasSize - config.distance.padding - config.distance.axes),
                }).drawLine({ //grid waagerecht
                    layer: true,
                    strokeStyle: config.color.grid,
                    strokeWidth: config.width.grid,
                    x1: (config.distance.padding + config.distance.axes),
                    y1: (canvasSize - index),
                    x2: (canvasSize - config.distance.padding),
                    y2: (canvasSize - index),
                }).drawLine({ //strokes x achse
                    layer: true,
                    strokeStyle: config.color.axes,
                    strokeWidth: config.width.axes,
                    x1: index,
                    y1: (canvasSize - config.distance.padding - config.distance.axes - config.distance.beauty),
                    x2: index,
                    y2: (canvasSize - config.distance.axes - config.distance.padding - config.distance.beauty + config.distance.stroke),
                }).drawLine({ //strokes y achse
                    layer: true,
                    strokeStyle: config.color.axes,
                    strokeWidth: config.width.axes,
                    x1: (config.distance.padding + config.distance.axes + config.distance.beauty),
                    y1: (canvasSize - index),
                    x2: (config.distance.padding + config.distance.axes + config.distance.beauty - config.distance.stroke),
                    y2: (canvasSize - index),
                }).drawText({ //beschriftung x achse
                    layer: true,
                    fillStyle: config.color.axes,
                    strokeStyle: config.color.axes,
                    strokeWidth: config.width.text,
                    x: index,
                    y: (canvasSize - config.distance.padding - config.distance.text),
                    fontSize: config.font.size,
                    fontFamily: config.font.type,
                    text: ((zoom + 1) * count)
                }).drawText({ //beschriftung x achse
                    layer: true,
                    fillStyle: config.color.axes,
                    strokeStyle: config.color.axes,
                    strokeWidth: config.width.text,
                    x: (config.distance.padding - config.distance.text + (((zoom + 1) * count) < 10 ? (2 * config.distance.text) : 0)),
                    y: (canvasSize - index - (config.font.size * 0.5)),
                    fontSize: config.font.size,
                    fontFamily: config.font.type,
                    text: ((zoom + 1) * count),
                    fromCenter: false,
                });
                count++;
            }
        },

        createPoints: function (_pointsArray) {
            if (_pointsArray === 0) {
                this.clear();
                return;
            }

            Progress.update(0);

            let separations = (_pointsArray["bigX"] > _pointsArray["bigY"] ? _pointsArray["bigX"] : _pointsArray["bigY"]) + 1;

            this.resize(separations);

            Progress.update(10);

            let canvas = $('#canvas');
            let canvassize = (canvas.width() -  (2*config.distance.padding) - config.distance.axes);
            let distance = canvassize  / separations;
            let progress = 90 / _pointsArray.length;
            let count = 10;

            for (let index = 0; index < _pointsArray.length; index++) {
                let point = _pointsArray[index];
                canvas.drawDonut({
                    layer: true,
                    fillStyle: config.color.point,
                    x: ((point[0] * distance) + config.distance.padding + config.distance.axes),
                    y: (canvassize - (point[1] * distance)) + config.distance.axes - config.point.radius,
                    radius: config.point.radius,
                    holeSize: config.point.hole,
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