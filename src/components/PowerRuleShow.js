function PowerRuleShow({power}) {

    
    let outputStats = Object.entries(power).map((stat, index) => {
        
        if (stat[1].length !=0 && stat[0] != "name") {
            if (stat[0] == "summary") return <div key={index}>{stat[0].toUpperCase()}: <i>{stat[1]}</i></div>;
            // if (stat[0] == "integrated") return stat[1] ?  <div key={index}>This power's effects have been integrated into the website! No need for additional math.</div> : <div key={index}>This power's effects have <b>NOT</b> yet been integrated into the website. You will need to keep track of its effects on your own.</div> 
            
            //Use the below if for integrated if/when the datafile switchs to use an array with 0/1/2 and a string.
            if (stat[0] == "integrated") {
                switch(stat[1][0]) {
                    case 1:
                        return <div key={index}>This power's effects have been <b>PARTIALLY</b> integrated into the website. {stat[1][1]}</div>;
                    case 2:
                        return <div key={index}>This power's effects have been integrated into the website! No need for additional math.</div>;
                    default:
                        return <div key={index}>This power's effects have <b>NOT</b> yet been integrated into the website. You will need to keep track of its effects on your own.</div>;
                    
                } 
            } 
            if (typeof(stat[1]) != "string") return <div key={index}>{stat[0].toUpperCase()}: {stat[1].toString()}</div>;
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