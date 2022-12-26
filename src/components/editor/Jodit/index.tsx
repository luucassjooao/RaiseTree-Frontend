import JoditEditor from 'jodit-react';

type Props = {
  body: string;
  // eslint-disable-next-line no-unused-vars
  setBody: (value: string) => void;
}

export default function Jodit({ body, setBody }: Props) {
  return (
    <JoditEditor
      value={body}
      onBlur={setBody}
      config={{
        language: 'pt_br',
        textIcons: true,
        buttons: 'bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,copy,paste,selectall,copyformat,hr,table',
        style: {
          color: '#000',
        },
      }}
    />
  );
}
