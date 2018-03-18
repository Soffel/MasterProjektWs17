const spaceSelectSetSize = 5;
const PRIME_INPUT = '#primeinput';
const VAR_A_INPUT = '#a';
const VAR_B_INPUT = '#b';
let zoom = 0;
let indexP = -1;
let indexQ = -1;
let pointsArray;

let Preparer =
    {
        run: function () {
            zoom = 0;

            this.createSpaceSelect();
        },

        redraw: function () {
            Progress.onRun();

            const worker = new Worker('core/rationalPoints.js');

            worker.postMessage([$(VAR_A_INPUT).val(), $(VAR_B_INPUT).val(), $(PRIME_INPUT).val()]);
            worker.onmessage = e => {
                Preparer.setPointsArray(e.data);
                CanvasCreator.createPoints(e.data);
                Progress.onFinish();
            };
        },

        clear: function () {
            CanvasCreator.clear();
        },

        zoomUp: function () {
            zoom++;
            this.createSpaceSelect();
        },

        zoomDown: function () {
            if (zoom > 0) {
                zoom--;
                this.createSpaceSelect();
            }
        },

        getZoom: function () {
            return zoom;
        },

        getPointsArray: function () {
            return pointsArray;
        },

        getPoint:function (_index) {
            return pointsArray[_index];
        },

        setPointsArray: function (_pointsArray) {
            pointsArray = _pointsArray;
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
            $('#form' + _id).html(element.val());

            this.check(_id);
        },

        last(_id) {
            let element = $('#' + _id);

            element.val((parseFloat(element.val()) - 1));
            $('#form' + _id).html(element.val());

            this.check(_id);
        },

        check(_id) {
            if (this.checkAandB(_id)) {
                Preparer.redraw();
            }
            else {
                Preparer.clear();
            }
        },

        testPrime() {
            const input = $(PRIME_INPUT);
            let p = PrimeFunctions.testAndGetNextPrime(parseInt(input.val()));
            input.val(p);
            $('#prime').html(input.val());

            if (this.checkAandB('a')) {
                Preparer.createSpaceSelect(p);
                Preparer.redraw();
            }
            else {
                Preparer.clear();
            }

        },

        nextPrime() {
            const input = $(PRIME_INPUT);
            let p = PrimeFunctions.testAndGetNextPrime(parseInt(input.val()) + 1);
            input.val(p);
            $('#prime').html(input.val());

            if (this.checkAandB('a')) {
                Preparer.createSpaceSelect(p);
                Preparer.redraw();
            }
            else {
                Preparer.clear();
            }

        },

        lastPrime() {
            const input = $(PRIME_INPUT);
            let p = PrimeFunctions.testAndGetLastPrime(parseInt(input.val()) - 1);
            input.val(p);
            $('#prime').html(input.val());

            if (this.checkAandB('b')) {
                Preparer.createSpaceSelect(p);
                Preparer.redraw();
            }
            else {
                Preparer.clear();
            }
        },

        checkAandB(_id) {
            let a = parseInt($(VAR_A_INPUT).val());
            let b = parseInt($(VAR_B_INPUT).val());

            if (((4 * (a * a * a) + (27 * (b * b))) % parseInt($(PRIME_INPUT).val())) === 0) {
                if (_id === 'a')
                    swal('Bitte einen anderen Wert für a wählen');
                else
                    swal('Bitte einen anderen Wert für b wählen');
                return false;
            }
            return true;
        },

        setP(_index) {
            indexP = _index;

            $('#P').val('(' + pointsArray[_index][0] + ',' + pointsArray[_index][1] + ')');
        },

        lastP() {
            if (indexP > 0) {
                indexP--;
                this.setP(indexP);
                CanvasCreator.markPoint(indexP,'P');
            }

        },

        nextP() {
            if (indexP < (pointsArray.length - 1)) {
                indexP++;
                this.setP(indexP);
                CanvasCreator.markPoint(indexP,'P');
            }
        },

        setQ(_index) {
            indexQ = _index;
            $('#Q').val('(' + pointsArray[_index][0] + ',' + pointsArray[_index][1] + ')');
        },

        lastQ() {
            if (indexQ > 0) {
                indexQ--;
                this.setQ(indexQ);
                CanvasCreator.markPoint(indexQ,'Q');
            }

        },

        nextQ() {
            if (indexQ < (pointsArray.length - 1)) {
                indexQ++;
                this.setQ(indexQ);
                CanvasCreator.markPoint(indexQ,'Q');
            }
        },
    };

let Progress =
    {
        onRun: function () {
            $('.cssload-box-loading').css('display', 'block');
            $('.loader').css('display', 'block');
        },
        onFinish: function () {
            setTimeout(function () {
                $('.cssload-box-loading').css('display', 'none');
                $('.loader').css('display', 'none');
            }, 200);
        }
    };