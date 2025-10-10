import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router";
import Input from "@/components/Input";
import { Button, LinkButton } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { FormState } from "@/types/items_types";
import useWardrobe from "@/hook/useWardrobe";

export default function Edit() {
  const { itemId } = useParams<{ itemId: string }>();
  const [form, setForm] = useState<FormState>({
    name: "",
    color: "",
    imageBase64: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { fetchItem, handleEditItem, loading, result } = useWardrobe({
    itemId,
  });

  useEffect(() => {
    if (!itemId) return;
    if (result.data.length === 0) {
      fetchItem();
    } else {
      const item = result.data[0];
      setForm({
        name: item.name || "",
        color: item.color || "",
        imageBase64: item.imageURL || null,
      });
      setTags(item.tags || []);
    }
  }, [itemId, result.data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev: FormState) => ({
        ...prev,
        imageBase64: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
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

  return (
    <main className="flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Edit Wardrobe Item
      </h1>
      <form
        onSubmit={(e) =>
          handleEditItem({
            e,
            form,
            tags,
            setTagInput,
            setTags,
            setForm,
          })
        }
        className="flex flex-col gap-4 bg-card mb-6 px-10 py-6 rounded-2xl"
      >
        <Input
          label="Name"
          name="name"
          placeholder="Enter clothing item name"
          value={form.name}
          onInputChange={handleInputChange}
          required
        />
        <Input
          label="Color"
          name="color"
          placeholder="Enter clothing item color"
          value={form.color}
          onInputChange={handleInputChange}
          required
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
            className="flex-1 px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
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

        <Input
          label="Image"
          name="imageBase64"
          type="file"
          accept="image/*"
          onInputChange={handleFileChange}
          className="hover:scale-105 transition-transform hover:cursor-pointer hover:"
          required
        />
        {form.imageBase64 && (
          <img
            src={form.imageBase64}
            alt="Preview"
            className="mt-2 border rounded max-h-36 object-center object-contain"
          />
        )}
        <div className="flex md:flex-row flex-col justify-center items-center gap-3 md:gap-5 mt-5 w-full">
          <LinkButton
            to={`/wardrobe/${itemId}`}
            version="v2"
            bgColor="secondary"
            textColor="secondary"
            size="xl"
            className="md:flex-1 px-5 py-3 w-full"
          >
            Cancel
          </LinkButton>
          <Button
            type="submit"
            version="v1"
            bgColor="primary"
            textColor="title"
            size="xl"
            className="md:flex-1 px-5 py-3 w-full"
            disabled={loading}
          >
            Upload Item
          </Button>
        </div>

        {result.status !== 200 && result.status !== 0 && (
          <p className="mt-4 text-primary text-sm text-center">
            {result.message}
          </p>
        )}
      </form>
    </main>
  );
}
