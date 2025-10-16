import Button from "@/components/Button";

interface DeletePopUpProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

function DeletePopUp({
  onConfirm,
  onCancel,
  title,
  message,
}: DeletePopUpProps) {
  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center bg-black/45 backdrop-blur-sm">
      <div className="fixed flex flex-col bg-card mb-6 px-10 py-6 rounded-2xl">
        <h2 className="text-title text-3xl">{title}</h2>
        <p className="text-muted text-lg">{message}</p>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-5 px-2 pt-5 w-full">
          <Button
            version="v2"
            bgColor="primary"
            textColor="primary"
            size="lg"
            type="button"
            onClick={onCancel}
            className="lg:flex-1 px-3 py-2 w-full"
          >
            Cancel
          </Button>
          <Button
            version="v1"
            bgColor="secondary"
            textColor="title"
            size="lg"
            type="button"
            onClick={onConfirm}
            className="lg:flex-1 px-3 py-2 w-full"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
