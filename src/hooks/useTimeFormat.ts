const useTimeFormat = () => {
  // 피드 생성 시간 표시 정책에 따른 포맷팅
  const formatElapsedTime = (createdTime: string) => {
    const createdAt = new Date(createdTime);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000,
    );

    if (diffInSeconds < 300) {
      // 5분 미만
      return '방금 전';
    }
    if (diffInSeconds < 3600) {
      // 1시간 미만, 분 단위 반올림
      const minutes = Math.round(diffInSeconds / 60);
      return `${minutes}분 전`;
    }
    if (diffInSeconds < 86400) {
      // 24시간 미만, 시간 단위 반올림
      const hours = Math.round(diffInSeconds / 3600);
      return `${hours}시간 전`;
    }
    if (diffInSeconds < 604800) {
      // 1주일 미만, 일 단위
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    }
    // 1주일 이상, 날짜 표시
    return createdAt.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return { formatElapsedTime };
};

export default useTimeFormat;
