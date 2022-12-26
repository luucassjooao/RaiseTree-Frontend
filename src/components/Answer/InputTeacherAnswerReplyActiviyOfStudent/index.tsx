/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import Button from '../../Button';
import JoditEditor from '../../editor/Jodit';
import { Input } from '../../Input';

type IProps = {
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  isLoading: boolean;
  idAnswer: string;
  idStudent: string;
}

export default function InputNote({
  callback, isLoading, idAnswer, idStudent,
}: IProps) {
  const [note, setNote] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const divRef = useRef<HTMLDivElement>(null);

  function handleSubmit() {
    const div = divRef.current;
    const text = div?.innerText as string;
    if (!text.trim()) return;

    callback(note, point, idAnswer, idStudent);
    setNote('');
    setPoint(0);
  }

  return (
    <div>
      <JoditEditor body={note} setBody={setNote} />
      <Input type="number" size={80} value={point} min={0} onChange={((event) => setPoint(Number(event.target.value)))} style={{ marginRight: '20px' }} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: note,
        }}
        style={{ display: 'none' }}
      />
      <Button type="submit" onClick={handleSubmit} size={150} isLoading={isLoading} disabled={false}>ENVIAR NOTA</Button>
    </div>
  );
}
