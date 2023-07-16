import { useState } from "react";
import { BsFillXSquareFill, BsFillPlusSquareFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

interface TagsProps {
  max: number;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function Tags(props: TagsProps) {
  const { max, tags, setTags } = props;

  const [tag, setTag] = useState("");

  function removeTag(index: number) {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  }

  function handleAddTag() {
    if (!canAddTag()) return;

    addTag();
  }

  function canAddTag(): boolean {
    if (!tag) {
      toast.error("Adicione um nome para a Tag.");
      return false;
    }

    if (tags.length >= max) {
      toast.error(`Pode possuir no máximo ${max} tags.`);
      return false;
    }

    return true;
  }

  function addTag() {
    setTags([...tags, tag]);
    setTag("");
  }

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <div className="flex flex-wrap justify-center gap-2 md:gap-6">
        {tags.map((tag: string, index: number) => (
          <div className="max-w-full flex justify-between gap-3 md:gap-8 p-3 md:p-6 border-2 border-blue-400 rounded-lg">
            <p className="max-w-[80%] overflow-hidden text-ellipsis text-sm md:text-2xl font-bold">
              {tag}
            </p>
            <button
              type="button"
              className="text-lg"
              onClick={() => removeTag(index)}
            >
              <BsFillXSquareFill />
            </button>
          </div>
        ))}
      </div>

      <div className="w-1/2 m-auto flex justify-center gap-2">
        <input
          className="w-full rounded-md bg-black text-md md:text-3xl p-2 md:p-6 font-bold border-2 border-yellow-400"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          type="button"
          className="text-green-400 text-md md:text-2xl"
          onClick={handleAddTag}
        >
          <BsFillPlusSquareFill />
        </button>
      </div>
    </div>
  );
}
