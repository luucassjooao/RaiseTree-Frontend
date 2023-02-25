import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../Modal';
import {
  Button,
  ButtonNotify,
  ContainerHeader,
  ContainerNotify,
  DivHeaderRight,
  DivNotify,
  DivOptionsDropDown,
  SpanLinks,
} from './styles';

import Logo from '../../../assets/images/logo.png';
import MenuDropDown from '../../../assets/images/menu.png';
import Notify from '../../../assets/images/notify.svg';
import Loader from '../../Loader';
import SideBar from '../../SideBar';
import useWindowsSize from '../../../hooks/useWindowSize';
import NotifyService from '../../../services/NotifyService';

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
  const { screenSize } = useWindowsSize();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dropDownOptions, setDropDownOptions] = useState<boolean>(false);
  const [openSideNotify, setOpenSideNotify] = useState<boolean>(false);

  const [lengthNotifications, setLenghtNotifications] = useState<number>(0);

  const navigate = useNavigate();

  const { data: dataAllNotifications, isLoading, refetch } = useQuery('AllNotifications', async () => NotifyService.getAllNotifications());

  useEffect(() => {
    if (user?.type === undefined) <Loader isLoading />;
  }, [user?.type]);

  useEffect(() => {
    (async () => {
      const countLengthNotifications = await NotifyService.countNotifications();
      setLenghtNotifications(countLengthNotifications);
    })();

    return () => setLenghtNotifications(0);
  }, []);

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

  async function handleOpenNotifications() {
    setOpenSideNotify((prevState) => prevState !== true);
    setLenghtNotifications(0);

    if (lengthNotifications !== 0) {
      return;
    }
    if (typeof dataAllNotifications === 'undefined') return;
    const findAllNotificationsWithNotRead = dataAllNotifications.filter(
      (notification) => !notification.read,
    );

    if (findAllNotificationsWithNotRead.length > 0) {
      await NotifyService.markAllNotificationsAsRead(findAllNotificationsWithNotRead);
    }
    refetch();
  }

  const sizeSideBar = screenSize.dynamicWidth < 500 ? screenSize.dynamicWidth : 500;

  return (
    <>
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

      <SideBar
        colorBackground="LightPurple"
        side="right"
        size={sizeSideBar}
        visible={openSideNotify}
        isLoading={isLoading}
      >
        <ContainerNotify>
          {dataAllNotifications?.map(({
            title, description, id, createdAt,
          }) => (
            <DivNotify key={id} role="button">
              <h3>{title}</h3>
              <p>{description}</p>
              <span>{new Date(createdAt).toLocaleDateString('pt-br')}</span>
              <hr />
            </DivNotify>
          ))}
        </ContainerNotify>
      </SideBar>

      <ContainerHeader>
        <button type="button" onClick={GoHome}>
          <img src={Logo} alt="home" />
        </button>

        {user?.type === 'teacher' && (
        <button type="button" className="button-fixed-option" onClick={OpenModal}>
          <SpanLinks>
            Criar Atividade
          </SpanLinks>
        </button>
        )}

        {user?.type !== undefined && literalsOptionsHeader[user.type].map((link) => (
          <DivHeaderRight key={link.path}>
            <Link to={link.path} style={{ textDecoration: 'none', color: '#000', fontSize: '24px' }}>
              <SpanLinks>
                {link.label}
              </SpanLinks>
            </Link>
          </DivHeaderRight>
        ))}

        <ButtonNotify type="button" onClick={handleOpenNotifications}>
          {lengthNotifications !== 0 && <small>{lengthNotifications}</small>}
          <img src={Notify} alt="notify" />
        </ButtonNotify>

        <button type="button" className="button-fixed-option" onClick={() => handleLogout()}>
          <SpanLinks>
            Sair
          </SpanLinks>
        </button>

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
