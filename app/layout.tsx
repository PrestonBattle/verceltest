"use client";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { DoubleNavbar } from "@/components/DoubleNavbar";
import "@/app/global/styles/globals.css";
import '@mantine/core/styles.css';
import { navConfig } from "@/config/nav.config";
import { NavbarNested } from "@/components/NavbarNested/NavbarNested";
import  VolunteerTable  from "@/components/Table/VolunteerTable";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  const volunteers = [
  {
    id: "v001",
    firstName: "Ava",
    lastName: "Thompson",
    phone: "904-555-0192",
    email: "ava.thompson@example.com",
  },
  {
    id: "v002",
    firstName: "Liam",
    lastName: "Martinez",
    phone: "904-555-0274",
    email: "liam.martinez@example.com",
  },
  {
    id: "v003",
    firstName: "Sophia",
    lastName: "Nguyen",
    phone: "904-555-0338",
    email: "sophia.nguyen@example.com",
  },
  {
    id: "v004",
    firstName: "Noah",
    lastName: "Patel",
    phone: "904-555-0451",
    email: "noah.patel@example.com",
  },
  {
    id: "v005",
    firstName: "Isabella",
    lastName: "Chen",
    phone: "904-555-0583",
    email: "isabella.chen@example.com",
  },
];

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