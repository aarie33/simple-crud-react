import { RiErrorWarningLine } from "@remixicon/react"
import { Button, Modal } from "flowbite-react"

type Props = {
  title: string
  isOpen: boolean;
  onClose: () => void
  onConfirm: () => void
}

const ModalConfirm: React.FC<Props> = props => {
  const { title, isOpen, onConfirm, onClose } = props

  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => onClose()} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <RiErrorWarningLine className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => onConfirm()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => onClose()}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalConfirm;
