import { createUniqueId } from '@/utils/create';
import If from '@/components/common/If';
import MyLinkInputStateItem from '../MyLinkInputStateItem';

import styles from './ReadOnlyMyLinkList.module.scss';

interface ReadOnlyMyLinkListProps {
  links: string[];
}

const ReadOnlyMyLinkList = ({ links }: ReadOnlyMyLinkListProps) => {
  const linksWithUniqueId = links.map((link) => ({
    id: createUniqueId(),
    link,
  }));

  const handleClick = (href: string) => {
    const openLink = ['http', 'https'].some((h) => href.includes(h))
      ? href
      : `https://${href}`;

    window.open(openLink, '_blank', 'noopener,noreferrer');
  };

  const isEmptyLinks = linksWithUniqueId.length === 0;

  return (
    <li>
      <If condition={isEmptyLinks}>
        <If.True>
          <p>수정 버튼을 눌러 링크를 추가해 보세요.</p>
        </If.True>

        <If.False>
          {linksWithUniqueId.map(({ id, link }) => (
            <MyLinkInputStateItem key={id} link={link}>
              {() => (
                <button
                  type="button"
                  className={styles.my_link}
                  onClick={() => handleClick(link)}
                >
                  {link}
                </button>
              )}
            </MyLinkInputStateItem>
          ))}
        </If.False>
      </If>
    </li>
  );
};

export default ReadOnlyMyLinkList;
