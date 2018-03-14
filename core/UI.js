const spaceSelectSetSize = 5;
const PRIME_INPUT = '#primeinput';
const VAR_A_INPUT = '#a';
const VAR_B_INPUT = '#b';
let zoom = 0;

const progressbar = $('.progress-bar');

let Preparer =
    {
        run: function () {
            zoom = 0;

            this.createSpaceSelect();
        },

        redraw: function() {
            let p = $(PRIME_INPUT).val();
            CanvasF.createPoints(RationalPoints.generatePoints($(VAR_A_INPUT).val(), $(VAR_B_INPUT).val(), p), p);
        },

        clear: function() {
            CanvasF.createPoints(0);
        },

        zoomUp: function () {

            zoom++;

        },

        zoomDown: function () {
            if (zoom > 0)
                zoom--;
        },

        getZoom: function () {
            return zoom;
        },

        createSpaceSelect: function () {
            let space = $('#space');
            let min = 1;
            let normal = spaceSelectSetSize;
            let max = spaceSelectSetSize * 2;

            if (zoom > 0) {
                min = spaceSelectSetSize * zoom;
                normal = spaceSelectSetSize * (zoom * 2);
                max = spaceSelectSetSize * (zoom * 3);
            }

            space.html("<option value='" + min + "' selected>" + min + "</option>");
            space.append("<option value='" + normal + "'>" + normal + "</option>");
            space.append("<option value='" + max + "'>" + max + "</option>");
        },
    };

let UI =
    {
        next(_id) {
            let element = $('#' + _id);

            element.val((parseFloat(element.val()) + 1));
            if(RationalPoints.checkAandB(_id))
            {
                Preparer.redraw();
            }
            else
            {
                Preparer.clear();
            }

        },

        last(_id) {
            let element = $('#' + _id);

            element.val((parseFloat(element.val()) - 1));
            if(RationalPoints.checkAandB(_id))
            {
                Preparer.redraw();
            }
            else
            {
                Preparer.clear();
            }
        },

        check(_id)
        {
            if(RationalPoints.checkAandB(_id))
            {
                Preparer.redraw();
            }
            else
            {
                Preparer.clear();
            }
        },

        nextPrime() {
            const input = $(PRIME_INPUT);
            let p = PrimeFunctions.testAndGetNextPrime(parseInt(input.val()) + 1);
            input.val(p);

            if(RationalPoints.checkAandB('a'))
            {
                Preparer.createSpaceSelect(p);
                Preparer.redraw();
            }
            else
            {
                Preparer.clear();
            }

        },

        lastPrime() {
            const input = $(PRIME_INPUT);
            let p = PrimeFunctions.testAndGetLastPrime(parseInt(input.val()) - 1);
            input.val(p);
            if(RationalPoints.checkAandB('b'))
            {
                Preparer.createSpaceSelect(p);
                Preparer.redraw();
            }
            else
            {
                Preparer.clear();
            }
        },
    };

let Progress =
    {
        update: function (_value) {
            if (isNaN(_value) || _value < 0)
                throw new Error("invalid value!");

            if (_value > 100)
                _value = 100;

            // console.log(_value);
            progressbar.css('width', _value + '%').attr('aria-valuenow', _value);
        },
    };