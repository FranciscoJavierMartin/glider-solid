import { AiOutlineHome } from 'solid-icons/ai';
import { CgMoreO, CgProfile } from 'solid-icons/cg';
import { IoNotificationsCircleOutline } from 'solid-icons/io';
import { RiMapCompassDiscoverLine } from 'solid-icons/ri';

export const links = [
  {
    name: 'Home',
    href: '/',
    icon: AiOutlineHome,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: CgProfile,
  },
  {
    name: 'More',
    href: '/more',
    icon: CgMoreO,
  },
  {
    name: 'Login',
    href: '/auth/login',
    icon: IoNotificationsCircleOutline,
  },
  {
    name: 'Register',
    href: '/auth/register',
    icon: RiMapCompassDiscoverLine,
  },
];
