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
import { ArrayActivity, ObjActivity } from '../../utils/types/typesActivity';
import { TPeoples } from '../../utils/types/typesPeoples';

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
        && (responseOfBack as TPeoples[])?.length >= 1
          ? <TitleMatter>Verifique as respostas nas atividades!</TitleMatter>
          : (verifyUserTeacher && <TitleMatter>Crie alguma atividade!</TitleMatter>)}
        {verificationUserTypeStudentOrTeacher
          && (responseOfBack as unknown as ArrayActivity[])?.map((task) => (
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
    </>
  );
}
