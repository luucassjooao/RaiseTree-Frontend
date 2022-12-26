/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import Button from '../../Button';
import JoditEditor from '../../editor/Jodit';

type IProps = {
  callback: (answer: string) => void;
  isLoading: boolean;
}

export default function InputAnswer({ callback, isLoading }: IProps) {
  const [answer, setAnswer] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);

  function handleSubmit() {
    const div = divRef.current;
    const text = div?.innerText as string;
    if (!text.trim()) return;

    callback(answer);
    setAnswer('');
  }

  return (
    <div>
      <JoditEditor body={answer} setBody={setAnswer} />

      <div
        ref={divRef}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: answer,
        }}
        style={{ display: 'none' }}
      />
      <Button type="submit" onClick={handleSubmit} size={150} isLoading={isLoading} disabled={!answer || answer.split('<br>')[1] === '</p>'}>ENVIAR RESPOSTA</Button>
    </div>
  );
}
