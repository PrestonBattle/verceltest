"use client";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "@/app/global/styles/globals.css";
import '@mantine/core/styles.css';
import { navConfig } from "@/config/nav.config";
import { NavbarNested } from "@/components/NavbarNested/NavbarNested";


export default function Layout({ children }: { children: React.ReactNode }) {
  
  
  return (
    <html lang="en">
      <head>
        
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light">
          <div className="flex min-h-screen">
            {/* <DoubleNavbar navItems={navConfig}/> */}
            <NavbarNested navItems={navConfig}/>
            {/* <VolunteerTable data={volunteers}/> */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}