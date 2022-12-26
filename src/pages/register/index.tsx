import { useState } from 'react';

import { Container, DivButtons } from './style';

import { StyledButton } from '../../components/Button/styled';
import { Student, Teacher } from '../../components/registers';

export default function Register() {
  const [isStudent, setStudent] = useState(true);

  return (
    <Container isStudent={isStudent}>
      <DivButtons>
        <StyledButton
          size={90}
          onClick={() => setStudent(true)}
          isStudent={isStudent}
          isRegister
          danger={false}
        >
          Estudante
        </StyledButton>
        <StyledButton
          size={90}
          onClick={() => setStudent(false)}
          isStudent={isStudent}
          isRegister
          danger={false}
        >
          Professor
        </StyledButton>
      </DivButtons>

      {isStudent ? <Student /> : <Teacher />}
    </Container>
  );
}
