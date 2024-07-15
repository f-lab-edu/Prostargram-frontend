import { createUniqueId } from '@/utils/create';
import MyLinkInputStateItem from '../MyLinkInputStateItem';

import * as Styles from './ReadOnlyMyLinkList.css';

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

  return (
    <li>
      {linksWithUniqueId.length === 0 && (
        <p>수정 버튼을 눌러 링크를 추가해 보세요.</p>
      )}

      {linksWithUniqueId.length !== 0 &&
        linksWithUniqueId.map(({ id, link }) => (
          <MyLinkInputStateItem key={id} link={link}>
            {() => (
              <button
                type="button"
                className={Styles.myLink}
                onClick={() => handleClick(link)}
              >
                {link}
              </button>
            )}
          </MyLinkInputStateItem>
        ))}
    </li>
  );
};

export default ReadOnlyMyLinkList;
