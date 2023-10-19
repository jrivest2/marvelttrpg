function PowerRuleShow({power}) {

    
    let outputStats = Object.entries(power).map((stat, index) => {
        
        if (stat[1].length !=0 && stat[0] != "name") {
            if (stat[0] == "summary") return <div key={index}>{stat[0].toUpperCase()}: <i>{stat[1]}</i></div>;
            if (typeof(stat[1]) != "string") return <div key={index}>{stat[0].toUpperCase()}: {stat[1].toString()}</div>
            return <div key={index}>{stat[0].toUpperCase()}: {stat[1]}</div>
        }
    })
    return (
        <div>
            <div><b>Power: {power.name}</b></div>
            <div>{outputStats}</div>
            <br></br>

        </div>
    );
};

export default PowerRuleShow;