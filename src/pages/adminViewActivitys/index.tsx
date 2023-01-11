import { Fragment, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import { ArrayActivity } from '../../utils/types/typesActivity';
import { CardsActivities, TitleMatter } from './styles';

export default function AdminViewActivity() {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <>
      <Loader isLoading={isLoading} />
      {data?.map((task) => (
        <Fragment key={task.nameSubject}>
          <TitleMatter>{task.nameSubject}</TitleMatter>
          {task.activitys.map((cardActivity) => (
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
    </>
  );
}
