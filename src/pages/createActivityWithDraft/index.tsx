import {
  useEffect, useRef, useState,
} from 'react';
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
  const [, setIsLoading] = useState(true);
  const [draft, setDraft] = useState<TDraft>();
  const draftRef = useRef<TOnSubmit>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadDraft() {
      try {
        const draftLoad = await DraftService.getUniqueDraft(id as string);

        safeAsyncAction(() => {
          draftRef.current?.setFieldsValues(draftLoad);
          setIsLoading(false);
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

  async function handleSubmit(formData: TActivity) {
    try {
      const activity = {
        title: formData.title,
        description: formData.description,
        classrooms: formData.classrooms || [],
        activity: formData.activity,
        dateExpiration: formData.dateExpiration,
        type: formData.type,
        previousPoints: formData.previousPoints,
      };

      await ActivityService.createActivity(activity);

      toast.success('Atividade criada!');

      navigate('/home');
    } catch (error: any) {
      toast.error(error.body.message);
    }
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
