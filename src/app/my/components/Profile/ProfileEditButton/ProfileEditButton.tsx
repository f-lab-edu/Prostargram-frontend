import If from '@/components/common/If';
import Button from '@/components/common/Button';

interface ProfileEditButtonProps {
  isEdit: boolean;
  onToggle?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const ProfileEditButton = ({
  isEdit,
  onToggle,
  onSave,
  onCancel,
}: ProfileEditButtonProps) => {
  return (
    <If condition={isEdit}>
      <If.True>
        <Button size="large" onClick={onSave}>
          저장
        </Button>
        <Button size="large" onClick={onCancel}>
          취소
        </Button>
      </If.True>
      <If.False>
        <Button size="large" onClick={onToggle}>
          수정
        </Button>
      </If.False>
    </If>
  );
};

export default ProfileEditButton;
