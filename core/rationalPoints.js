
let RationalPoints =
{
    generatePoints(_a,_b,_Z)
    {
        Progress.update(0);

        let m_Points = [];

        if(isNaN(_Z) || !PrimeFunctions.testNumber(_Z) || isNaN(_a) || isNaN(_b))
            throw new Error("invalid values!");

        let progress = 100 / _Z;
        let count    = 0;
        let bigX     = 0;
        let bixY     = 0;

        for(let x = 0; x < _Z; x++)
        {
            let tempX = (((x * x * x)+(_a * x) + _b) % _Z);

            for(let y = 0; y <_Z; y++)
            {
                if((y * y) % _Z === tempX)
                {
                    if(x > bigX) bigX = x;
                    if(y > bixY) bixY = y;

                    m_Points.push([x, y]);
                }
            }
            count += progress;
            Progress.update(count);
        }

        m_Points["bigX"] = bigX;
        m_Points["bigY"] = bixY;

        Progress.update(100);

        return m_Points;
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
    }
};