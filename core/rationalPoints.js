this.onmessage = e => {
    const z = e.data[2];
    const a = e.data[0];
    const b = e.data[1];
    let m_Points = [];

    if (isNaN(z) || z < 2 || isNaN(z) || isNaN(z))
        throw new Error("invalid values!");

    for (let index = 2; index < z; index++) {
        if (z % index === 0) {
            throw new Error("invalid values!");
        }
    }

    let bigX = 0;
    let bixY = 0;

    for (let x = 0; x < z; x++) {
        let tempX = (((x * x * x) + (a * x) + b) % z);

        for (let y = 0; y < z; y++) {
            if ((y * y) % z === tempX) {
                if (x > bigX) bigX = x;
                if (y > bixY) bixY = y;

                m_Points.push([x, y]);
            }
        }
    }

    m_Points["bigX"] = bigX;
    m_Points["bigY"] = bixY;

    this.postMessage(m_Points);
};