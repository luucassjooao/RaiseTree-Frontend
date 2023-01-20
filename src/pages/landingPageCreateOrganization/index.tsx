import SideBar from '../../components/SideBar';
import LoginLP from './components/LoginAndRegister/Login';
import RegisterLP from './components/LoginAndRegister/Register';
import useLandingPageCreateOrganization from './useLandingPageCreateOrganization';

import {
  ButtonAbout,
  ButtonOptionRegister,
  Container,
  ContainerWrapper,
  DivContainerHeadline,
  HeaderContainer,
  Footer,
} from './styled';
import Modal from '../../components/Modal';
import TAnswerActivityOfStudentHard from '../../assets/images/comerumcookie.png'; // teacheranswearactivity
import Card from './components/Card';

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
    modalRegister,
    setModalRegister,
    navigate,
    handleSelectRegister,
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
      <HeaderContainer>
        <div className="divDetails">
          <h1>LOGO</h1>

          <div className="infosDetails">
            <button type="button" onClick={() => setSelectOption({ visible: true, option: 'login' })}>
              <span className="login-span">Login</span>
            </button>
            <button type="button" onClick={() => setModalRegister(true)}>
              <span className="register-span">Registra-se</span>
            </button>
            <button type="button">
              <a href="/#aboutus" className="about-span">
                <span>Sobre nós</span>
              </a>
            </button>
          </div>
        </div>
        <div className="divButtonContact">
          <ButtonAbout type="button" className="buttonAbout">
            <a href="mailto:mainexcalibur@protonmail.com">
              <span>Nós Contate</span>
            </a>
          </ButtonAbout>
        </div>
      </HeaderContainer>
      <Container>
        <ContainerWrapper>

          <div className="header">
            <DivContainerHeadline>
              <h1>Raise Tree</h1>
              <h1>É feito para o</h1>
              <b>
                <div className="innerIam">
                  <h2>Aluno</h2>
                  <h2>Professor</h2>
                  <h2>Cordenador</h2>
                  <h2>Fds1</h2>
                  <h2>fds2</h2>
                  <br />
                </div>
              </b>
              <br />
              <ButtonAbout type="button">
                <span>Se juntar</span>
              </ButtonAbout>
            </DivContainerHeadline>

            <div className="divImg">
              <img src={TAnswerActivityOfStudentHard} alt="TAnswerActivityOfStudentHard" />
            </div>
          </div>

          <div className="phraseHeadline">
            <h1>Conectando mentes atraves da tecnologia</h1>
          </div>

          <div className="cards">
            <Card
              strongWord="O Professor, "
              text="pode criar atividades, rascunhos, ter controle
              de frequencia e dos alunos virtualmente
              de Forma simplificada"
              file={TAnswerActivityOfStudentHard}
            />
            <Card
              text="Agora as escolas podem usar a tecnologia a seu favor da maneira correta,
              aproveitando os ultimos resursos da tecnologia
              em um unico lugar!"
              file={TAnswerActivityOfStudentHard}
            />
            <Card
              strongWord="Coordenadores e Diretores, "
              text="podem agora estar por dentro de tudo que acontece nas escolas"
              file={TAnswerActivityOfStudentHard}
            />
          </div>

          <div className="finalText" style={{ textAlign: 'center' }} id="aboutus">
            <h1 style={{ margin: '18px' }}>
              Bem-vindo(a) ao RaiseTree! Ou RT, para os íntimos.
            </h1>
            <h1 style={{ margin: '18px' }}>
              O RT é dedicado para escolas/professores que
              querem ganhar tempo na rotina através da tecnologia
            </h1>
            <h1 style={{ margin: '18px 18px 0px' }}>
              Você pode usar o RT para gerenciar atividades de sala, frequencia,
              ter o controle de respostas e nota dos alunos.
            </h1>
          </div>
        </ContainerWrapper>
      </Container>
      <Footer>
        <span>
          made in 🇧🇷! with
          <span
            title="raiva, preguiça e ambição                         👺"
            style={{ color: 'transparent' }}
          >
            😠

          </span>
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
              handleSubmit={handleLogin}
              backChoosing={backChoosing}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              email={email}
              handleEmail={handleEmail}
              password={password}
              handlePassword={handlePassword}
              isSubmitting={isSubmitting}
              isFormValid={isFormValidLogin}
            />
            )}
          {selectOption.option === 'register'
            && (
            <RegisterLP
              handleSubmit={handleRegister}
              backChoosing={backChoosing}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              email={email}
              handleEmail={handleEmail}
              password={password}
              handlePassword={handlePassword}
              isSubmitting={isSubmitting}
              isFormValid={isFormValidRegister}
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
      <Modal
        danger={false}
        visible={modalRegister}
        title="Você quer escolher um rascunho ou criar uma atividade do zero?"
        confirmLabel="Cancelar"
        cancelLabel=""
        onCancel={() => {}}
        onConfirm={() => setModalRegister(false)}
      >
        <ButtonOptionRegister type="button" onClick={() => navigate('/corganization')}>
          <h2>Criar uma organização</h2>
        </ButtonOptionRegister>
        <ButtonOptionRegister type="button" onClick={handleSelectRegister}>
          <h2>Se juntar a uma organizaçãoo</h2>
        </ButtonOptionRegister>
      </Modal>
    </>
  );
}
