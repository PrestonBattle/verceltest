import { Code, Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
//import { UserButton } from '../UserButton/UserButton';
//import { Logo } from './Logo';
import classes from './NavbarNested.module.css';

interface NestedNavbarProps {
  icon?: React.ComponentType<{ size?: number }>;
  navItems: NavItem[];
}

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  link?: string;
  onClick?: () => void;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function NavbarNested({ navItems }: NestedNavbarProps) {
  const links = navItems.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <UserButton /> */}
      </div>
    </nav>
  );
}