import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActivityForm from '../../components/ActivityForm';
import ActivityService from '../../services/ActivityService';
import { TOnSubmit } from '../../utils/types/createActivityUseRef';
import { TActivity } from '../../utils/types/typesActivity';
import { Container } from './styles';

export default function CreateActivity() {
  const activityFormRef = useRef<TOnSubmit>(null);
  const isFirstRender = useRef(true);

  const [activity, setActivity] = useState<TActivity>();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => ActivityService.createActivity(activity as TActivity), {
    onSuccess() {
      queryClient.invalidateQueries('home');
      activityFormRef.current?.resetFields();
      toast.success('Atividade Criada!');
      navigate('/home');
    },
    onError() {
      toast.error('Ouve um error ao criar está atividade! Tente novamente!');
    },
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mutate();
  }, [activity]);

  async function handleSubmit(formData: TActivity) {
    const formActivity = {
      title: formData.title,
      description: formData.description,
      classrooms: formData.classrooms || [],
      activity: formData.activity,
      dateExpiration: new Date(formData.dateExpiration),
      type: formData.type,
      previousPoints: formData.previousPoints,
    };
    setActivity(formActivity);
  }

  return (
    <Container>
      <ActivityForm type="createActivity" buttonLabel="Finalizar Atividade" onSubmit={handleSubmit} ref={activityFormRef} />
    </Container>
  );
}
