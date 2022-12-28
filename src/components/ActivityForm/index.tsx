import {
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Input';
import {
  Form, ContainerForm, Title, TitleDescription, ButtonContainer, DivCardHome, TitlePoints,
} from './styles';

import { TActivity, InputChange, TDraft } from '../../utils/types';
import { useErrors } from '../../hooks/useHooks';
import FormGroup from '../FormGroup';
import CardHome from '../cards/CardsHome';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button';
import Select from '../Select';
import JoditEditor from '../editor/Jodit';
import Modal from '../Modal';

type TOnSubmit = {
  // eslint-disable-next-line no-unused-vars
  setFieldsValues: (activity: TDraft) => void;
  resetFields: () => void;
}

type TActivityForm = {
  type: 'createActivity' | 'draft';
  buttonLabel: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (activity: TActivity) => void;
}

type TTClassroom = {
  label: string;
  value: string;
}

const ActivityForm = forwardRef<TOnSubmit, TActivityForm>(
  ({ type, buttonLabel, onSubmit }, ref) => {
    const { user } = useAuth();
    const {
      errors, setError, removeError, getErrorMessageByFieldName,
    } = useErrors();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [classrooms, setClassroom] = useState<TTClassroom[]>([]);
    const [activity, setActivity] = useState<string>('');
    const [dateTask, setDateTask] = useState<string>('');
    const [typeActivity, setTypeActivity] = useState<string>('');
    const [previousPoints, setPreviousPoints] = useState<any>(0);

    const [optionsClassroom, setOptionsClassroom] = useState<TTClassroom[]>([]);

    const dateCard = new Date(dateTask);

    const divRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [
      modalVisibleConfirmActivityOrDraft,
      setModalVisibleConfirmActivityOrDraft,
    ] = useState<boolean>(false);

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      setFieldsValues: (draftLoad) => {
        setTitle(draftLoad.title ?? '');
        setDescription(draftLoad.description ?? '');
        setText(draftLoad.draft ?? '');
      },
      resetFields: () => {
        setTitle('');
        setDescription('');
        setActivity('');
      },
    }), []);

    useEffect(() => {
      if (type === 'createActivity' && user?.type === 'student') {
        navigate('/home');
      }
      const arrayClassrooms = user?.type_model_teacher?.classrooms.map(
        (value) => ({ label: value.split(' | ')[1], value }),
      ) as TTClassroom[];

      setOptionsClassroom(arrayClassrooms);
    }, []);

    useEffect(() => {
      const div = divRef.current;
      if (!div) return;

      const textDiv = div?.innerText as string;
      setActivity(textDiv);
    }, [text]);

    function handleChangeTitle(event: InputChange) {
      setTitle(event.target.value);

      if (!event.target.value) {
        setError({ field: 'title', message: 'Você precisa colocar algum Titulo.' });
      } else if (event.target.value.length < 30) {
        setError({ field: 'title', message: 'Você precisa colocar pelo menos 30 caracteres no título.' });
      } else {
        removeError({ fieldName: 'title' });
      }
    }
    function handleChangeDescription(event: InputChange) {
      setDescription(event.target.value);

      if (!event.target.value) {
        setError({ field: 'description', message: 'Você precisa colocar alguma descrição.' });
      } else if (event.target.value.length < 50) {
        setError({ field: 'description', message: 'Você precisa colocar pelo menos 50 caracteres na descriçào.' });
      } else {
        removeError({ fieldName: 'description' });
      }
    }
    function handleChangeDateExpiration(event: InputChange) {
      setDateTask(event.target.value);

      if (!event.target.value) {
        setError({ field: 'dateExpiration', message: 'Você precisa colocar alguma data.' });
      } else if (new Date(event.target.value) < new Date()) {
        setError({ field: 'dateExpiration', message: 'Coloque uma data maior que o dia de hoje!' });
      } else {
        removeError({ fieldName: 'dateExpiration' });
      }
    }

    function handleSubmit() {
      const arrayClassroom = classrooms.map((salas) => salas.value);

      setIsSubmitting(true);

      onSubmit({
        title,
        description,
        classrooms: arrayClassroom,
        activity,
        dateExpiration: dateTask,
        type: typeActivity,
        previousPoints,
      });

      setIsSubmitting(false);
    }

    const isFormActivityValid = (title
      && description
      && activity
      && dateTask
      && classrooms.length >= 1
      && errors.length === 0);

    const isFormDraftValid = (title && description && activity && errors.length === 0);

    function OpenModal() {
      setModalVisibleConfirmActivityOrDraft(true);
    }

    function CloseModal() {
      setModalVisibleConfirmActivityOrDraft(false);
    }

    return (
      <>
        <Form noValidate>
          {type === 'createActivity' ? <h1>Crie uma atividade</h1> : <h1>Crie um rascunho</h1>}

          <ContainerForm>
            <div>
              <Title>Qual será o título? **</Title>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'title' })}>
                <Input
                  type="text"
                  size={500}
                  value={title}
                  onChange={handleChangeTitle}
                  error={getErrorMessageByFieldName({ fieldName: 'title' })}
                  maxLength={50}
                  minLength={30}
                />
                <small>
                  {title.length}
                  /50
                </small>
              </FormGroup>

              <TitleDescription>Qual será a descrição? **</TitleDescription>
              <FormGroup error={getErrorMessageByFieldName({ fieldName: 'description' })}>
                <Input
                  type="text"
                  size={500}
                  value={description}
                  onChange={handleChangeDescription}
                  error={getErrorMessageByFieldName({ fieldName: 'description' })}
                  maxLength={100}
                  minLength={50}
                />
                <small>
                  {description.length}
                  /100
                </small>
              </FormGroup>

              {type === 'createActivity' && (
              <>
                <Title>Quais salas irão fazer está atividade? **</Title>
                <FormGroup error={getErrorMessageByFieldName({ fieldName: 'classroom' })}>
                  <MultiSelect
                    options={optionsClassroom}
                    value={classrooms}
                    onChange={setClassroom}
                    labelledBy="Selecione as salas que irao fazer esta atividade"
                  />
                </FormGroup>

                <TitleDescription>
                  Qual a data máxima para entregar está atividade? **
                </TitleDescription>
                <FormGroup error={getErrorMessageByFieldName({ fieldName: 'dateExpiration' })}>
                  <Input
                    type="datetime-local"
                    value={dateTask}
                    onChange={handleChangeDateExpiration}
                    error={getErrorMessageByFieldName({ fieldName: 'dateExpiration' })}
                  />
                </FormGroup>

                <TitleDescription>Qual a categoria desta atividade? **</TitleDescription>
                <FormGroup>
                  <Select
                    is500
                    value={typeActivity}
                    onChange={((event) => setTypeActivity(event.target.value))}
                  >
                    <option value="">Selecione...</option>
                    <option value="Atividade">Atividade</option>
                    <option value="Tarefa">Tarefa</option>
                    <option value="Trabalho">Trabalho</option>
                  </Select>
                </FormGroup>

              </>
              )}

            </div>
            {type === 'createActivity' && (
            <DivCardHome>
              <CardHome
                title={title}
                description={description}
                teacher={user?.name}
                dateExpiration={!dateTask ? new Date() : dateCard}
                typeActivity={typeActivity}
              />

              <TitlePoints>
                Quantos Pontos o aluno vai receber
              </TitlePoints>
              <TitlePoints>
                por apenas responder está atividade?
              </TitlePoints>
              <FormGroup>
                <Input
                  type="number"
                  size={120}
                  value={previousPoints}
                  onChange={((event) => setPreviousPoints(event.target.value))}
                  min={0}
                />
              </FormGroup>
            </DivCardHome>
            )}
          </ContainerForm>

          {type === 'createActivity'
            ? <Title style={{ textAlign: 'center' }}>Como será a atividade? 🧑‍💻</Title>
            : <Title style={{ textAlign: 'center' }}>Como será o Rascunho? 🤔</Title>}

          <div style={{ width: '80%', margin: '0px auto', marginTop: '20px' }}>
            <JoditEditor setBody={setText} body={text} />
          </div>

          <div
            ref={divRef}
          // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: text,
            }}
            style={{ display: 'none' }}
          />

          <ButtonContainer>
            <Button type="button" onClick={OpenModal} disabled={type === 'createActivity' ? !isFormActivityValid : !isFormDraftValid} isLoading={false} size={150}>
              {buttonLabel}
            </Button>
          </ButtonContainer>
        </Form>
        <Modal
          danger={false}
          visible={modalVisibleConfirmActivityOrDraft}
          isLoading={isSubmitting}
          title={`Você realmente quer registrar essa ${type === 'createActivity' ? 'atividade' : 'rascunho'}?`}
          confirmLabel="Confirmar"
          cancelLabel="Cancelar"
          onCancel={CloseModal}
          onConfirm={handleSubmit}
        >
          <h2>Título</h2>
          <p>{title}</p>
          <h2>Descrição</h2>
          <p>{description}</p>
          <h2>{type === 'createActivity' ? 'Atividade' : 'Rascunho'}</h2>
          <p>{`${activity.slice(0, 300)}...`}</p>
        </Modal>
      </>
    );
  },
);

export default ActivityForm;
