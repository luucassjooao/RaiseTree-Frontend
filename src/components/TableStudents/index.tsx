import { useEffect, useRef, useState } from 'react';
import { IAnswerTeacherTableStudents } from '../../utils/types';

export default function TableStudents({
  modalOpen, id, Student, answer, createdAt,
}: IAnswerTeacherTableStudents) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  function handleModalVisible() {
    setModalVisible((prevState) => (prevState !== true));
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    modalOpen(modalVisible, {
      id, Student, answer, createdAt, modalOpen,
    });
  }, [modalVisible]);

  return (
    <tr>
      <td>{Student.user.name}</td>
      <td>{Student.classroom}</td>
      <td>{new Date(createdAt).toLocaleString('pt-br')}</td>
      <td className="tdAnswer" role="gridcell" onClick={handleModalVisible}>
        VER RESPOSTA DO ALUNO(A)
      </td>
    </tr>
  );
}
