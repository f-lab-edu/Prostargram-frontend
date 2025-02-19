import { ReactNode } from 'react';

import BrunchIcon from '@/assets/icons/enterprise_icon/brunch.svg';
import FacebookIcon from '@/assets/icons/enterprise_icon/facebook.svg';
import GitHubIcon from '@/assets/icons/enterprise_icon/github.svg';
import GitLabIcon from '@/assets/icons/enterprise_icon/gitlab.svg';
import InstagramIcon from '@/assets/icons/enterprise_icon/instagram.svg';
import LinkedInIcon from '@/assets/icons/enterprise_icon/linked_in.svg';
import NaverBlogIcon from '@/assets/icons/enterprise_icon/naver_blog.svg';
import TistoryIcon from '@/assets/icons/enterprise_icon/tistory.svg';
import VelogIcon from '@/assets/icons/enterprise_icon/velog.svg';
import XIcon from '@/assets/icons/enterprise_icon/x.svg';
import YoutubeIcon from '@/assets/icons/enterprise_icon/youtube.svg';

export const iconList: { name: string; icon: ReactNode }[] = [
  {
    name: 'brunch',
    icon: <BrunchIcon />,
  },
  {
    name: 'facebook',
    icon: <FacebookIcon />,
  },
  {
    name: 'github',
    icon: <GitHubIcon />,
  },
  {
    name: 'gitlab',
    icon: <GitLabIcon />,
  },
  {
    name: 'instagram',
    icon: <InstagramIcon />,
  },
  {
    name: 'linkedin',
    icon: <LinkedInIcon />,
  },
  {
    name: 'naver',
    icon: <NaverBlogIcon />,
  },
  {
    name: 'tistory',
    icon: <TistoryIcon />,
  },
  {
    name: 'velog',
    icon: <VelogIcon />,
  },
  {
    name: 'x',
    icon: <XIcon />,
  },
  {
    name: 'youtube',
    icon: <YoutubeIcon />,
  },
];
