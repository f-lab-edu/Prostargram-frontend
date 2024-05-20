import { PropsWithChildren, useMemo, useState } from 'react';
import { MyLinkContext } from './MyLinkContext';

const MyLinkProvider = ({ children }: PropsWithChildren) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [myLinks, setMyLinks] = useState<string[]>([]);

  const updateMyLinks = (links: string[]) => setMyLinks(links);
  const toggleIsEdit = () => setEdit((prev) => !prev);

  const value = useMemo(
    () => ({
      isEdit,
      myLinks,
      updateMyLinks,
      toggleIsEdit,
    }),
    [isEdit, myLinks],
  );

  return (
    <MyLinkContext.Provider value={value}>{children}</MyLinkContext.Provider>
  );
};

export default MyLinkProvider;
