import Button from '@components/common/Button';
import Input from '@components/common/Input';
import * as Styles from './LoginPage.css';

const LoginPage = () => {
  return (
    <div className={Styles.container}>
      <div>LoginPage</div>
      <div>
        <Button fill="gray" size="small">
          버튼
        </Button>
        <Input />
      </div>
    </div>
  );
};

export default LoginPage;
