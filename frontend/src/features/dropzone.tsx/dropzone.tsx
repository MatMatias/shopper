import { type Dispatch, type SetStateAction, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import styles from "./dropzone.module.css";

interface Props {
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
}

export const Dropzone = ({ setFile, file }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzoneContainer}>
      <input {...getInputProps()} />
      {file ? (
        <h3>{file.name}</h3>
      ) : (
        <h3>Drag, click or tap to upload the CSV</h3>
      )}
    </div>
  );
};
