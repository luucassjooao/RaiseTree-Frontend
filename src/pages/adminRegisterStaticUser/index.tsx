/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  CardsPeoples, Container, ContainerWrapper,
} from './styles';

import Arrow from '../../assets/images/arrow.svg';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import useAdminRegisterStaticUser from './useAdminRegisterStaticUser';
import SpreadSheetChoosing from './components/SpreadSheetChoosing';
import MultiPeopleChoosing from './components/MultiPeopleChoosing';
import OnePersonChoosing from './components/OnePersonChoosign';
import { SplitNameSchool } from '../../utils/funcs/SplitNameSchool';

export default function AdminRegisterStaticUser() {
  const {
    name,
    type,
    classroomStudent,
    cpf,
    classroomTeacher,
    peoplesCreated,
    errors,
    somethingHasChoosed,
    spreadSheetUrlChoosing,
    spreadsheetChoosing,
    multiPeopleChoosing,
    onePersonChoosing,
    isVisibleModalCreatePeoples,
    isSubmitting,
    handleCloseCreatePeoplesModal,
    handleOnSubmitMultiPeople,
    isVisibleModalInfoSheet,
    setIsVisibleModalInfoSheet,
    CopyText,
    handleSpreadSheetChoosing,
    handleMultiPeopleChoosing,
    handleOnePersonChoosing,
    handleBackChoosing,
    setType,
    user,
    handleUrlSpreadSheet,
    spreadSheetUrl,
    setSpreadSheetUrl,
    getErrorMessageByFieldName,
    handleChangeName,
    setClassroomStudent,
    handleChangeCPF,
    optionsClassroom,
    setClassroomTeacher,
    handleAddMorePeoples,
    handleVisibleCreatePeoplesModal,
    handleOnSubmitPeoplesOfSheet,
    handleOnSubmitOnePerson,
  } = useAdminRegisterStaticUser();

  const isAddMorePeopleStudent = (
    name && type && classroomStudent && cpf
  );
  const isAddMorePeopleTeacher = (
    name && type && classroomTeacher.length >= 1
  );

  const isMoreOnePerson = peoplesCreated.length >= 1 && errors.length === 0;

  return (
    <Container>
      <Modal
        danger
        visible={isVisibleModalCreatePeoples}
        isLoading={isSubmitting}
        title="Você tem certeza que deseja adicionar todas essas pessoas?"
        confirmLabel="CONFIRMAR"
        cancelLabel="CANCELAR"
        onCancel={handleCloseCreatePeoplesModal}
        onConfirm={handleOnSubmitMultiPeople}
      >
        {peoplesCreated.map((pessoas) => (
          <CardsPeoples key={Math.random()}>
            <h3>
              Nome:
              {pessoas.name}
            </h3>
            <h3>
              Sala:
              {pessoas.type === 'student' ? pessoas.classroom[0].split(' | ')[1] : (
                <>
                  {pessoas.classroom.map((sala) => (
                    <span key={sala}>
                      {SplitNameSchool(sala)}
                      ,
                    </span>
                  ))}
                </>
              )}

            </h3>
            <h3>{pessoas.type === 'student' ? `CPF: ${' '}${pessoas.cpf}` : null}</h3>
            <h3>
              Classificação:
              {pessoas.type === 'student' ? 'Estudante' : 'Professor'}
            </h3>
          </CardsPeoples>
        ))}
      </Modal>
      <Modal
        danger={false}
        visible={isVisibleModalInfoSheet}
        isLoading={false}
        title="Antes de continuarmos, leia isso por favor!"
        confirmLabel="Ok, entendido!"
        cancelLabel=""
        onCancel={() => {}}
        onConfirm={() => setIsVisibleModalInfoSheet(false)}
      >
        <div style={{
          display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        }}
        >
          <h3>
            Na próxima tela, você ira escolher qual é a
            classificação das pessoas que você ira adicionar na sua organização!
          </h3>
          <h4>Para que você faça deste jeito, precisamos fazer algumas configurações!</h4>
          <p>
            Primeiro de tudo, precisamos que a aba da planilha tenha este nome!
            <small>(Clique e copie o nome)</small>
          </p>
          <Button
            size={250}
            isLoading={false}
            style={{ margin: '8px 0', justifySelf: 'center' }}
            onClick={() => CopyText('ACESSO PLANILHA RES-TREE')}
          >
            ACESSO PLANILHA RES-TREE
          </Button>
          <p>
            Segundo, precisamos ter o acesso a está planilha! Copie o email abaixo e deixe-o como
            <strong>
              {' '}
              EDITOR
            </strong>
          </p>

          <Button
            size={250}
            isLoading={false}
            style={{ margin: '8px 0', justifySelf: 'center' }}
            onClick={() => CopyText('school@nproject-4.iam.gserviceaccount.com')}
          >
            school@nproject-4.iam.gserviceaccount.com
          </Button>
        </div>
      </Modal>
      <ContainerWrapper>
        {!somethingHasChoosed && (
        <>
          <h3>Escolha como você vai querer adicionar essas pessoas</h3>
          <br />
          <Button
            type="button"
            onClick={handleSpreadSheetChoosing}
            size={390}
            isLoading={false}
            yellowBackground
          >
            Adicionar múltiplas pessoas pelo Google Planilhas
          </Button>
          <br />
          <Button
            type="button"
            onClick={handleMultiPeopleChoosing}
            size={390}
            isLoading={false}
            yellowBackground
          >
            Adicionar múltiplas pessoas manualmente
          </Button>
          <br />
          <Button
            type="button"
            onClick={handleOnePersonChoosing}
            size={390}
            isLoading={false}
            yellowBackground
          >
            Adicionar uma pessoa
          </Button>
        </>
        )}
        {somethingHasChoosed && (
        <div className="backOnChoosing">
          <img src={Arrow} alt="Arrow" onClick={handleBackChoosing} role="button" />
          {spreadsheetChoosing && (
          <h3>Primeiro, escolha qual vai ser a classificação dessas pessoas</h3>
          )}
          {multiPeopleChoosing && (
            <h3>Coloque as informações de cada pessoa abaixo!</h3>
          )}
          {onePersonChoosing && (
            <h3>Coloque as informações dessa pessoa!</h3>
          )}
        </div>
        )}
        {spreadsheetChoosing && (
          <SpreadSheetChoosing
            setType={setType}
            type={type}
            user={user}
            SplitNameSchool={SplitNameSchool}
            CopyText={CopyText}
            handleUrlSpreadSheet={handleUrlSpreadSheet}
          />
        )}
        {spreadSheetUrlChoosing && (
          <div>
            <h2>Coloque a url da planilha abaixo!</h2>
            <Input
              type="text"
              size={350}
              value={spreadSheetUrl}
              onChange={(event) => setSpreadSheetUrl(event.target.value)}
            />
            <button type="button" className="button-copy-classroom" onClick={handleOnSubmitPeoplesOfSheet}>CONFIRMAR</button>
          </div>
        )}

        {multiPeopleChoosing && (
          <MultiPeopleChoosing
            setType={setType}
            type={type}
            user={user}
            getErrorMessageByFieldName={getErrorMessageByFieldName}
            handleChangeName={handleChangeName}
            name={name}
            classroomStudent={classroomStudent}
            setClassroomStudent={setClassroomStudent}
            cpf={cpf}
            handleChangeCPF={handleChangeCPF}
            optionsClassroom={optionsClassroom}
            classroomTeacher={classroomTeacher}
            setClassroomTeacher={setClassroomTeacher}
            isAddMorePeopleStudent={isAddMorePeopleStudent}
            isAddMorePeopleTeacher={isAddMorePeopleTeacher}
            handleAddMorePeoples={handleAddMorePeoples}
            isMoreOnePerson={isMoreOnePerson}
            handleVisibleCreatePeoplesModal={handleVisibleCreatePeoplesModal}
          />
        )}

        {onePersonChoosing && (
          <OnePersonChoosing
            setType={setType}
            type={type}
            user={user}
            getErrorMessageByFieldName={getErrorMessageByFieldName}
            handleChangeName={handleChangeName}
            name={name}
            classroomStudent={classroomStudent}
            setClassroomStudent={setClassroomStudent}
            cpf={cpf}
            handleChangeCPF={handleChangeCPF}
            optionsClassroom={optionsClassroom}
            classroomTeacher={classroomTeacher}
            setClassroomTeacher={setClassroomTeacher}
            isAddMorePeopleStudent={isAddMorePeopleStudent}
            isAddMorePeopleTeacher={isAddMorePeopleTeacher}
            handleOnSubmitOnePerson={handleOnSubmitOnePerson}
            isSubmitting={isSubmitting}
          />
        )}
      </ContainerWrapper>
    </Container>
  );
}
