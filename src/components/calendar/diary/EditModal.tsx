import Image from "next/image";

import { Modal, ModalContent, ModalHeader } from "@/components/common/Modal";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helloDalbam = "/dalbam/hello.webp";

export default function EditModal({ isOpen, onClose }: EditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>수정 완료!</ModalHeader>
      <ModalContent className="flex flex-col items-center justify-center">
        <Image src={helloDalbam} alt="hello dalbam" width={120} height={120} />
        <span>수정이 완료되었습니다!</span>
      </ModalContent>
    </Modal>
  );
}
