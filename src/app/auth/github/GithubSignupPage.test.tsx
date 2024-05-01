import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import GithubSignupPage from './page';

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

const renderGithubSignupPage = () => render(<GithubSignupPage />);

const getButtonByName = (name: string) => screen.getByRole('button', { name });

describe('<GithubSignupPage />', () => {
  beforeEach(() => {
    renderGithubSignupPage();
  });

  it('깃허브 회원가입 양식이 렌더링 됩니다.', () => {
    const subTitle = screen.getByText('회원가입');
    expect(subTitle).toBeInTheDocument();

    const emailLabel = screen.getByLabelText(/이메일/);
    expect(emailLabel).toBeInTheDocument();

    const requestConfirmButton = getButtonByName('인증 요청');
    expect(requestConfirmButton).toBeInTheDocument();

    const nicknameLabel = screen.getByLabelText(/닉네임/);
    expect(nicknameLabel).toBeInTheDocument();

    const submitButton = getButtonByName('다음 단계로');
    expect(submitButton).toBeInTheDocument();
  });

  describe('이메일 필드', () => {
    it('이메일 필드를 입력하지 않으면, 에러가 발생합니다.', async () => {
      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByText(/^이메일은/);
      expect(errorMessage).toHaveTextContent('이메일은 필수 입력 사항입니다.');
    });
    it('이메일 형식에 맞게 입력하지 않으면 에러가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test');

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const errorMessage = await screen.findByText(/^이메일 주소/);
      expect(errorMessage).toHaveTextContent(
        '이메일 주소 형식에 맞게 입력해주세요.',
      );
    });
    it('이메일 입력 후 "인증 요청" 버튼을 클릭하면, 버튼이 비활성화 되고 "요청 완료"로 변경됩니다. ', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      expect(requestConfirmButton).toBeDisabled();
      expect(requestConfirmButton).toHaveTextContent('요청 완료');
    });
  });

  describe('인증 확인 필드', () => {
    it('이메일 입력 후 "인증 요청" 버튼을 클릭하면, 인증확인 필드가 나타납니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const confirmLabel = screen.getByText('인증번호');
      expect(confirmLabel).toBeInTheDocument();
    });
    it('인증 확인 없이 다음 단계로 넘어가려고 시도하면, 에러메시지가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const confirmErrorMessage = screen.getByText('인증을 완료해 주세요.');
      expect(confirmErrorMessage).toBeInTheDocument();
    });
    it('인증 번호를 6자 미만으로 입력 후 인증 요청을 하면, 에러메시지가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const confirmInput =
        screen.getByPlaceholderText('인증번호를 입력해주세요.');
      await userEvent.type(confirmInput, '11');

      const confirmButton = getButtonByName('인증 확인');
      await userEvent.click(confirmButton);

      const confirmErrorMessage = screen.getByText(/6자리/);
      expect(confirmErrorMessage).toBeInTheDocument();
    });
    it('인증 번호를 문자를 입력한 뒤 인증 확인을 하면, 에러메시지가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const confirmInput =
        screen.getByPlaceholderText('인증번호를 입력해주세요.');
      await userEvent.type(confirmInput, 'aaaaaa');

      const confirmButton = getButtonByName('인증 확인');
      await userEvent.click(confirmButton);

      const confirmErrorMessage = screen.getByText(/숫자로만/);
      expect(confirmErrorMessage).toBeInTheDocument();
    });
    it('인증 번호를 숫자와 문자를 함께 입력한 뒤 인증 확인을 하면, 에러메시지가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const confirmInput =
        screen.getByPlaceholderText('인증번호를 입력해주세요.');
      await userEvent.type(confirmInput, 'aaaaa1');

      const confirmButton = getButtonByName('인증 확인');
      await userEvent.click(confirmButton);

      const confirmErrorMessage = screen.getByText(/숫자로만/);
      expect(confirmErrorMessage).toBeInTheDocument();
    });
  });

  describe('닉네임 필드', () => {
    it('닉네임은 반드시 입력되어야 합니다.', async () => {
      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임은 필수 입력 사항입니다.');
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
    it('닉네임은 영어,한글,숫자, _, .만 사용 할 수 있습니다.', async () => {
      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'nickname!@#$');

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage = screen.getByText(
        '닉네임은 영어(소문자),한글,숫자, _, .만 사용 가능합니다.',
      );
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
    it('닉네임은 최소 2자 이상 입력해야 합니다.', async () => {
      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'n');

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage = screen.getByText(
        '닉네임은 최소 2자 이상 작성해야 합니다.',
      );
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
  });

  describe('전체 필드 입력 및 인증 확인', () => {
    it('이메일 인증 요청만 O -> 닉네임 필수 입력, 인증 완료 에러가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임은 필수 입력 사항입니다.');
      expect(nicknameErrorMessage).toBeInTheDocument();

      const confirmErrorMessage = screen.getByText('인증을 완료해 주세요.');
      expect(confirmErrorMessage).toBeInTheDocument();
    });
    it('이메일 인증만 O -> 닉네임 필수 입력 에러가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const confirmInput =
        screen.getByPlaceholderText('인증번호를 입력해주세요.');
      await userEvent.type(confirmInput, '123456');

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임은 필수 입력 사항입니다.');
      expect(nicknameErrorMessage).toBeInTheDocument();
    });
    it('이메일 인증 요청만 O / 닉네임 입력만 O -> 인증 완료, 닉네임 중복 확인 에러가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'aaa');

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const nicknameErrorMessage =
        screen.getByText('닉네임 중복 확인을 해 주세요.');
      expect(nicknameErrorMessage).toBeInTheDocument();

      const confirmErrorMessage = screen.getByText('인증을 완료해 주세요.');
      expect(confirmErrorMessage).toBeInTheDocument();
    });
    it('이메일 인증 요청만 O / 닉네임 중복 확인 O -> 인증 완료 에러가 발생합니다.', async () => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      await userEvent.type(emailInput, 'test@naver.com');

      const requestConfirmButton = getButtonByName('인증 요청');
      await userEvent.click(requestConfirmButton);

      const nicknameInput =
        screen.getByPlaceholderText('닉네임을 입력해주세요.');
      await userEvent.type(nicknameInput, 'aaa');

      const nicknameConfirmButton = getButtonByName('중복 확인');
      await userEvent.click(nicknameConfirmButton);

      const submitButton = getButtonByName('다음 단계로');
      await userEvent.click(submitButton);

      const confirmErrorMessage = screen.getByText('인증을 완료해 주세요.');
      expect(confirmErrorMessage).toBeInTheDocument();
    });
  });
});
