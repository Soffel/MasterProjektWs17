let primesinstance = null;

class Primes
{
    constructor(_maxPrime)
    {
        if(!primesinstance)
        {
            this._TAG = "PRIMES: ";
            this.m_PrimeArray = [];

            if(isNaN(_maxPrime) || _maxPrime <= 2)
                throw new Error(this.TAG + "invalid constructor!");

            this.m_MaxPrime = _maxPrime;

            this._generatePrimesArray();

            primesinstance = this;
        }
        return primesinstance;
    }

    get TAG(){return this._TAG;}
    get PrimeArray() {return this.m_PrimeArray;}


    _generatePrimesArray()
    {
        let i = 2;
        let prime = true;

        while (i < this.m_MaxPrime)
        {
            for(let j = 2; j < i-1; j++)
            {
                if(i%j === 0)
                {
                    prime = false;
                    break;
                }
            }

            if(prime)
            {
                this.m_PrimeArray.push(i);
            }
            else
            {
                prime = true;
            }

            i++;
        }
    };

    static testNumber(_prime)
    {
        if(isNaN(_prime) || _prime < 2)
            return false;

        for(let j = 2; j < _prime-1; j++)
        {
            if(_prime%j === 0)
            {
                return false;
            }
        }

        return true;
    };
}