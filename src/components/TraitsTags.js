import TraitsTagsShow from './TraitsTagsShow';

function TraitsTags({character}) {
    const traits = character.traits.map((trait, index) => {
        return <TraitsTagsShow traitTag={trait} key={index} />
    });
    const tags = character.tags.map((tag, index) => {
        return <TraitsTagsShow traitTag={tag} key={index} />
    });

    return (
        <div>
            <div><b>TRAITS</b></div>
            <div>{traits}</div>
            <div><b>TAGS</b></div>
            <div>{tags}</div>
        </div>
    );
}

export default TraitsTags;