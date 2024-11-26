"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/client";
import "./globals.css";
import Image from 'next/image';
import Link from "next/link";
import { metadata } from "@/components/metadata";
import { Head } from "next/document";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#001009]`}>
        <div className="max-w-[80rem] mx-auto p-5 pl-0 ">
          <Link href="/">
          <div>
              <Image className="justify-self-center lg:justify-self-auto" src="/Logo.svg" alt="Zalgiris" width={43} height={48}/>
              </div>
          </Link>
        </div>
          <div className="border-b-[1px] border-darkGreen">
        </div>
        <ApolloProvider client={client}>{children}</ApolloProvider>
        <div className="grid mx-auto max-w-[75rem] border-y-[1px] border-darkGreen justify-center lg:justify-normal py-9">
          <p className="text-2xl font-bold">Contacts</p>
          <div className="lg:flex grid justify-between gap-y-5 pt-5">
            <div className="space-y-2">
              <p className=" font-bold">Krepšinio komanda Kauno „Žalgiris“</p>
              <p className="text-sm text-fadedText">Karaliaus Mindaugo pr. 50, LT-44334, Kaunas</p>
              <p className="text-sm text-fadedText">+370 615 98636</p>
              <p className="text-sm text-fadedText">info@zalgiris.lt</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold">„Žalgirio“ arenos bilietų kasa</p>
              <p className="text-sm text-fadedText">Karaliaus Mindaugo pr. 50, LT-44334, Kaunas</p>
              <p className="text-sm text-fadedText"> +370 616 44448</p>
              <p className="text-sm text-fadedText">bilietai@zalgiris.lt</p>
            </div>

            <div className="space-y-2"> 
              <p className="font-bold">Kauno „Žalgirio“ namų arena</p>
              <p className="text-sm text-fadedText">Karaliaus Mindaugo pr. 50, LT-44334, Kaunas</p>
              <p className="text-sm text-fadedText">+370 615 98636</p>
              <p className="text-sm text-fadedText">info@zalgirioarena.lt</p>
            </div>
          </div>
        </div>
        <div className="pb-5 grid gap-4 lg:flex text-xs mx-auto lg:max-w-[75rem] max-w-[20rem] lg:justify-between items-center text-grayedGreen pt-8 justify-items-center text-center lg:text-left">
          <div className="grid">
          <p className="order-3 lg:order-none pb-2 pt-2 lg:pt-0">Visos teisės saugomos. © 2024 VšĮ „Žalgirio krepšinio centras“</p>
          <div className="leading-5 lg:order-none order-2 grid gap-2">
            <p>Kopijuoti ir platinti tinklalapio turinį leidžiama tik su raštišku VšĮ „Žalgirio krepšinio centras“ sutikimu.</p>
            <p>Daugiau informacijos apie asmens duomenų tvarkymą pateikiama susisiekiant el. paštų: <span className="underline">privatumas@zalgiris.lt</span></p>
            <p className="underline">Kauno „Žalgirio“ prekių ženklų naudojimo taisyklės</p>
          </div>
          </div>
          <div className="flex gap-6 lg:order-none -order-1">
            <p>Privacy policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </body>
    </html>
  );
}
