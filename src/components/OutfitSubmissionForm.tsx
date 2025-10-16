import { useState, type ChangeEvent } from "react";
import type { handleOutfitSaveProps } from "@/hook/useOutfit";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type OutfitSubmissionForm = {
  onSave?: (handleOutfitSaveProps: handleOutfitSaveProps) => void;
  onUpdate?: (props: handleOutfitSaveProps & { outfitId: string }) => void;
  oldName?: string;
  oldTags?: string[];
  outfitId: string;
  onCancel: () => void;
};

function OutfitSubmissionForm({
  onSave,
  onUpdate,
  oldName,
  oldTags,
  outfitId,
  onCancel,
}: OutfitSubmissionForm) {
  const [form, setForm] = useState<{ name: string }>(
    oldName ? { name: oldName } : { name: "" }
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(oldTags ? oldTags : []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ e, form, tags, outfitId });
    } else if (onSave) {
      onSave({ e, form, tags });
    }
  };
  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center bg-black/45 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 bg-card mb-6 px-10 py-6 rounded-2xl"
      >
        <IoMdClose
          onClick={onCancel}
          size={35}
          color="white"
          className="top-5 right-5 absolute hover:scale-110 transition-transform hover:cursor-pointer"
        />
        <h2 className="mb-4 font-bold text-title text-2xl">Update Outfit</h2>
        <Input
          label="Outfit Name"
          type="text"
          name="name"
          value={form.name}
          onInputChange={handleInputChange}
          className="mb-4"
        />
        <div className="flex items-end gap-2">
          <Input
            label="Tags"
            type="text"
            id="tagInput"
            name="tagInput"
            placeholder="Add a tag"
            value={tagInput}
            onInputChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-3 py-2 border focus:border-primary rounded focus:outline-none focus:ring"
          />
          <Button
            version="v1"
            type="button"
            bgColor="secondary"
            textColor="title"
            size="lg"
            onClick={handleAddTag}
            className="p-3"
          >
            <FaPlus />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 bg-surface px-2 py-1 rounded text-title text-sm"
              >
                {tag}
                <IoClose
                  size={20}
                  className="text-secondary hover:cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </span>
            ))}
          </div>
        )}
        <Button
          version="v1"
          type="submit"
          bgColor="primary"
          textColor="title"
          size="lg"
          className="mt-2 px-10 py-3 rounded-2xl"
        >
          Save Outfit
        </Button>
      </form>
    </div>
  );
}

export default OutfitSubmissionForm;
