import React from 'react';

function City({cityInfo}) {
    return (<div>город: {cityInfo.name}
        <div>
            температура:&nbsp;{cityInfo.data.temperature}°&nbsp;
            ветер:&nbsp;{cityInfo.data.wind}&nbsp; м/с &nbsp;
            влажность:&nbsp;{cityInfo.data.humidity}&nbsp;%&nbsp;
        </div>
    </div>);
}

export default City;
