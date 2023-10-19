function SpeedShow ({type, value}) {

    if (value == 0) return null;

    return (<div>{type}: {value}</div>);
}

export default SpeedShow;