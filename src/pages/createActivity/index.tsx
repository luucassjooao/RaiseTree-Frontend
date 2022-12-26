import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActivityForm from '../../components/ActivityForm';
import ActivityService from '../../services/ActivityService';
import { TActivity, TDraft } from '../../utils/types';
import { Container } from './styles';

type TOnSubmit = {
  // eslint-disable-next-line no-unused-vars
  setFieldsValues: (activity: TDraft) => void;
  resetFields: () => void;
}

export default function CreateActivity() {
  const activityFormRef = useRef<TOnSubmit>(null);

  const navigate = useNavigate();

  async function handleSubmit(formData: TActivity) {
    try {
      const activity = {
        title: formData.title,
        description: formData.description,
        classrooms: formData.classrooms || [],
        activity: formData.activity,
        dateExpiration: new Date(formData.dateExpiration),
        type: formData.type,
        previousPoints: formData.previousPoints,
      };

      await ActivityService.createActivity(activity);

      activityFormRef.current?.resetFields();

      toast.success('Atividade Criada!');

      navigate('/home');
    } catch (error: any) {
      toast.error('Ouve um error ao criar está atividade! Tente novamente!');
    }
  }

  return (
    <Container>
      <ActivityForm type="createActivity" buttonLabel="Finalizar Atividade" onSubmit={handleSubmit} ref={activityFormRef} />
    </Container>
  );
}
