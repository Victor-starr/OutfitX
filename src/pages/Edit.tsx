import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { parseAxiosErrorDetails } from "@/utils/parseAxiosErrorDetails";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useApi from "@/hook/UseApi";
import type { FormState, CreatePayload } from "@/types/items_types";

export default function Edit() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const api = useApi();
  const [form, setForm] = useState<FormState>({
    name: "",
    color: "",
    imageBase64: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/clothes/${itemId}`);
        setForm({
          name: res.data.name,
          color: res.data.color,
          imageBase64: res.data.imageURL,
        });
        setTags(res.data.tags || []);
      } catch (error) {
        console.error(parseAxiosErrorDetails(error));
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageBase64: reader.result as string }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.color) {
      setStatus("Name and color are required");
      return;
    }
    if (!form.imageBase64) {
      setStatus("Please select an image");
      return;
    }
    //TODO: API CALL to remove items image background

    const newAttributes: CreatePayload = {
      name: form.name,
      color: form.color,
      tags,
      imageBase64: form.imageBase64,
    };

    try {
      setLoading(true);
      setStatus("Uploading...");
      const res = await api.put(`/clothes/${itemId}`, {
        itemId,
        newAttributes,
      });
      if (res.status !== 200)
        throw new Error(res.data?.error || "Unknown error");

      setStatus("Item updated successfully!");
      console.log("everything is fine");
      setForm({ name: "", color: "", imageBase64: null });
      setTags([]);
      setTagInput("");
      navigate(`/wardrobe/${itemId}`);
    } catch (err) {
      console.log(parseAxiosErrorDetails(err));
      setStatus(`Update failed: ${parseAxiosErrorDetails(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Edit Wardrobe Item
      </h1>
      <form
        onSubmit={handleSubmit}
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

        <Button
          type="submit"
          version="v1"
          bgColor="primary"
          textColor="title"
          size="xl"
          className="mt-4 px-10 py-3"
          disabled={loading}
        >
          Upload Item
        </Button>
        {status && (
          <p className="mt-4 text-primary text-sm text-center">{status}</p>
        )}
      </form>
    </main>
  );
}
