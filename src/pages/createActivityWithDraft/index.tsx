import {
  useEffect, useRef, useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActivityForm from '../../components/ActivityForm';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ActivityService from '../../services/ActivityService';
import DraftService from '../../services/DraftService';
import { TActivity, TDraft } from '../../utils/types';

type TOnSubmit = {
  // eslint-disable-next-line no-unused-vars
  setFieldsValues: (activity: TDraft) => void;
  resetFields: () => void;
}

export default function CreateActivityDraft() {
  const isFirstRender = useRef(true);

  const [draft, setDraft] = useState<TDraft>();
  const draftRef = useRef<TOnSubmit>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<TActivity>();

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadDraft() {
      try {
        const draftLoad = await DraftService.getUniqueDraft(id as string);

        safeAsyncAction(() => {
          draftRef.current?.setFieldsValues(draftLoad);
          setDraft(draft);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/home');
        });
      }
    }
    loadDraft();
  }, [id, navigate, safeAsyncAction]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => ActivityService.createActivity(activity as TActivity), {
    onSuccess() {
      queryClient.invalidateQueries('home');
      toast.success('Atividade criada!');
      navigate('/home');
    },
    onError(error: any) {
      toast.error(error.body.message);
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
      dateExpiration: formData.dateExpiration,
      type: formData.type,
      previousPoints: formData.previousPoints,
    };
    setActivity(formActivity);
  }

  return (
    <ActivityForm
      buttonLabel="Finalizar Atividade"
      onSubmit={handleSubmit}
      type="createActivity"
      ref={draftRef}
    />
  );
}
