"use client";

import { FC } from "react";
import { useQuery } from "react-query";
import { Lock, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { get_user_details } from "@/services/user";
import LoaderScreen from "@/components/shared/LoaderScreen";
import Link from "@/components/ui/Link";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage: FC<UserProfilePageProps> = ({ params }) => {
  const { username } = params;

  const {
    data: user,
    isFetching,
    error,
  } = useQuery("user", () => get_user_details(username), {
    retry: false,
  });

  if (isFetching) {
    return <LoaderScreen />;
  }

  return (
    <main className="py-6">
      {error || !user ? (
        <div className="py-4 px-6 space-y-2 text-center">
          <h1 className="font-semibold text-xl">
            Sorry, this page isn&apos;t available.
          </h1>
          <p className="text-sm max-w-md mx-auto ">
            The link you followed may be broken, or the page may have been
            removed. <Link href="/app" text="Go back to Workspace" />.
          </p>
        </div>
      ) : (
        <Container className="px-0 max-w-4xl">
          <div className="px-6 pb-4">
            <div className="grid grid-cols-6 gap-3 sm:border-b border-zinc-200 sm:pb-6">
              <Avatar
                className="col-span-2 justify-self-center self-center"
                size="2xl"
              >
                <AvatarFallback>
                  <UserRound className="w-14 h-14" />
                </AvatarFallback>
              </Avatar>
              <div className="col-span-4">
                <div className="flex flex-col sm:items-center sm:flex-row gap-3 sm:gap-6">
                  <h1 className="font-medium text-base">{user?.username}</h1>
                  <Button variant="secondary" className="w-full sm:w-fit">
                    Follow
                  </Button>
                </div>

                <div className="hidden mt-4 sm:flex items-center gap-8 font-semibold text-sm">
                  <p>0 notes</p>
                  <p>17 following</p>
                </div>

                <div className="hidden sm:block space-y-1 mt-4">
                  <h2 className="font-semibold text-base">{user?.name}</h2>
                  {user?.bio && <p className="text-sm">{user?.bio}</p>}
                </div>
              </div>
            </div>

            <div className="block sm:hidden space-y-1 mt-4">
              <h2 className="font-semibold text-xl">{user?.name}</h2>
              {user?.bio && <p className="text-sm">{user?.bio}</p>}
            </div>
          </div>

          {/* details */}
          <div className="sm:hidden flex justify-evenly gap-3 border-y border-zinc-200 py-3 text-sm">
            <div className="text-center">
              <p className="font-semibold">0</p>
              <h4 className="text-zinc-700">notes</h4>
            </div>
            <div className="text-center">
              <p className="font-semibold">17</p>
              <h4 className="text-zinc-700">following</h4>
            </div>
          </div>

          {/* notes */}
          <div className="flex flex-col items-center justify-center gap-3 h-full min-h-[300px]">
            <Lock className="w-16 h-16 text-zinc-700" />
            <h3 className="text-sm text-center">
              This Account&apos;s notes are Private.
            </h3>
          </div>
        </Container>
      )}
    </main>
  );
};

export default UserProfilePage;
