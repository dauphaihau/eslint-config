import { useRef, useState } from 'react';

const ACCEPTED_TYPES = '.csv,.txt,.xlsx,.xls';
const ACCEPTED_LABEL = 'CSV, XLSX or XLS files.';
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const FILE_INPUT_ID = 'import-file';
const LABEL_ID = 'import-file-label';
const HINT_ID = 'import-file-hint';
const CONSTRAINTS_ID = 'import-file-constraints';

interface ImportUsersDialogProps {
  onSubmit?: (file: File) => void;
}

export function ImportUsersDialog({ onSubmit }: ImportUsersDialogProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateFile(file: File): string | null {
    if (file.size > MAX_SIZE_BYTES) {
      return 'File size must be at most 10MB.';
    }
    return null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null;
    setImportFile(file);
    setFileError(file ? validateFile(file) : null);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!importFile) return;
    const err = validateFile(importFile);
    if (err) {
      setFileError(err);
      return;
    }
    onSubmit?.(importFile);
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)}>
        Import CSV
      </button>
    );
  }

  return (
    <div role="dialog" aria-labelledby={LABEL_ID}>
      <h2 id={LABEL_ID}>Import users</h2>

      <form onSubmit={handleSubmit}>
        {fileError && <p role="alert">{fileError}</p>}

        <label htmlFor={FILE_INPUT_ID} id={LABEL_ID}>
          Upload file
        </label>
        <p id={HINT_ID}>Upload a {ACCEPTED_LABEL}</p>
        <p id={CONSTRAINTS_ID}>Max size: 10MB</p>

        <input
          ref={inputRef}
          id={FILE_INPUT_ID}
          type="file"
          accept={ACCEPTED_TYPES}
          aria-labelledby={LABEL_ID}
          aria-describedby={`${HINT_ID} ${CONSTRAINTS_ID}`}
          onChange={handleFileChange}
        />

        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button type="submit" disabled={!importFile}>
          Import
        </button>
      </form>
    </div>
  );
}
