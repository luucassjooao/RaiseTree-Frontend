import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import LoginLP from './components/LoginAndRegister/Login';
import RegisterLP from './components/LoginAndRegister/Register';
import {
  Container, Footer, Header,
} from './styled';
import useLandingPageCreateOrganization from './useLandingPageCreateOrganization';

import CActivity from '../../assets/images/yyyeeeahhhBuuudyyy.png'; // createActivity
import TviweListStudents from '../../assets/images/skinnyBITCH.png'; // teacherViwerListStudents
import SAnswerActivity from '../../assets/images/lightWeight.png'; // studentAnsweractivity
import TAnswerActivityOfStudentHard from '../../assets/images/comerumcookie.png'; // teacheranswearactivity
import CDraft from '../../assets/images/fazmaiscinco.png'; // createDraft

import Arrow from '../../assets/images/arrow.svg';

export default function LP() {
  const {
    email,
    password,
    errors,
    name,
    code,
    confirmPassword,
    typeUserRegister,
    subjectId,
    selectOption,
    setSelectOption,
    handleLogin,
    backChoosing,
    getErrorMessageByFieldName,
    isSubmitting,
    handleEmail,
    handlePassword,
    handleName,
    handleCodingCpf,
    handleConfirmPassword,
    handleRegister,
    setTypeUserRegister,
    isLoadingSubject,
    setSubjectId,
    subjects,
    imagesAnswer,
    ArrowImagesAnswers,
  } = useLandingPageCreateOrganization();

  const isFormValidLogin = email && password && errors.length === 0;
  const isFormValidRegister = name
    && email
    && password
    && code
    && confirmPassword
    && errors.length === 0;

  return (
    <>
      <SideBar
        side="left"
        visible={selectOption.visible}
        size={600}
        colorBackground={selectOption.option === 'login' ? 'GrayPurple' : 'YellowMain'}
      >
        <>
          {selectOption.option === 'login'
            && (
            <LoginLP
              handleLogin={handleLogin}
              backChoosing={backChoosing}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              email={email}
              handleEmail={handleEmail}
              password={password}
              handlePassword={handlePassword}
              isSubmitting={isSubmitting}
              isFormValidLogin={isFormValidLogin}
            />
            )}
          {selectOption.option === 'register'
            && (
            <RegisterLP
              handleRegister={handleRegister}
              backChoosing={backChoosing}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              email={email}
              handleEmail={handleEmail}
              password={password}
              handlePassword={handlePassword}
              isSubmitting={isSubmitting}
              isFormValidRegister={isFormValidRegister}
              typeUserRegister={typeUserRegister}
              setTypeUserRegister={setTypeUserRegister}
              name={name}
              handleName={handleName}
              code={code}
              handleCodingCpf={handleCodingCpf}
              confirmPassword={confirmPassword}
              handleConfirmPassword={handleConfirmPassword}
              isLoadingSubject={isLoadingSubject}
              subjectId={subjectId}
              setSubjectId={setSubjectId}
              subjects={subjects}
            />
            )}
        </>
      </SideBar>
      <Header>
        <button type="button" className="OptionButton" onClick={() => setSelectOption({ visible: true, option: 'login' })}>
          <h3>Fazer login</h3>
        </button>
        <Link to="/corganization" className="link">Registrar minha organização</Link>
        <button type="button" className="OptionButton" onClick={() => setSelectOption({ visible: true, option: 'register' })}>
          <h3>Se juntar a uma organização</h3>
        </button>
      </Header>
      <Container>
        <h1>RaiseTree</h1>
        <br />
        <h2>
          Bem-vindo(a) ao RaiseTree! Ou RT, para os íntimos.
        </h2>
        <br />
        <h2>
          Estou feliz por você ter nos encontrado!
          O RT é dedicado para escolas/professores que
          querem ganhar tempo na rotina através da tecnologia
        </h2>
        <br />
        <h2>
          Você pode usar o RT para gerenciar atividades de sala,
          ter o controle de respostas e nota dos alunos.
        </h2>
        <br />
        <h2>
          Essa é apenas a primeira versão do RaiseTree.
          <br />
          Por isso contamos com sua colaboração para melhora.
        </h2>
        <br />
        <h2>
          Caso tenha alguma suggestão ou alguma funcionalidade esteja com algum bug,
          <a href="mailto:mainexcalibur@protonmail.com">
            clique aqui e nós contate!
          </a>
        </h2>
        <br />
        <div className="divone">
          <div>
            <div className="divtwo">
              <div>
                <h2>Crie Atividades</h2>
                <img src={CActivity} alt="CActivity" />
              </div>
              <div>
                <h2>Crie Rascunhos</h2>
                <img src={CDraft} alt="CDraft" />
              </div>
            </div>
          </div>
          <div>
            <div className="divtwo">
              <div>
                <h2>Veja os estudantes que responderão as atividades, e os responda!</h2>
                {imagesAnswer === 1 && (
                  <img src={TviweListStudents} alt="TviweListStudents" style={{ marginRight: '-24px' }} />
                )}
                {imagesAnswer === 2 && (
                  <img src={TAnswerActivityOfStudentHard} alt="TAnswerActivityOfStudentHard" style={{ marginRight: '-24px' }} />
                )}
                <button type="button" onClick={ArrowImagesAnswers} className="arrowImagesAnswer">
                  <img src={Arrow} alt="arrow" />
                </button>
              </div>
              <div>
                <h2>Responda a atividades</h2>
                <img src={SAnswerActivity} alt="SAnswerActivity" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer>
        <span>
          made in 🇧🇷! with
          <span title="raiva, preguiça e ambição                         👺" style={{ color: 'transparent' }}>😠</span>
          &
          <span>live long and prosper</span>
        </span>
        <span>
          Quer fazer contato?
          <a href="mailto:mainexcalibur@protonmail.com">
            {' '}
            Clique aqui
          </a>
        </span>
      </Footer>
    </>
  );
}
