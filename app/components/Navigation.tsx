'use client';

import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
} from '@carbon/react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { LogoGithub } from '@carbon/icons-react';

export const Navigation = () => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }: { isSideNavExpanded: boolean; onClickSideNavExpand: () => void }) => (
        <Header aria-label="Ananthakrishna Portfolio">
          <Link href="/" passHref legacyBehavior>
            <HeaderName prefix="">Ananthakrishna</HeaderName>
          </Link>
          <HeaderNavigation aria-label="Navigation Links">
            <Link href="/" passHref legacyBehavior>
              <HeaderMenuItem>Home</HeaderMenuItem>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <HeaderMenuItem>About</HeaderMenuItem>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <HeaderMenuItem>Blog</HeaderMenuItem>
            </Link>
            <Link href="/notes" passHref legacyBehavior>
              <HeaderMenuItem>Notes</HeaderMenuItem>
            </Link>
            <Link href="/projects" passHref legacyBehavior>
              <HeaderMenuItem>Projects</HeaderMenuItem>
            </Link>
            <Link href="/resume" passHref legacyBehavior>
              <HeaderMenuItem>Resume</HeaderMenuItem>
            </Link>
          </HeaderNavigation>
          <HeaderGlobalBar style={{ alignItems: 'center', gap: '1rem', paddingRight: '1rem' }}>
            <ThemeToggle />
            <a
              href="https://github.com/ananthakrishna7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="cds--header__action"
            >
              <LogoGithub size={20} />
            </a>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};
