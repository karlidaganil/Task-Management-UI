import toast from "react-hot-toast";

import { useState } from "react";
import CustomModal from "./CustomModal";
import { useStore } from "../useStore";

const JsonFormatError = () =>
  toast.error("JSON FORMAT IS WRONG.", {
    duration: 4000,
    position: "top-right",
  });

const ChangeInitialJson = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newJson, setNewJson] = useState("");
  const { changeInitial } = useStore();

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>
        Change Initial Json To Test
      </button>
      <CustomModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        modalBody={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h2>Change Initial Json</h2>
            <textarea
              style={{ width: "100%", height: "200px" }}
              className="input-style"
              placeholder="Enter the new array of objects"
              onChange={(e) => setNewJson(e.target.value.trim())}
            />
            <p>
              It should be the same as the json format you gave at first, that
              is, the ARRAY of OBJECTS.
            </p>
            <button
              onClick={() => {
                try {
                  const formatedJson = newJson.replace(
                    /([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
                    '$1"$2":'
                  );
                  changeInitial(JSON.parse(formatedJson));
                  setModalIsOpen(false);
                } catch (e) {
                  JsonFormatError();
                  return;
                }
              }}
            >
              Change
            </button>
          </div>
        }
      />
    </>
  );
};

export default ChangeInitialJson;
