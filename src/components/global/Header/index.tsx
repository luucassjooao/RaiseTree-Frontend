import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../Modal';
import {
  Button, ContainerHeader, DivHeaderRight,
} from './styles';

export default function Header() {
  const { user, handleLogout } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  function OpenModal() {
    // eslint-disable-next-line no-underscore-dangle
    if (user?._count.drafts === 0) {
      navigate('/createActivity');
      return;
    }
    setModalVisible(true);
  }

  const teacherLinks = [
    { label: 'Criar Rascunho', path: '/createDraft' },
    { label: 'Estudantes', path: '/students' },
  ];
  const studentsLinks = [
    { label: 'Ver Atividades', path: '/home' },
    // { label: 'Criar Rascunho', path: '/createDraft' },
  ];
  const adminLinks = [
    { label: 'Registrar pessoas', path: '/rsu' },
    { label: 'Ver atividades dos Professores', path: '/ava' },
  ];

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

  return (
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
        <h2 style={{ cursor: 'pointer' }}>RT</h2>
      </button>

      {user?.type === 'teacher' && <button type="button" onClick={OpenModal}>Criar Atividade</button>}

      {user?.type === 'student' && studentsLinks.map((link) => (
        <DivHeaderRight key={link.path}>
          <Link to={link.path} style={{ textDecoration: 'none', color: '#000', fontSize: '24px' }}>
            {link.label}
          </Link>
        </DivHeaderRight>
      ))}

      {user?.type === 'teacher' && teacherLinks.map((link) => (
        <DivHeaderRight key={link.path}>
          <Link to={link.path} style={{ textDecoration: 'none', color: '#000', fontSize: '24px' }}>
            {link.label}
          </Link>
        </DivHeaderRight>
      ))}

      {user?.type === 'admin' && adminLinks.map((link) => (
        <DivHeaderRight key={link.path}>
          <Link to={link.path} style={{ textDecoration: 'none', color: '#000', fontSize: '24px' }}>
            {link.label}
          </Link>
        </DivHeaderRight>
      ))}

      <button type="button" onClick={() => handleLogout()}>Sair</button>
    </ContainerHeader>
  );
}
