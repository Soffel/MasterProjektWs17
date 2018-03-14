let PrimeFunctions = {

    testAndGetNextPrime(_prime) {
        if (this.testNumber(_prime)) {
            return _prime;
        }
        else {
            let prime = false;
            while (!prime) {
                _prime++;
                prime = this.testNumber(_prime);
            }
            return _prime;
        }
    },

    testAndGetLastPrime(_prime) {
        if (this.testNumber(_prime)) {
            return _prime;
        }
        else {
            let prime = false;
            while (!prime) {
                if(_prime > 2)
                {
                    _prime--;
                    prime = this.testNumber(_prime);
                }
                else
                    return 2;
            }
            return _prime;
        }
    },

    testNumber(_prime) {
        if (isNaN(_prime) || _prime < 2)
            return false;

        for (let index = 2; index < _prime; index++) {
            if (_prime % index === 0) {
                return false;
            }
        }
        return true;
    },
};

