import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import axiosInstance from "@/axiosInstance";
import { getAxiosErrorMessage } from "@/utils/getAxoisErrorMsg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
interface FormState {
  name: string;
  color: string;
  imageBase64: string | null;
}

interface Payload {
  name: string;
  color: string;
  tags: string[];
  imageBase64: string;
}

export default function Create() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    color: "",
    imageBase64: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState("");

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

    const payload: Payload = {
      name: form.name,
      color: form.color,
      tags,
      imageBase64: form.imageBase64,
    };

    try {
      setStatus("Uploading...");
      const res = await axiosInstance.post("/clothes/create", payload, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      if (res.status !== 200)
        throw new Error(res.data?.error || "Unknown error");

      setStatus("Item uploaded successfully!");
      setForm({ name: "", color: "", imageBase64: null });
      setTags([]);
      setTagInput("");
      navigate("/wardrobe");
    } catch (err) {
      console.log(getAxiosErrorMessage(err));
      setStatus(`Upload failed: ${getAxiosErrorMessage(err)}`);
    }
  };

  return (
    <main className="flex flex-col items-center bg-bg py-8 min-h-screen">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Create Wardrobe Item
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-card mb-15 px-10 py-6 rounded-2xl"
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

        {/* Tag Input */}
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
            verstion="v1"
            type="button"
            color="secondary"
            size="lg"
            onClick={handleAddTag}
            className="p-3"
          >
            <FaPlus />
          </Button>
        </div>

        {/* Display tags */}
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
            className="mt-2 border rounded max-h-36"
          />
        )}

        <Button
          type="submit"
          verstion="v1"
          color="primary"
          size="xl"
          className="mt-4 px-10 py-3"
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
