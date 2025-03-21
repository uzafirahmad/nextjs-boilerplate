"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes"

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <>
      <Button
        variant='outline'
        onClick={() => setTheme("dark")}
      >Dark
      </Button>
      <Button
        onClick={() => setTheme("light")}
      >Light
      </Button>
    </>
  );
}
