import { StyledCard } from './styled';

type TCard = {
  strongWord?: string;
  text: string;
  file: any;
}

export default function Card({ strongWord, text, file }: TCard) {
  return (
    <StyledCard>
      <h1>
        {strongWord && <strong>{strongWord}</strong>}
        {text}
      </h1>
      <img src={file} alt={text} />
    </StyledCard>

  );
}
