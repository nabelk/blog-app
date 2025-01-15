import { Form, type EditValue } from './form';

interface EditCompProps {
  editValue: EditValue;
  editId: number;
}

export function EditPost({ editValue, editId }: EditCompProps) {
  return <Form formType='edit' editValue={editValue} editId={editId} />;
}
