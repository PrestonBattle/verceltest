"use client";
import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { Title, Tooltip, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';

interface NavItem {
  icon?: any;
  name: string;
  href?: string;
  onClick?: () => void;
  nestedItems?: NavItem[];
}

interface DoubleNavbarProps {
  navItems: NavItem[];
}

// const mainLinksMockdata = [
//   { icon: IconHome2, label: 'Home' },
//   { icon: IconGauge, label: 'Dashboard' },
//   { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
//   { icon: IconCalendarStats, label: 'Releases' },
//   { icon: IconUser, label: 'Account' },
//   { icon: IconFingerprint, label: 'Security' },
//   { icon: IconSettings, label: 'Settings' },
// ];

// const linksMockdata = [
//   'Security',
//   'Settings',
//   'Dashboard',
//   'Releases',
//   'Account',
//   'Orders',
//   'Clients',
//   'Databases',
//   'Pull Requests',
//   'Open Issues',
//   'Wiki pages',
// ];

export function DoubleNavbar({ navItems }: DoubleNavbarProps) {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');

  const mainLinks = navItems.map((link) => (
    <Tooltip
      label={link.name}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.name}
    >
      <UnstyledButton
        onClick={() => setActive(link.name)}
        className={classes.mainLink}
        data-active={link.name === active || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));
  const activeItem = navItems.find((i) => i.name === active);

  const links = activeItem?.nestedItems?.map((link) => (
    <a
      key={link.name}
      className={classes.link}
      data-active={activeLink === link.name || undefined}
      href={link.href || '#'}
      onClick={(e) => {
        e.preventDefault();
        if (link.onClick) link.onClick();
        setActiveLink(link.name);
      }}
    >
      {link.name}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div>
      </div>
    </nav>
  );
}