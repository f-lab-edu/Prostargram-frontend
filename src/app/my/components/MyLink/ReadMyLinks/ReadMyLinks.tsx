import Link from 'next/link';

import Button from '@/components/common/Button';
import EditLinkInput from '../EditLinkInput';

import * as Styles from './ReadMyLinks.css';

interface ReadMyLinksProps {
  links: string[];
  onToggle: () => void;
}

const ReadMyLinks = ({ links, onToggle }: ReadMyLinksProps) => {
  return (
    <>
      <ul className={Styles.iconWithMyLinkWrapper}>
        {links.length === 0 && <li>수정 버튼을 눌러 링크를 추가해 보세요.</li>}

        {links.length !== 0 &&
          links.map((link, index) => (
            <EditLinkInput key={link || index} link={link}>
              {() => (
                <Link href={link} className={Styles.myLink}>
                  <p>{link}</p>
                </Link>
              )}
            </EditLinkInput>
          ))}
      </ul>

      <div className={Styles.editButtonWrapper}>
        <Button
          key="editButton"
          type="button"
          className={Styles.editButton}
          onClick={onToggle}
        >
          수정
        </Button>
      </div>
    </>
  );
};

export default ReadMyLinks;
