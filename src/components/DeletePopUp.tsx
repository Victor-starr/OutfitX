import Button from "@/components/Button";

interface DeletePopUpProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeletePopUp({ onConfirm, onCancel }: DeletePopUpProps) {
  return (
    <div className="top-0 left-0 z-10 absolute flex justify-center items-center bg-black/45 w-screen h-screen">
      <div className="fixed flex flex-col bg-card mb-6 px-10 py-6 rounded-2xl">
        <h2 className="text-title text-3xl">Confirm Deletion</h2>
        <p className="text-muted text-lg">
          Are you sure you want to delete this outfit?
        </p>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-5 px-2 pt-5 w-full">
          <Button
            version="v2"
            bgColor="primary"
            textColor="primary"
            size="lg"
            type="button"
            onClick={onCancel}
            className="flex-1 px-3 py-2"
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
            className="flex-1 px-3 py-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
