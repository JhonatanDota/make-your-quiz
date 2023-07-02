interface DeleteConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (show: boolean) => void;
  message: string;
  onConfirmation: () => void;
}

export default function DeleteConfirmationModal(
  props: DeleteConfirmationModalProps
) {
  function handleConfirmation() {
    props.onConfirmation();
    props.setIsOpen(false);
  }

  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 font-bold">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-8 z-10">
            <p className="text-lg text-white uppercase">{props.message}</p>
            <div className="flex justify-around gap-4 text-lg">
              <button
                onClick={() => props.setIsOpen(false)}
                className="text-sm bg-green-400 p-3 uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmation}
                className="text-sm bg-red-400 p-3 uppercase"
              >
                deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
