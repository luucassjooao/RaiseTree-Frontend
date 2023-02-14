import SideBar from '../../components/SideBar';
import LoginLP from './components/LoginAndRegister/Login';
import RegisterLP from './components/LoginAndRegister/Register';
import useLP from './useLP';

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
import MenuDropDown from '../../assets/images/menu.png';
import Logo from '../../assets/images/logo.png';
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
    dropDownOptions,
    handleDropDownOpions,
    urlImage,
  } = useLP();

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
          <img src={Logo} alt="Raise Tree" />

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
              <span>Contate-nos</span>
            </a>
          </ButtonAbout>
        </div>
        {selectOption.visible === false && (
        <div className="options-phone">
          <button type="button" onClick={handleDropDownOpions}>
            <img src={MenuDropDown} alt="drop" />
          </button>
        </div>
        )}
      </HeaderContainer>

      <Container>
        {dropDownOptions && (
        <div className="div-options">
          <button
            type="button"
            onClick={() => {
              setSelectOption({ visible: true, option: 'login' });
              handleDropDownOpions();
            }}
          >
            <span className="login-span">Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setModalRegister(true);
              handleDropDownOpions();
            }}
          >
            <span className="register-span">Registre-se</span>
          </button>
          <button type="button">
            <a href="/#aboutus" className="about-span">
              <span>Sobre-nós</span>
            </a>
          </button>
          <button type="button">
            <a href="mailto:mainexcalibur@protonmail.com" style={{ textDecoration: 'none' }}>
              <span>Contate-nos</span>
            </a>
          </button>
        </div>
        )}
        <ContainerWrapper>

          <div className="header">
            <DivContainerHeadline>
              <h1>Raise Tree</h1>
              <h1>É feito para o</h1>
              <b>
                <div className="innerIam">
                  <h2>Professor</h2>
                  <h2>Aluno</h2>
                  <h2>Coordenador</h2>
                  <h2>Diretor</h2>
                  <br />
                </div>
              </b>
              <br />
              <ButtonAbout type="button" onClick={() => setModalRegister(true)}>
                <span>Se juntar</span>
              </ButtonAbout>
            </DivContainerHeadline>

            <div className="divImg">
              <h2>Geração de Memes Aleatorios sobre as Máterias da escola! </h2>
              <img src={urlImage} alt="unsmemezinai" />
            </div>
          </div>

          <div className="cards">
            <Card
              strongWord="O Professor, "
              text="pode criar atividades, rascunhos, ter controle
              de frequência e dos alunos virtualmente
              de Forma simplificada"
            />
            <Card
              text="Agora as escolas podem usar a tecnologia a seu favor da maneira correta,
              aproveitando os ultimos resursos da tecnologia
              em um único lugar!"
            />
            <Card
              strongWord="Coordenadores e Diretores, "
              text="podem agora estar por dentro de tudo que acontece nas escolas"
            />
          </div>

          <div className="finalText" id="aboutus">
            <h1>
              Bem-vindo(a) ao RaiseTree! Ou RT, para os íntimos.
            </h1>
            <h1>
              O RT é dedicado para escolas/professores que
              querem ganhar tempo na rotina através da tecnologia
            </h1>
            <h1 className="lastH1">
              Você pode usar o RT para gerenciar atividades de sala, frequência,
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
          <h2>Se juntar a uma organização</h2>
        </ButtonOptionRegister>
      </Modal>
    </>
  );
}
