import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../Modal';
import {
  Button, ContainerHeader, DivHeaderRight, DivOptionsDropDown,
} from './styles';

import Logo from '../../../assets/images/logo.png';
import MenuDropDown from '../../../assets/images/menu.png';
import Loader from '../../Loader';

type TReturn = {
  [x: string]: {
    label: string;
    path: string;
  }[]
}

const literalsOptionsHeader: TReturn = {
  teacher: [
    { label: 'Criar Rascunho', path: '/createDraft' },
    { label: 'Estudantes', path: '/students' },
  ],
  student: [
    { label: 'Ver Atividades', path: '/home' },
    // { label: 'Criar Rascunho', path: '/createDraft' },
  ],
  admin: [
    { label: 'Registrar pessoas', path: '/rsu' },
    { label: 'Ver atividades dos Professores', path: '/ava' },
  ],
};

export default function Header() {
  const { user, handleLogout } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const [dropDownOptions, setDropDownOptions] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type === undefined) <Loader isLoading />;
  }, [user?.type]);

  function OpenModal() {
    // eslint-disable-next-line no-underscore-dangle
    if (user?._count.drafts === 0) {
      navigate('/createActivity');
      setDropDownOptions(false);
      return;
    }
    setModalVisible(true);
    setDropDownOptions(false);
  }

  function GoHome() {
    navigate('/home');
  }
  function CloseModal() {
    setModalVisible(false);
  }
  function HandleCreateActivity() {
    CloseModal();
    navigate('/createActivity');
  }
  function HandleCreateActivityWithDraft() {
    CloseModal();
    navigate('/listDraft');
  }
  function handleDropDownOpions() {
    setDropDownOptions((prevState) => prevState !== true);
  }

  function handleClickOnOptions(path: string) {
    handleDropDownOpions();
    navigate(path);
  }

  return (
    <>
      {user?.type === undefined && <Loader isLoading theme="blur" />}
      <ContainerHeader>

        <Modal
          danger
          visible={modalVisible}
          isLoading={false}
          title="Você quer escolher um rascunho ou criar uma atividade do zero?"
          confirmLabel="Cancelar"
          cancelLabel=""
          onCancel={() => {}}
          onConfirm={CloseModal}
        >
          <Button type="button" onClick={HandleCreateActivity}>
            <h2>Fazer atividade do zero</h2>
          </Button>
          <Button type="button" onClick={HandleCreateActivityWithDraft}>
            <h2>Usar rascunho</h2>
          </Button>
        </Modal>

        <button type="button" onClick={GoHome}>
          <img src={Logo} alt="home" />
        </button>

        {user?.type === 'teacher' && <button type="button" className="button-fixed-option" onClick={OpenModal}>Criar Atividade</button>}

        {user?.type !== undefined && literalsOptionsHeader[user.type].map((link) => (
          <DivHeaderRight key={link.path}>
            <Link to={link.path} style={{ textDecoration: 'none', color: '#000', fontSize: '24px' }}>
              {link.label}
            </Link>
          </DivHeaderRight>
        ))}

        <button type="button" className="button-fixed-option" onClick={() => handleLogout()}>Sair</button>

        <div className="options-phone">
          <button type="button" onClick={handleDropDownOpions}>
            <img src={MenuDropDown} alt="drop" />
          </button>
        </div>
      </ContainerHeader>
      {dropDownOptions && (
        <DivOptionsDropDown>
          {user?.type === 'teacher' && (
          <button type="button" className="button-fixed-option" onClick={OpenModal}>
            <span className="login-span">Criar Atividade</span>
          </button>
          )}
          {user?.type !== undefined && literalsOptionsHeader[user?.type].map(({ label, path }) => (
            <button
              type="button"
              onClick={() => handleClickOnOptions(path)}
              key={label}
            >
              <span className="login-span">{label}</span>
            </button>
          ))}
          <button type="button" className="button-fixed-option" onClick={() => handleLogout()}>
            <span className="login-span">Sair</span>
          </button>

        </DivOptionsDropDown>
      )}
    </>
  );
}
