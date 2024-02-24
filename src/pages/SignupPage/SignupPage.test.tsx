import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import SignupPage from './SignupPage';

const renderSignupPage = () =>
  render(
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>,
  );

describe('<SingupPage />', () => {
  it('인증 요청 버튼을 클릭하면 인증 확인 버튼으로 변경된다.', () => {
    renderSignupPage();

    const requestButton = screen.getByRole('button', { name: '인증 요청' });
    fireEvent.click(requestButton);

    const confirmButton = screen.getByRole('button', { name: '인증 확인' });
    expect(confirmButton).toBeInTheDocument();
  });

  it('이메일 필드가 채워져야 합니다.', async () => {
    renderSignupPage();

    const target = screen.getByPlaceholderText('이메일을 입력해주세요.');
    await userEvent.type(target, 'abcde');

    expect(target).toHaveValue('abcde');
  });
});
