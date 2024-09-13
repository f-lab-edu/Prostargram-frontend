import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignupPage from './page';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return {
      prefetch: () => null,
    };
  },
}));

const renderSignupPage = () => render(<SignupPage />);

describe('<SingupPage />', () => {
  describe('이메일 필드', () => {
    it('이메일을 입력하지 않으면, 에러 메시지가 발생합니다.', async () => {
      renderSignupPage();

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByText(/^이메일은/);
      expect(errorMessage).toHaveTextContent('이메일은 필수 입력 사항입니다.');
    });
    it('이메일 형식에 맞게 입력하지 않으면 에러 메시지가 발생합니다.', async () => {
      renderSignupPage();
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
      renderSignupPage();
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
      renderSignupPage();
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const submitButton = screen.getByRole('button', { name: '인증 요청' });
      await userEvent.click(submitButton);

      const confirmLabel = screen.getByText('인증번호');
      expect(confirmLabel).toBeInTheDocument();
    });
  });
  describe('비밀번호 필드', () => {
    it('비밀번호는 반드시 입력되어야 합니다.', async () => {
      renderSignupPage();

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const passwordErrorMessage =
        screen.getByText('비밀번호는 필수 입력 사항입니다.');
      expect(passwordErrorMessage).toBeInTheDocument();
    });
    it('비밀번호는 반드시 입력되어야 합니다.', async () => {
      renderSignupPage();

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const passwordErrorMessage =
        screen.getByText('비밀번호는 필수 입력 사항입니다.');
      expect(passwordErrorMessage).toBeInTheDocument();
    });
    it('비밀번호는 최소 8자 이상 입력되어야 합니다.', async () => {
      renderSignupPage();

      const passwordInput =
        screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      await userEvent.type(passwordInput, '11');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const passwordErrorMessage = screen.getByText(
        '비밀번호는 최소 길이 8자 이상 기입해야 합니다.',
      );
      expect(passwordErrorMessage).toBeInTheDocument();
    });
    it('비밀번호는 영문 대/소문자, 특수문자, 숫자가 하나 이상 포함되어야 합니다.', async () => {
      renderSignupPage();

      const passwordInput =
        screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      await userEvent.type(passwordInput, 'aaaa1111');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const passwordErrorMessage = screen.getByText(
        '영문 대/소문자, 특수문자, 숫자가 하나 이상 포함되어야 합니다.',
      );
      expect(passwordErrorMessage).toBeInTheDocument();
    });
  });
  describe('비밀번호 확인 필드', () => {
    it('비밀번호 확인은 비밀번호 필드와 동일한 비밀번호가 입력되어야 합니다.', async () => {
      renderSignupPage();

      const passwordInput =
        screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      await userEvent.type(passwordInput, 'aaAA11!!');

      const repasswordInput =
        screen.getByPlaceholderText('비밀번호를 재입력해주세요.');
      await userEvent.type(repasswordInput, 'aaAA11!2');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const passwordErrorMessage =
        screen.getByText('비밀번호가 일치하지 않습니다.');
      expect(passwordErrorMessage).toBeInTheDocument();
    });
  });
  describe('닉네임 필드', () => {
    it('닉네임은 반드시 입력되어야 합니다.', async () => {
      renderSignupPage();

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임은 필수 입력 사항입니다.');
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
    it('닉네임은 영어(소문자),한글,숫자, _, .만 사용 가능합니다.', async () => {
      renderSignupPage();

      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'nickname!@#$');

      const submitButton = screen.getByRole('button', { name: '다음 단계로' });
      await userEvent.click(submitButton);

      const nicknameErrorMessage = screen.getByText(
        '닉네임은 영어(소문자),한글,숫자, _, .만 사용 가능합니다.',
      );
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
  });
});
