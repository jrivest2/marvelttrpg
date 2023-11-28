import OccupationShow from "./OccupationShow";

function Occupation({occupations}) {

    let outputOccupations = occupations.map((occupation, index) => {
        return <OccupationShow occupation={occupation} key={index} />
    })

    return <div><b>Occupation:</b> {outputOccupations}</div>;
}

export default Occupation;