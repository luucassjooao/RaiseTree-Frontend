import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardHome from '../../components/cards/CardsHome';
import CardPeople from '../../components/cards/CardsPeoples';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import StaticUserService from '../../services/StaticUserService';
import { CardsActivities, Container, TitleMatter } from './style';

type ObjActivity = {
  id: string;
  title: string;
  description: string;
  classrooms: string[];
  type: string;
  teacherId: string;
  dateExpiration: Date;
  Teacher: {
    subject: {
      name: string;
    };
    user: {
      name: string;
    }
  }
  subjectId: string;
  subject: {
    id: string;
    name: string;
  }
}

type ArrayActivity = {
  nameSubject: string;
  activitys: ObjActivity[]
}

type TPeoples = {
  id: string;
  name: string;
  code: string;
  classroom: string[];
  type: string;
}

export default function Home() {
  const { user } = useAuth();

  const [activities, setActivities] = useState<ArrayActivity[]>([]);
  const [peoples, setPeoples] = useState<TPeoples[]>([]);

  const loadInfos = useCallback(async () => {
    if (user?.type === 'student' || user?.type === 'teacher') {
      try {
        const activitiesList = await ActivityService.getHomeActivities();

        setActivities(activitiesList);
      } catch {
        toast.error('Houve um error ao buscar as atividades. Fique tranquilo, já iremos consertar este problema!');
      }
    } if (user?.type === 'admin') {
      try {
        const findPeoples = await StaticUserService
          .findAllPeoplesStaticInOrganization(user.organizationId);

        setPeoples(findPeoples);
      } catch {
        toast.error('Houve um error ao buscar as as pessoas. Fique tranquilo, já iremos consertar este problema!');
      }
    }
  }, []);

  useEffect(() => {
    loadInfos();
  }, [loadInfos]);

  return (
    <Container>
      {user?.type === 'admin' && (
        <>
          {peoples.map((pessoas) => (
            <CardsActivities key={pessoas.id}>
              <CardPeople
                key={pessoas.name}
                name={pessoas.name}
                code={pessoas.code}
                classroom={pessoas.classroom}
                type={pessoas.type}
              />
            </CardsActivities>
          ))}
        </>
      )}
      {user?.type === 'teacher'
        && activities.length >= 1
        ? <TitleMatter>Verifique as respostas nas atividades!</TitleMatter>
        : (user?.type === 'teacher' && <TitleMatter>Crie alguma atividade!</TitleMatter>)}
      {activities.map((task) => (
        <div key={Math.random()}>
          {user?.type === 'student' && <TitleMatter key={Math.random()}>{task.nameSubject}</TitleMatter>}
          {task.activitys.map((cardActivity: ObjActivity) => (
            <CardsActivities key={cardActivity.id}>
              <Link to={`/activity/${cardActivity.id}`} style={{ textDecoration: 'none' }} key={Math.random()}>
                <CardHome
                  key={cardActivity.title}
                  teacher={cardActivity.Teacher.user.name}
                  title={cardActivity.title}
                  description={cardActivity.description}
                  dateExpiration={cardActivity.dateExpiration}
                  typeActivity={cardActivity.type}
                  isDraft={false}
                />
              </Link>
            </CardsActivities>
          ))}
        </div>
      ))}
    </Container>
  );
}
