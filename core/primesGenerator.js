let instance = null;

class PrimeGenerator
{
    constructor(_maxPrime)
    {
        if(!instance)
        {
            this._TAG = "PRIMES_GENERATOR: ";
            this.m_PrimeArray = [];

            if(isNaN(_maxPrime) || _maxPrime <= 2)
                throw new Error(this.TAG + "invalid constructor!");

            this._MAXPRIME = _maxPrime;

            this.generatePrimesArray();
        }
        return instance;
    }

    get TAG(){return this._TAG;}
    get PrimeArray() {return this.m_PrimeArray;}


    generatePrimesArray()
    {
        let i = 2;
        let prime = true;

        while (i < this._MAXPRIME)
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
    }
}