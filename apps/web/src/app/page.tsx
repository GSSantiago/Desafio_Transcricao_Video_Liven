'use server'
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import { cn } from "@repo/ui/lib/utils"
import { Button, buttonVariants } from "@repo/ui/components/button"

import Header from "@/components/header";

export default async function Page(){
  return (
    <>
    <Header />
    <section className="relative overflow-hidden py-16">
      <div className="relative z-10 container mx-auto">
        <div>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-16"
                width={64}
                height={64}
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Transcreva seus vídeos preferidos com{" "}
                <span className="text-destructive">IA</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Tenha o contéudo do seu vídeo de forma rápida e precisa com nossa ferramenta de transcrição automática.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Envie um arquivo já
              </Button>
              <Button variant="outline" className="group">
                Entenda mais{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Construido com tecnologias de ponta
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                    alt="shadcn/ui logo"
                    className="h-6 w-6 saturate-0 transition-all group-hover:saturate-100"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                    alt="TypeScript logo"
                    className="h-6 w-6 saturate-0 transition-all group-hover:saturate-100"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                    alt="React logo"
                    className="h-6 w-6 saturate-0 transition-all group-hover:saturate-100"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                    alt="Tailwind CSS logo"
                    className="h-6 w-6 saturate-0 transition-all group-hover:saturate-100"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

