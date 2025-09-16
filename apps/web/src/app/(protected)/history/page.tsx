'use client'
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table"
import { Button } from "@repo/ui/components/button"

import { getAllTranscriptionsByUserId, Transcription } from "@/services/api/transcription";

import { handleTxtDownload } from "@/utils/download"
import { formatDate, formatDuration, formatStatus } from "@/utils/format";

export default function UserHistory() {

    const [loading, setLoading] = useState(true);
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

    const fetchTranscriptions = async () => {

        const userId = "07b90e56-59b2-4040-a072-3a0d488648e6";

        try {
            const data = await getAllTranscriptionsByUserId(userId);
            setTranscriptions(data);
        } catch (error) {
            console.error("Erro ao buscar transcrições:", error);
        }finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
    fetchTranscriptions();
    },[]);

    if(loading) return;

    return (
        <section className="relative overflow-hidden py-16">
        <div className="relative z-10 container mx-auto">
            <div className="flex flex-col items-center gap-6 text-center">
            <div>
                <h2 className="lg:text-xl font-bold">
                Solicitações de transcrição feitas pelo usuário.
                </h2>
            </div>
            {transcriptions.length ? 
            <div className="mt-8 w-full max-w-5xl border rounded-md overflow-hidden">
                <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-4">Arquivo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duração da mídia</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Finalizado em</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transcriptions.map((transcription) => (
                    <TableRow key={transcription.id}>
                        <TableCell className="pl-4 font-medium">{transcription.fileName}</TableCell>
                        <TableCell className="font-bold">{formatStatus[transcription.status]}</TableCell>
                        <TableCell>{formatDuration(transcription.durationInSeconds)}</TableCell>
                        <TableCell>{formatDate(transcription.createdAt)}</TableCell>
                        <TableCell>{formatDate(transcription.finishedAt)}</TableCell>
                        <TableCell>
                        {transcription.status === "DONE" && transcription.transcript && (
                            <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                handleTxtDownload(transcription.transcript!, transcription.fileName)
                            }
                            >
                            Baixar
                            </Button>
                        )}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            :
            <span>Nenhuma solicitação realizada, faça uma transcrição gratuitamente</span>
            }
            </div>
        </div>
        </section>
    )
}
