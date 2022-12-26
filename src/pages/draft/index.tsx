import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActivityForm from '../../components/ActivityForm';
import DraftService from '../../services/DraftService';
import { TActivity } from '../../utils/types';
import { Container } from './styles';

export default function Draft() {
  const navigate = useNavigate();

  async function handleSubmit(formData: TActivity) {
    try {
      await DraftService.createDraft(formData.title, formData.description, formData.activity);

      toast.success('Rascunho salvo!');

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
