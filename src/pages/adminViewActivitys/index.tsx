import { Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import { ArrayActivity } from '../../utils/types/typesActivity';
import { CardsActivities, Container, TitleMatter } from './styles';

import Arrow from '../../assets/images/arrowWhite.svg';

type TDrowpDownActivities = {
  subject: string;
  activityVisible: boolean;
}

export default function AdminViewActivity() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dropdownActivities, setDropDownActivities] = useState<TDrowpDownActivities[]>([]);

  const { data, isLoading } = useQuery<ArrayActivity[]>('adminViewActivity', () => ActivityService.adminGetActivity(), {
    onError() {
      toast.error('Ouve um erro ao buscar as atividades!');
    },
  });

  useEffect(() => {
    if (user?.type !== 'admin') {
      navigate('/home');
      toast.error('Você não tem permissão para ver essa página!');
    }
  }, []);

  function handleVisibleSubjectActivity(subject: string) {
    setDropDownActivities((prevState) => {
      const findSubject = prevState.findIndex((state) => state.subject === subject);

      if (findSubject === -1) {
        return prevState.concat({ subject, activityVisible: false });
      }

      return prevState.filter((state) => state.subject !== subject);
    });
  }

  function findDropDownSubject(nameSubject: string) {
    const find = dropdownActivities
      .find(({ subject }) => subject === nameSubject);

    return find;
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {data?.map((task) => (
        <Fragment key={task.nameSubject}>
          <TitleMatter
            visible={findDropDownSubject(task.nameSubject)?.activityVisible !== false}
          >
            {task.nameSubject}
            <button type="button" onClick={() => handleVisibleSubjectActivity(task.nameSubject)}>
              <img src={Arrow} alt="dropDown" />
            </button>
          </TitleMatter>
          {(findDropDownSubject(task.nameSubject)?.activityVisible !== false
          ) && task.activitys.map((cardActivity) => (
            <CardsActivities key={cardActivity.id}>
              <Link to={`/activity/${cardActivity.id}`} style={{ textDecoration: 'none' }}>
                <CardHome
                  key={cardActivity.title}
                  teacher={cardActivity.Teacher.user.name}
                  title={cardActivity.title}
                  description={cardActivity.description}
                  dateExpiration={cardActivity.dateExpiration as Date}
                  typeActivity={cardActivity.type}
                  isDraft={false}
                />

              </Link>
            </CardsActivities>
          ))}
        </Fragment>
      ))}
    </Container>
  );
}
