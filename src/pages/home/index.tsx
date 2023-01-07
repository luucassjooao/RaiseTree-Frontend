import {
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import CardHome from '../../components/cards/CardsHome';
import CardPeople from '../../components/cards/CardsPeoples';
import Loader from '../../components/Loader';
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

  const verifyUserTeacher = user?.type === 'teacher';
  const veirifyUserAdmin = user?.type === 'admin';
  const verifyUserStudent = user?.type === 'student';
  const verificationUserTypeStudentOrTeacher = verifyUserStudent || verifyUserTeacher;

  const { data, isLoading } = useQuery('home', async () => (verificationUserTypeStudentOrTeacher
    ? ActivityService.getHomeActivities()
    : StaticUserService.findAllPeoplesStaticInOrganization(user?.organizationId as string)), {
    onError() {
      const messageErrorHomeActivity = 'Houve um error ao buscar as atividades. Fique tranquilo, já iremos consertar este problema!';
      const messageErrorHomePeoples = 'Houve um error ao buscar as pessoas da sua organização. Fique tranquilo, já iremos consertar este problema!';
      toast.error(
        verificationUserTypeStudentOrTeacher
          ? messageErrorHomeActivity
          : messageErrorHomePeoples,
      );
    },
  });
  const responseOfBack = data;

  return (
    <>
      <Loader isLoading={isLoading} />
      <Container>
        {veirifyUserAdmin && (
        <div>
          {(responseOfBack as TPeoples[])?.map((pessoas) => (
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
        </div>
        )}
        {verifyUserTeacher
        && (responseOfBack as ArrayActivity[])?.length >= 1
          ? <TitleMatter>Verifique as respostas nas atividades!</TitleMatter>
          : (verifyUserTeacher && <TitleMatter>Crie alguma atividade!</TitleMatter>)}
        {verificationUserTypeStudentOrTeacher
          && (responseOfBack as ArrayActivity[])?.map((task) => (
            <Fragment key={Math.random()}>
              {verifyUserStudent
                && <TitleMatter key={Math.random()}>{task.nameSubject}</TitleMatter>}
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
            </Fragment>
          ))}
      </Container>
    </>
  );
}
