/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardHome from '../../components/cards/CardsHome';
import DraftService from '../../services/DraftService';
import { TDraft } from '../../utils/types';
import { CardsActivities } from './styled';

export default function ListDraft() {
  const [drafts, setDrafts] = useState<TDraft[]>([]);

  async function getAllDraftsOfUser() {
    const getDrafts = await DraftService.getAllDraftsOfUser();

    setDrafts(getDrafts.findDrafts);
  }

  useEffect(() => {
    getAllDraftsOfUser();
  }, []);

  return (
    <>
      {drafts.map((draft) => (
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
