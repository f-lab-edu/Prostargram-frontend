import { PropsWithChildren, useMemo, useState } from 'react';
import { MyLinkContext } from './MyLinkContext';

const MyLinkProvider = ({ children }: PropsWithChildren) => {
  const [isModify, setModify] = useState<boolean>(false);
  const [myLinks, setMyLinks] = useState<string[]>([]);

  const updateMyLinks = (links: string[]) => setMyLinks(links);
  const toggleIsModify = () => setModify((prev) => !prev);

  const value = useMemo(
    () => ({
      isModify,
      myLinks,
      updateMyLinks,
      toggleIsModify,
    }),
    [isModify, myLinks],
  );

  return (
    <MyLinkContext.Provider value={value}>{children}</MyLinkContext.Provider>
  );
};

export default MyLinkProvider;
