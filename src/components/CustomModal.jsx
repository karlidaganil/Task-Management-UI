import Modal from "react-modal";

import crossIcon from "../../public/cross.png";

const CustomModal = ({ modalIsOpen, setModalIsOpen, modalBody }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          minWidth: "300px",
          width: "50%",
          height: "350px",
          transform: "translate(50%, 50%)",
        },
      }}
    >
      <>
        <img
          style={{ float: "right", marginBottom: "10px", cursor: "pointer" }}
          width={15}
          height={15}
          src={crossIcon}
          onClick={() => setModalIsOpen(false)}
        />
        {modalBody}
      </>
    </Modal>
  );
};

export default CustomModal;
