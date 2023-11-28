import OriginShow from "./OriginShow";

function Origin ({origins}) {

    
    let outputOrigins = origins.map((origin, index) => {
        return <OriginShow origin={origin} key={index} />;
    });

    return <div><b>Origin:</b> {outputOrigins}</div>;
}

export default Origin;