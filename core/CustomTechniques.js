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
                if (indexP >= 0) UI.setP(indexP);
                if (indexQ >= 0) UI.setQ(indexQ);

            };
        },

        clear: function () {
            pointsArray = null;
            CanvasCreator.clear();
            UI.cleanMarkers();

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

        getPoint: function (_index) {
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
            this.cleanMarkers();
            let element = $('#' + _id);
            element.val((parseFloat(element.val()) + 1));
            $('#form' + _id).html(element.val());

            this.check(_id);
        },

        last(_id) {
            this.cleanMarkers();
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
            this.cleanMarkers();
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
            this.cleanMarkers();
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
            this.cleanMarkers();
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
            if (pointsArray != null) {
                indexP = _index;
                CanvasCreator.markPoint(indexP, 'P');
                $('#P').val('(' + pointsArray[_index][0] + ',' + pointsArray[_index][1] + ')');
                Addition.getR();
            }
        },

        setR(_index) {
            if (pointsArray != null) {
                if(_index !== undefined)
                {
                    CanvasCreator.markPoint(_index, 'R');
                    $('#R').val('(' + pointsArray[_index][0] + ',' + pointsArray[_index][1] + ')');
                }
                else
                {
                    $('#R').val('O');
                }

            }
        },

        lastP() {
            if (pointsArray != null && indexP > 0) {
                indexP--;
                this.setP(indexP);
            }

        },

        nextP() {
            if (pointsArray != null && indexP < (pointsArray.length - 1)) {
                indexP++;
                this.setP(indexP);
            }
        },

        setQ(_index) {
            if (pointsArray != null) {
                indexQ = _index;
                CanvasCreator.markPoint(indexQ, 'Q');
                $('#Q').val('(' + pointsArray[_index][0] + ',' + pointsArray[_index][1] + ')');
                Addition.getR();
            }

        },

        lastQ() {
            if (pointsArray != null && indexQ > 0) {
                indexQ--;
                this.setQ(indexQ);
            }

        },

        nextQ() {
            if (pointsArray != null && indexQ < (pointsArray.length - 1)) {
                indexQ++;
                this.setQ(indexQ);
            }
        },

        cleanMarkers() {
            indexP = -1;
            indexQ = -1;
            $('#Q').val('-');
            $('#P').val('-');
            $('#R').val('-');
            CanvasCreator.removePointMarker();
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

let Addition =
    {
        mod: function (_x, _p) {
            return((_x % _p) + _p) %_p;
        },

        getInversArray: function (_p) {
            let inverse = [];

            for (let i=0; i<_p; i++) {
                for (let j=i; j<_p; j++) {
                    if ((i*j) % _p === 1) {
                        inverse[i] = j;
                        inverse[j] = i;
                        break;
                    }
                }
            }

            return inverse;
        },

        getM: function (_P, _Q, _prime, _inverse) {
            if (indexQ === indexP) {
                // ((3*x^2+a)/2*y) mod p

                return this.mod( (3*(parseInt(_P[0]) * parseInt(_P[0])) + parseInt($('#a').val())) * _inverse[this.mod(2*parseInt(_P[1]), _prime)] ,_prime);
            }
            else {
                // ((y2 - y1)/(x2-x1)) mod p
                return this.mod((parseInt(_Q[1]) - parseInt(_P[1]))* _inverse[this.mod((parseInt(_Q[0]) - parseInt(_P[0])), _prime)], _prime);
            }
        },

        getR: function () {

            if (pointsArray != null && indexP > -1 && indexQ > -1) {
                let P = pointsArray[indexP];
                let Q = pointsArray[indexQ];

                let prime   = parseInt($('#primeinput').val());
                let inverse = this.getInversArray(prime);

                let m  = this.getM(P, Q, prime, inverse);

                let Rx = this.mod( m*m - parseInt(Q[0]) - parseInt(P[0]),prime);
                let Ry = this.mod( m*parseInt(P[0]) - m*Rx - parseInt(P[1]), prime );

                UI.setR(this.findIndex([Rx,Ry]));
            }
        },

        findIndex:function (_R) {
            for(let index = 0; index < pointsArray.length; index++)
            {
                if(pointsArray[index][0] === _R[0] && pointsArray[index][1] === _R[1])
                    return index;
            }
        }
    };
