
let RationalPoints =
{
    generatePoints(_a,_b,_Z)
    {
        let m_Points = [];

        if(isNaN(_Z) || !Primes.testNumber(_Z) || isNaN(_a) || isNaN(_b))
            throw new Error("invalid values!");

        for(let x = 0; x <_Z; x++)
        {
            for(let y = 0; y <_Z; y++)
            {
                if((y*y)%_Z === ((x*x*x)+(_a*x) + _b)%_Z)
                {
                    m_Points.push([x,y]);
                }
            }
        }
        return m_Points;
    },
};