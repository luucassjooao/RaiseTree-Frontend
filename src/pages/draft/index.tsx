import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActivityForm from '../../components/ActivityForm';
import { useAuth } from '../../hooks/useAuth';
import DraftService from '../../services/DraftService';
import { TActivity } from '../../utils/types/typesActivity';
import { Container } from './styles';

export default function Draft() {
  const { changeNumberOfDrafts } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(formData: TActivity) {
    try {
      await DraftService.createDraft(formData.title, formData.description, formData.activity);

      toast.success('Rascunho salvo!');
      changeNumberOfDrafts('increse');

      navigate('/home');
    } catch {
      toast.error('Houve um error ao salvar este rascunho! Tente novamente!');
    }
  }

  return (
    <Container>
      <ActivityForm type="draft" buttonLabel="Criar Rascunho" onSubmit={handleSubmit} />
    </Container>
  );
}
