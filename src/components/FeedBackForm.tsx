import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import {
  validateFeedbackForm,
  type FeedbackFormData,
} from "@/utils/validation";

const FeedBackForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    username: "",
    message: "",
  });
  const handleInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage("");

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };
    const valFormData = validateFeedbackForm(data as FeedbackFormData);

    if (valFormData) {
      setMessage(valFormData);
      setIsPending(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      await axios.post("https://usebasin.com/f/0a3eacaafd4f", data);

      setMessage("Feedback submitted successfully!");

      (e.target as HTMLFormElement).reset();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch {
      setMessage("Failed to send feedback. Please try again.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form
      onSubmit={submitFeedback}
      className="space-y-6 bg-card mb-15 p-8 rounded-2xl w-full max-w-lg"
    >
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onInputChange={handleInputOnChange}
        />
        <Input
          label="Name"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onInputChange={handleInputOnChange}
        />
      </div>

      <Input
        label="Message"
        type="textarea"
        id="message"
        name="message"
        placeholder="Enter your message"
        onTextareaChange={handleInputOnChange}
      />

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          version="v1"
          bgColor="secondary"
          size="lg"
          className="px-12 py-3"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {message && !isPending && (
        <p className={"mt-2 mb-0 text-center text-lg text-muted"}>{message}</p>
      )}
    </form>
  );
};

export default FeedBackForm;
