import { useState } from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  link?: string; 
  onClick?: () => void;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, link, onClick, initiallyOpened, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((subLink) => (
    <Link
      href={subLink.link}
      key={subLink.label}
      className={classes.link}
    >
      {subLink.label}
    </Link>
  ));

  const handleClick = () => {
    if (hasLinks) {
      setOpened((o) => !o);
    } else if (onClick) {
      onClick(); 
    }
    
  };

  const ButtonContent = (
    <Group justify="space-between" gap={0}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <IconChevronRight
          className={classes.chevron}
          stroke={1.5}
          size={16}
          style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
        />
      )}
    </Group>
  );

  
  return (
    <>
      {hasLinks ? (
        <UnstyledButton onClick={handleClick} className={classes.control}>
          {ButtonContent}
        </UnstyledButton>
      ) : (
        <Link href={link || '#'} className={classes.control}>
          {ButtonContent}
        </Link>
      )}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}