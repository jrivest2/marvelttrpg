import TraitsShow from './TraitsShow';
import TagsShow from './TagsShow';
import ClickRule from './ClickRule';

function TraitsTags({character}) {
    const traits = character.traits.map((trait, index) => {
        return <TraitsShow trait={trait} key={index} />
    });
    const tags = character.tags.map((tag, index) => {
        return <TagsShow tag={tag} key={index} />
    });
    
    const traitsHeaderBody = (
        <div>
            <div className='subtitle'><b>TRAITS</b></div>
            <div>A trait is a label that has a game mechanic associated with it. Some of them are minor powers or abilities, while others simply represent skills. Many traits are available to anyone, while others are restricted to characters of certain origins.</div>
            <div>
                A character can acquire traits in three main ways.
                <ul>
                    <li>As  part of an origin.</li>
                    <li>As  part of an occupation.</li>
                    <li>As an extra trait.</li>
                </ul>
            </div>
            <div>A character gets one extra trait for each rank they have. For example, a hero at Rank 4 can choose four extra traits.</div>
            <div>All of your character's traits are described within this character sheet. To see a trait's description, just click on it. Many trait descriptions are kept purposefully vague so the player can fill in the details. This is a great way to make a character feel unique.</div>
        </div>
    );


    const tagsHeaderBody = (
        <div>
            <div className='subtitle'><b>TAGS</b></div>
            <div>A tag is a label that describes an aspect of the character but primarily has a narrative effect rather than a mechanical one. These define facts about the character: who they are, where they come from, how they behave and so on. Many tags are available to anyone, while others are restricted to characters of certain origins.</div>
            <div>Most characters gain tags as part of their origin and occupation but these can change throughout play. When you're creating a character, it's up to you how many tags you want your character to have. Just keep in mind that the tags you pick should fit well with your character concept.</div>
            <div>There's no limit to the number of tags a character can have. Some characters are more complex than others and can wind up with many tags. Others are more straightforward and only have a few tags.</div>
            <div>All of your character's tags are described within this character sheet. To see a tag's description, just click on it. As with traits, many descriptions are kept purposefully vague so the player can fill in the details and make the character feel unique.</div>
        </div>
    );

    return (
        <div>
            <ClickRule rule={<b>TRAITS</b>} children={traitsHeaderBody} titleClass={'subtitle'} />
            <div>{traits}</div>
            <ClickRule rule={<b>TAGS</b>} children={tagsHeaderBody} titleClass={'subtitle'} />
            <div>{tags}</div>
        </div>
    );
}

export default TraitsTags;