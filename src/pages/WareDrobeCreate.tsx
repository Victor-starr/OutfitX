import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuth } from "react-oidc-context";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router";

interface FormState {
  name: string;
  color: string;
  type: string;
  tags: string;
  imageBase64: string | null;
}

interface Payload {
  name: string;
  color: string;
  type: string;
  tags: string[];
  imageBase64: string;
}

export default function WareDrobeCreate() {
  const auth = useAuth();
  const [form, setForm] = useState<FormState>({
    name: "",
    color: "",
    type: "",
    tags: "",
    imageBase64: null,
  });

  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields (tags optional)
    if (!form.name || !form.color || !form.type) {
      setStatus("Please fill in all required fields.");
      return;
    }
    if (!form.imageBase64) {
      setStatus("Please select an image");
      return;
    }

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Payload = {
      name: form.name,
      color: form.color,
      type: form.type,
      tags: tagsArray, // can be empty
      imageBase64: form.imageBase64,
    };

    try {
      setStatus("Uploading...");
      const res = await axiosInstance.post("/clothes/create", payload, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      if (res.status !== 200) {
        throw new Error(res.data?.error || "Unknown error");
      }

      const data = await res.data;
      console.log("Saved item:", data);
      setStatus("Item uploaded successfully!");
      setForm({ name: "", color: "", type: "", tags: "", imageBase64: null });
      navigate("/wardrobe");
    } catch (err) {
      console.error(err);
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
          <input
            name="type"
            placeholder="Type"
            value={form.type}
            onChange={handleInputChange}
            required
            className="px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
          />
          <input
            name="tags"
            placeholder="Tags (comma separated, optional)"
            value={form.tags}
            onChange={handleInputChange}
            className="px-3 py-2 border focus:border-blue-400 rounded focus:outline-none focus:ring"
          />
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
