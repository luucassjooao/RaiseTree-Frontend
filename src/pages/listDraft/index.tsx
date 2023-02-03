/* eslint-disable no-underscore-dangle */
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import DraftService from '../../services/DraftService';
import { TDraft } from '../../utils/types/typesDraft';
import { CardsActivities } from './styled';

export default function ListDraft() {
  const { data, isLoading } = useQuery('drafts', async () => DraftService.getAllDraftsOfUser(), {
    onError() {
      toast.error('Ouve um error ao buscar seus rascunhos!');
    },
  });

  return (
    <>
      <Loader isLoading={isLoading} theme="blur" />
      {data?.map((draft: TDraft) => (
        <CardsActivities key={Math.random()}>
          <Link to={`/createActivityDraft/${draft.id}`} style={{ textDecoration: 'none' }}>
            <CardHome
              description={draft.description}
              title={draft.title}
              typeActivity="draft"
              teacher={' '}
              dateExpiration={draft.createAt}
              isDraft
            />
          </Link>
        </CardsActivities>
      ))}
    </>
  );
}
