import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "react-oidc-context";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router";

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

export default function WareDrobeCreate() {
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
      setStatus(`Upload failed: ${(err as Error).message}`);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="bg-white shadow mx-auto p-6 rounded-lg w-full max-w-md">
        <h1 className="mb-6 font-bold text-2xl text-center">
          Create Wardrobe Item
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
          />
          <input
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleInputChange}
            required
            className="px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
          />

          {/* Tag Input */}
          <div className="flex gap-2">
            <input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-gray-300 hover:bg-gray-400 px-3 rounded"
            >
              +
            </button>
          </div>

          {/* Display tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-gray-200 px-2 py-1 rounded text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 font-bold text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            name="imageBase64"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="px-3 py-2 border rounded"
          />
          {form.imageBase64 && (
            <img
              src={form.imageBase64}
              alt="Preview"
              className="mt-2 border rounded max-h-36"
            />
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded text-white transition"
          >
            Upload Item
          </button>
        </form>
        {status && (
          <p className="mt-4 text-gray-700 text-sm text-center">{status}</p>
        )}
      </div>
    </div>
  );
}
