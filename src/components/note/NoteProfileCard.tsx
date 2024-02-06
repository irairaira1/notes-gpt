import { NoteType } from "@/lib/zod/note";
import Link from "next/link";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

interface NoteProfileCardProps {
  note: NoteType;
}

const NoteProfileCard: FC<NoteProfileCardProps> = ({ note }) => {
  console.log(note.id);
  return (
    <Link href={`/note/${note.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {note.content.blocks[0].data.text ||
              note.content.blocks[0].data.link ||
              note.content.blocks[0].data.items[0].text}
          </CardDescription>
          <p className="w-fit ml-auto text-xs text-zinc-400">
            {new Date(note.createdAt).toLocaleDateString()}{" "}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteProfileCard;
