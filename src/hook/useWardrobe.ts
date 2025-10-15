import type {
  CreatePayload,
  FormState,
  WardrobeItem,
} from "@/types/clothing_types";
import { useState, type FormEvent } from "react";
import useApi from "./UseApi";
import { WardrobeData } from "@/data/Wardrobe_Mocks";
import { parseAxiosErrorDetails } from "@/utils/parseAxiosErrorDetails";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

type ResType = {
  message: string;
  data: WardrobeItem[] | [];
  status: number;
};
interface handleFormEditCreateProp {
  e: FormEvent<HTMLFormElement>;
  form: FormState;
  tags: string[];
  setTagInput: (input: string) => void;
  setTags: (tags: string[]) => void;
  setForm: (form: FormState) => void;
}
interface UseWardrobeReturn {
  loading: boolean;
  result: ResType;
  fetchItem: () => Promise<void>;
  fetchData: () => Promise<void>;
  handleDeleteItem: () => Promise<void>;
  handleEditItem: (props: handleFormEditCreateProp) => Promise<void>;
  handleCreateItem: (props: handleFormEditCreateProp) => Promise<void>;
  ProfileFullDelete: () => Promise<void>;
}

interface useWardrobeProps {
  itemId?: string | undefined;
}

export default function useWardrobe({
  itemId,
}: useWardrobeProps = {}): UseWardrobeReturn {
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResType>({
    message: "Not loaded",
    data: [],
    status: 0,
  });

  const DEV: boolean = import.meta.env.VITE_DEV === "true";

  async function fetchData() {
    setIsLoading(true);
    console.log(auth.user?.profile["cognito:username"]);
    try {
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult({
          message: "Mock data fetched",
          data: WardrobeData,
          status: 200,
        });
        console.log("Using mock data for wardrobe", WardrobeData);
      } else {
        const res = await api.get("/clothes");
        console.log("Using API for wardrobe", res);
        setResult({
          message: res.data.message,
          data: res.data.data,
          status: res.status,
        });
      }
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to fetch wardrobe:", { message, status });
      setResult({
        message: message,
        data: [],
        status: status,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchItem() {
    setIsLoading(true);
    try {
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockItem = WardrobeData.find((item) => item.itemId === itemId);
        if (mockItem) {
          setResult({
            message: "Mock item fetched",
            data: [mockItem],
            status: 200,
          });
          console.log("Using mock data for item", mockItem);
        } else {
          setResult({
            message: "Item not found in mock data",
            data: [],
            status: 404,
          });
          console.error("Item not found in mock data", { itemId });
        }
      }
      const res = await api.get(`/clothes/${itemId}`);
      setResult({
        message: res.data.message,
        data: [res.data.data],
        status: res.status,
      });
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to fetch item details:", { message, status });
      setResult({
        message: message,
        data: [],
        status: status,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteItem = async () => {
    if (auth.user?.profile?.sub !== result.data[0]?.userId) {
      console.error("You are not authorized to delete this item.");
      return;
    }
    try {
      setIsLoading(true);
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Mock delete item with ID:", itemId);
      } else {
        const res = await api.delete(`/clothes/${itemId}`, {
          data: { itemId },
        });
        setResult({
          message: res.data.message,
          data: [],
          status: res.status,
        });
      }
      navigate("/wardrobe");
      console.log("Deleting item with ID:", itemId);
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to delete item:", { message, status });
      setResult({
        message,
        data: [],
        status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async ({
    e,
    form,
    tags,
    setTagInput,
    setTags,
    setForm,
  }: handleFormEditCreateProp) => {
    e.preventDefault();

    if (!form.name || !form.color) {
      setResult((prev) => ({
        ...prev,
        message: "Name and color are required",
        status: 400,
      }));
      return;
    }
    if (!form.imageBase64) {
      setResult((prev) => ({
        ...prev,
        message: "Please select an image",
        status: 400,
      }));
      return;
    }
    if (tags.length === 0) {
      setResult((prev) => ({
        ...prev,
        message: "Please add at least one tag",
        status: 400,
      }));
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
      setIsLoading(true);
      const res = await api.put(`/clothes/${itemId}`, {
        itemId,
        newAttributes,
      });
      setResult({
        message: res.data.message,
        data: [res.data.data],
        status: res.status,
      });
      setForm({ name: "", color: "", imageBase64: null });
      setTags([]);
      setTagInput("");
      navigate(`/wardrobe/${itemId}`);
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.log(parseAxiosErrorDetails(err));
      setResult((prev) => ({
        ...prev,
        message,
        status: status,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateItem = async ({
    e,
    form,
    tags,
    setTagInput,
    setTags,
    setForm,
  }: handleFormEditCreateProp) => {
    e.preventDefault();

    if (!form.name || !form.color) {
      setResult((prev) => ({
        ...prev,
        message: "Name and color are required",
        status: 400,
      }));
      return;
    }
    if (!form.imageBase64) {
      setResult((prev) => ({
        ...prev,
        message: "Please select an image",
        status: 400,
      }));
      return;
    }
    if (tags.length === 0) {
      setResult((prev) => ({
        ...prev,
        message: "Please add at least one tag",
        status: 400,
      }));
      return;
    }
    //TODO: API CALL to remove items image background

    const payload: CreatePayload = {
      name: form.name,
      color: form.color,
      tags,
      imageBase64: form.imageBase64,
    };

    try {
      setIsLoading(true);
      const res = await api.post("/clothes/create", payload);

      setResult((prev) => ({
        ...prev,
        message: res.data.message,
        status: res.status,
      }));
      setForm({ name: "", color: "", imageBase64: null });
      setTags([]);
      setTagInput("");
      navigate("/wardrobe");
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.log(parseAxiosErrorDetails(err));
      setResult((prev) => ({
        ...prev,
        message,
        status,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const ProfileFullDelete = async () => {
    setIsLoading(true);
    try {
      navigate("/");
      auth.removeUser();
      const payload = {
        userId: auth.user?.profile?.sub,
        username: auth.user?.profile["cognito:username"],
      };
      const res = await api.delete(`/profile`, { data: payload });
      setResult({
        message: res.data.message,
        data: [],
        status: res.status,
      });
      console.log(
        "Deleted all wardrobe items for user:",
        auth.user?.profile?.sub
      );
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to delete all wardrobe items:", {
        message,
        status,
      });
      setResult({
        message,
        data: [],
        status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loading,
    result,
    fetchItem,
    fetchData,
    handleDeleteItem,
    handleEditItem,
    handleCreateItem,
    ProfileFullDelete,
  };
}
