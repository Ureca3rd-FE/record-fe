import Image from "next/image";

import { Modal, ModalConfirmButton, ModalContent, ModalHeader } from "@/components/common/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const cryingDalbam = "/dalbam/crying.webp";

export default function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>잠깐!</ModalHeader>
      <ModalContent className="flex flex-col items-center justify-center">
        <Image src={cryingDalbam} alt="hello dalbam" width={120} height={120} />
        <span>삭제하면 복구가 어렵다는 점 확인해주세요!</span>
      </ModalContent>
      <ModalConfirmButton type="button" onClick={onConfirm}>
        삭제하기
      </ModalConfirmButton>
    </Modal>
  );
}
