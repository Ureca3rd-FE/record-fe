import Image from "next/image";

import { Modal, ModalContent, ModalHeader } from "../common/Modal";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const writingDalbam = "/dalbam/writing.webp";

export default function SummaryModal({ isOpen, onClose }: SummaryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>요약 중...</ModalHeader>
      <ModalContent className="flex flex-col items-center justify-center">
        <Image src={writingDalbam} alt="writing dalbam" width={120} height={120} />
        <span>달밤이가 요약하고 있어요</span>
      </ModalContent>
    </Modal>
  );
}
