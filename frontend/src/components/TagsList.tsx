import TagsModel from "../models/TagsModel";

interface TagsListProps{
    tags: TagsModel;
}

export default function TagsList(props: TagsListProps){
    return (
        <>
            {
                props.tags.map((tag: string) => (
                    <h1>{tag}</h1>
                ))
            }
        </>
    );
}