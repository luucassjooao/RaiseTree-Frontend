import { ContainerCards, Details } from './styles';

type TCardHome = {
  teacher: undefined | string;
  title: string;
  description: string;
  dateExpiration: Date;
  typeActivity: string;
  isDraft?: boolean;
}

export default function CardHome({
  teacher, title, description, dateExpiration, typeActivity, isDraft = false,
}: TCardHome) {
  return (
    <ContainerCards>
      {isDraft === false && (
        <>
          <Details>
            Professor:&nbsp;&nbsp;
            {teacher}
          </Details>
          <Details>
            Data máxima de entrega:&nbsp;&nbsp;
            {new Date(dateExpiration).toLocaleString('pt-br')}
          </Details>
          <Details>
            Categoria da atividade:&nbsp;&nbsp;
            {typeActivity}
          </Details>
        </>
      )}

      <h4>{title}</h4>
      <p>{description}</p>
    </ContainerCards>
  );
}
