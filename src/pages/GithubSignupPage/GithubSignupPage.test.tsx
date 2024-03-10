import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import GithubSignupPage from '.';

const renderGithubSignupPage = () =>
  render(
    <BrowserRouter>
      <GithubSignupPage />
    </BrowserRouter>,
  );

describe('<GithubSignupPage />', () => {
  beforeEach(() => {
    renderGithubSignupPage();
  });

  it('깃허브 회원가입 양식이 렌더링 됩니다.', () => {
    const subTitle = screen.getByText('회원가입');
    expect(subTitle).toBeInTheDocument();

    const emailLabel = screen.getByLabelText(/이메일/);
    expect(emailLabel).toBeInTheDocument();

    const requestAuthenticationButton = screen.getByRole('button', {
      name: '인증 요청',
    });
    expect(requestAuthenticationButton).toBeInTheDocument();

    const nicknameLabel = screen.getByLabelText(/닉네임/);
    expect(nicknameLabel).toBeInTheDocument();

    const checkDuplicateButton = screen.getByRole('button', {
      name: '중복 확인',
    });
    expect(checkDuplicateButton).toBeInTheDocument();
  });

  describe('이메일 필드', () => {
    it('이메일 필드를 입력하지 않으면, 에러 메시지가 발생합니다.', async () => {
      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByText(/^이메일은/);
      expect(errorMessage).toHaveTextContent('이메일은 필수 입력 사항입니다.');
    });
    it('이메일 형식에 맞게 입력하지 않으면 에러 메시지가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByText(/^이메일 주소/);
      expect(errorMessage).toHaveTextContent(
        '이메일 주소 형식에 맞게 입력해주세요.',
      );
    });
    it('이메일 입력 후 "인증 요청" 버튼을 클릭하면, 버튼이 비활성화 되고 "요청 완료"로 변경됩니다. ', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const submitButton = screen.getByRole('button', { name: '인증 요청' });
      await userEvent.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('요청 완료');
    });
  });

  describe('인증 확인 필드', () => {
    it('이메일 입력 후 "인증 요청" 버튼을 클릭하면, 인증확인 필드가 나타납니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const submitButton = screen.getByRole('button', { name: '인증 요청' });
      await userEvent.click(submitButton);

      const confirmLabel = screen.getByText('인증번호');
      expect(confirmLabel).toBeInTheDocument();
    });
  });

  describe('닉네임 필드', () => {
    it('닉네임은 반드시 입력되어야 합니다.', async () => {
      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임은 필수 입력 사항입니다.');
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
    it('닉네임은 영어,한글,숫자, _, .만 사용 할 수 있습니다.', async () => {
      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'nickname!@#$');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const nicknameErrorMessage = screen.getByText(
        '닉네임은 영어,한글,숫자, _, .만 사용 가능합니다.',
      );
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
  });
});
