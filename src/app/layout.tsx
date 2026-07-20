import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Navigation} from "@/components/Navigation";
import {FamilyProvider} from "@/contexts/FamilyProvider";
import { FoodProvider } from "@/contexts/FoodProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Snackcident",
    description: "Track yourself before you snack yourself",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <FamilyProvider>
                <FoodProvider>
                    <Navigation/>
                    {children}
                </FoodProvider>
            </FamilyProvider>
        </body>
        </html>
    );
}
