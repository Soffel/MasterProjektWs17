let primesinstance = null;

class Primes
{
    constructor(_maxPrime)
    {
        if(!primesinstance)
        {
            this._TAG         = "PRIMES: ";
            this.m_PrimeArray = [];

            if(isNaN(_maxPrime) || _maxPrime <= 2)
                throw new Error(this.TAG + "invalid constructor!");

            this.m_MaxPrime = _maxPrime;

            this._generatePrimesArray();

            primesinstance = this;
        }
        return primesinstance;
    }

    get TAG()        {return this._TAG;}
    get PrimeArray() {return this.m_PrimeArray;}

    _generatePrimesArray()
    {
        let index     = 2;
        let prime = true;

        while (index < this.m_MaxPrime)
        {
            for(let count = 2; count < index-1; count++)
            {
                if(index % count === 0)
                {
                    prime = false;
                    break;
                }
            }

            if(prime)
            {
                this.m_PrimeArray.push(index);
            }
            else
            {
                prime = true;
            }
            index++;
        }
    };

    static testNumber(_prime)
    {
        if(isNaN(_prime) || _prime < 2)
            return false;

        for(let index = 2; index < _prime; index++)
        {
            if(_prime % index === 0)
            {
                return false;
            }
        }
        return true;
    };
}