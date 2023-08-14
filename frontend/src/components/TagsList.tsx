import TagsModel from "../models/TagsModel";

interface TagsListProps {
  tags: TagsModel;
  classes?: string;
}

export default function TagsList(props: TagsListProps) {
  const { tags, classes } = props;
  return (
    <>
      {tags.map((tag: string) => (
        <p className={classes}>{tag}</p>
      ))}
    </>
  );
}