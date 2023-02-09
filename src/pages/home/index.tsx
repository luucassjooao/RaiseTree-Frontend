import {
  Fragment, useState,
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
import { TPeoplesScreen } from '../../utils/types/typesPeoples';
import Arrow from '../../assets/images/arrowWhite.svg';

type TDrowpDownActivities = {
  subject: string;
  activityVisible: boolean;
}

export default function Home() {
  const { user } = useAuth();

  const [dropdownActivities, setDropDownActivities] = useState<TDrowpDownActivities[]>([]);

  const verifyUserTeacher = user?.type === 'teacher';
  const veirifyUserAdmin = user?.type === 'admin';
  const verifyUserStudent = user?.type === 'student';
  const verificationUserTypeStudentOrTeacher = verifyUserStudent || verifyUserTeacher;

  const { data, isLoading } = useQuery('home', async () => (verificationUserTypeStudentOrTeacher
    ? ActivityService.getHomeActivities()
    : StaticUserService.findAllPeoplesStaticInOrganization()), {
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
    <>
      <Loader isLoading={isLoading} />
      <Container>
        {veirifyUserAdmin && (
        <Fragment key="adminView">
          {(responseOfBack as TPeoplesScreen[])?.map((screen) => (
            <Fragment key={screen.type}>
              <TitleMatter>{screen.type === 'student' ? 'Estudantes' : 'Professores'}</TitleMatter>
              {screen.peoples.map((pessoas) => (
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
            </Fragment>
          ))}
        </Fragment>
        )}
        {verifyUserTeacher
        && (responseOfBack as ArrayActivity[])?.length >= 1
          ? <TitleMatter>Verifique as respostas nas atividades!</TitleMatter>
          : (verifyUserTeacher && <TitleMatter>Crie alguma atividade!</TitleMatter>)}
        {verificationUserTypeStudentOrTeacher
          && (responseOfBack as unknown as ArrayActivity[])?.map((task) => (
            <Fragment key={Math.random()}>
              {verifyUserStudent
                && (
                <TitleMatter
                  key={Math.random()}
                  visible={findDropDownSubject(task.nameSubject)?.activityVisible !== false}
                >
                  {task.nameSubject}
                  <button type="button" onClick={() => handleVisibleSubjectActivity(task.nameSubject)}>
                    <img src={Arrow} alt="dropDown" />
                  </button>
                </TitleMatter>
                )}
              {(findDropDownSubject(task.nameSubject)?.activityVisible !== false)
              && task.activitys.map((cardActivity: ObjActivity) => (
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
