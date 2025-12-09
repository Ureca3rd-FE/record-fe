import { Modal, ModalConfirmButton, ModalContent, ModalHeader } from "../common/Modal";

interface RequireLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequireLoginModal({ isOpen, onClose }: RequireLoginModalProps) {
  const onLogin = () => {
    // TODO: 로그인 API 연동
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>잠깐!</ModalHeader>
      <ModalContent>
        달밤이와 감정을 교류하려면
        <br />
        로그인이 필요해요!
      </ModalContent>
      <ModalConfirmButton className="rounded-xl py-4 font-normal" onClick={onLogin}>
        로그인하기
      </ModalConfirmButton>
    </Modal>
  );
}
